# --- Resource Naming ---
# Note: azurecaf provider needs to be configured in the root module (which it is)
# We reference it here to generate the name for this specific app instance.
resource "azurecaf_name" "ca" {
  name          = var.app_name # Use the logical app name passed in
  resource_type = "azurerm_container_app"
  prefixes      = [var.project_prefix]
  suffixes      = [var.environment, var.location] # Add environment/location for clarity
  separator     = "-"
  clean_input   = true
  passthrough   = false
}

# --- Local Variables for Aggregated Secrets and Digests ---
locals {
  # Load the service digests from the provided JSON file
  service_digests = jsondecode(file(var.service_digests_file))

  # Aggregate all unique Key Vault secret names needed by any container
  all_kv_secret_names = distinct(flatten([
    for container_key, container_config in var.container_definitions : [
      for secret_env_var, kv_secret_name in try(container_config.secrets, {}) : kv_secret_name
    ]
  ]))

  # Create the map structure expected by the azurerm_container_app 'secret' block
  app_secrets = {
    for kv_secret_name in local.all_kv_secret_names : kv_secret_name => {
      # Construct the Key Vault Secret ID using the vault URI passed as a variable
      key_vault_secret_id = "${var.key_vault_uri}secrets/${kv_secret_name}"
    }
  }
}

# --- Container App Resource ---
resource "azurerm_container_app" "app" {
  name                         = azurecaf_name.ca.result
  location                     = var.location
  resource_group_name          = var.resource_group_name
  container_app_environment_id = var.container_app_environment_id
  revision_mode                = var.revision_mode
  tags                         = var.tags

  identity {
    type = "SystemAssigned"
  }

  registry {
    server   = var.container_registry_login_server
    identity = "SystemAssigned"
  }

  # Define all secrets needed by any container at the app level
  dynamic "secret" {
    # Use the aggregated map from locals
    for_each = local.app_secrets
    content {
      name                = secret.key # Use the KV secret name as the app-level secret name
      key_vault_secret_id = secret.value.key_vault_secret_id
    }
  }

  ingress {
    external_enabled = var.external_ingress_enabled
    target_port      = var.ingress_target_port # Use the specific ingress target port variable
    transport        = "http"

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  template {
    min_replicas = var.min_replicas
    max_replicas = var.max_replicas

    # Define multiple containers dynamically
    dynamic "container" {
      for_each = var.container_definitions # Iterate over the map passed in
      content {
        name = container.key # Use the map key ("service1", "service2") as container name
        
        # Construct image name dynamically using digests from the JSON file
        # Extract the full digest from the service_digests map
        image = "${var.container_registry_login_server}/${container.value.image_repo_name}@${replace(lookup(local.service_digests, container.key, ""), "${var.container_registry_login_server}/${container.value.image_repo_name}@", "")}"
        
        cpu    = container.value.cpu
        memory = container.value.memory

        # Non-secret environment variables for this specific container
        dynamic "env" {
          for_each = try(container.value.env_vars, {})
          content {
            name  = env.key
            value = env.value
          }
        }

        # Secret environment variables for this specific container
        dynamic "env" {
          # Iterate over the secrets defined for *this* container in the input map
          for_each = try(container.value.secrets, {})
          content {
            name        = env.key                               # Env var name (e.g., "DATABASE_URL")
            secret_name = env.value                             # Reference the app-level secret name (which is the KV secret name)
          }
        }

        # Add liveness probe if defined in container_definitions
        dynamic "liveness_probe" {
          for_each = try(container.value.liveness_probe, null) != null ? [1] : []
          content {
            transport        = try(container.value.liveness_probe.transport, "HTTP")
            port             = container.value.target_port
            path             = try(container.value.liveness_probe.path, "/healthz")
            initial_delay    = try(container.value.liveness_probe.initial_delay, 15)
            interval_seconds = try(container.value.liveness_probe.interval_seconds, 10)
            timeout_seconds  = try(container.value.liveness_probe.timeout_seconds, 5)
            failure_count_threshold = try(container.value.liveness_probe.failure_count_threshold, 3)
          }
        }

        # Add readiness probe if defined in container_definitions
        dynamic "readiness_probe" {
          for_each = try(container.value.readiness_probe, null) != null ? [1] : []
          content {
            transport        = try(container.value.readiness_probe.transport, "HTTP")
            port             = container.value.target_port
            path             = try(container.value.readiness_probe.path, "/healthz")
            interval_seconds = try(container.value.readiness_probe.interval_seconds, 10)
            timeout_seconds  = try(container.value.readiness_probe.timeout_seconds, 5)
            failure_count_threshold = try(container.value.readiness_probe.failure_count_threshold, 3)
          }
        }

        # Add volume mounts if defined in container_definitions
        dynamic "volume_mounts" {
          for_each = try(container.value.volume_mounts, {})
          content {
            name = volume_mounts.key
            path = volume_mounts.value
          }
        }

        # Add startup command if defined
        dynamic "command" {
          for_each = try(container.value.command, null) != null ? [1] : []
          content {
            value = container.value.command
          }
        }
      }
    }
    
    # Add volumes if defined
    dynamic "volume" {
      for_each = var.volumes != null ? var.volumes : {}
      content {
        name         = volume.key
        storage_name = volume.value.storage_name
        storage_type = volume.value.storage_type
      }
    }
    
    # Add scale rules if needed
    dynamic "scale_rule" {
      for_each = var.scale_rules != null ? var.scale_rules : []
      content {
        name        = scale_rule.value.name
        custom      = scale_rule.value.custom != null ? scale_rule.value.custom : null
        http        = scale_rule.value.http != null ? scale_rule.value.http : null
        tcp         = scale_rule.value.tcp != null ? scale_rule.value.tcp : null
        azure_queue = scale_rule.value.azure_queue != null ? scale_rule.value.azure_queue : null
      }
    }
  }

  depends_on = [
    azurerm_role_assignment.acr_pull,
    azurerm_role_assignment.key_vault_secrets_user
  ]

  lifecycle {
    ignore_changes = [
      tags,
      ingress[0].traffic_weight,
      # Ignore changes to all container images as they are managed by CI/CD tags
      template[0].container,
    ]
  }
}

# --- Role Assignments ---
resource "azurerm_role_assignment" "acr_pull" {
  scope                = var.container_registry_id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_container_app.app.identity[0].principal_id
  depends_on           = [azurerm_container_app.app]
}

resource "azurerm_role_assignment" "key_vault_secrets_user" {
  scope                = var.key_vault_id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_container_app.app.identity[0].principal_id
  depends_on           = [azurerm_container_app.app]
}