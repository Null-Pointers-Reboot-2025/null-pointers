########################################
# Look up core resources
########################################
data "azurerm_resource_group" "core" {
  name = var.resource_group_name
}

data "azurerm_container_registry" "acr" {
  name                = "acr${var.project_prefix}${var.environment}"
  resource_group_name = data.azurerm_resource_group.core.name
}

data "azurerm_container_app_environment" "cae" {
  name                = "cae-${var.project_prefix}-${var.environment}-${var.location}"
  resource_group_name = data.azurerm_resource_group.core.name
}

########################################
# Container App module
########################################
module "container_app" {
  source = "../../modules/container_app"

  resource_group_name              = data.azurerm_resource_group.core.name
  location                         = var.location
  container_app_environment_id     = data.azurerm_container_app_environment.cae.id
  container_registry_login_server  = data.azurerm_container_registry.acr.login_server
  container_registry_id            = data.azurerm_container_registry.acr.id

  app_name        = var.application_name
  project_prefix  = var.project_prefix
  environment     = var.environment

  container_definitions = var.containers
  service_digests_file  = var.service_digests_file

  revision_mode            = var.app_revision_mode
  external_ingress_enabled = var.app_external_ingress_enabled
  ingress_target_port      = var.app_ingress_target_port
  min_replicas             = var.app_min_replicas
  max_replicas             = var.app_max_replicas

  tags = {
    Environment = var.environment
    App         = var.application_name
  }
}
