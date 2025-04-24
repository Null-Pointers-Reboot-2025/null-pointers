variable "resource_group_name" {
  type        = string
  description = "The name of the Azure Resource Group where resources will be created."
}

variable "location" {
  type        = string
  description = "The Azure region where resources will be deployed (e.g., 'uksouth', 'eastus')."
}

variable "environment" {
  type        = string
  description = "The deployment environment name (e.g., 'dev', 'staging', 'prod')."
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod."
  }
}

variable "project_prefix" {
  type        = string
  description = "A short prefix used for naming resources to ensure uniqueness and identification (e.g., 'hackapp')."
  validation {
    condition     = length(var.project_prefix) > 0 && length(var.project_prefix) <= 10
    error_message = "Project prefix must be between 1 and 10 characters."
  }
}

variable "tags" {
  type        = map(string)
  description = "A map of tags to apply to all created resources."
  default = {
    Project     = "MultiContainerApp"
    Environment = "Unknown" # Will be overridden by main.tf using var.environment
    ManagedBy   = "Terraform"
  }
}

variable "container_registry_sku" {
  type        = string
  description = "The SKU for the Azure Container Registry (e.g., 'Basic', 'Standard', 'Premium')."
  default     = "Basic" # Basic is often sufficient for hackathons
}

variable "key_vault_sku_name" {
  type        = string
  description = "The SKU for the Azure Key Vault (e.g., 'standard', 'premium')."
  default     = "standard"
}

variable "container_apps_environment_compute" {
  type = object({
    workload_profile_name = string
    minimum_nodes         = number
    maximum_nodes         = number
  })
  description = "Configuration for the Container Apps Environment workload profile."
  default = {
    # Using Consumption profile as default for cost-effectiveness in hackathons
    workload_profile_name = "Consumption"
    minimum_nodes         = null # Not applicable for Consumption
    maximum_nodes         = null # Not applicable for Consumption
  }
  # Add validation if needed for dedicated plans
}

variable "vnet_address_space" {
  type        = list(string)
  description = "The address space for the Virtual Network used by the Container Apps Environment."
  default     = ["10.0.0.0/16"]
}

variable "container_apps_subnet_address_prefix" {
  type        = string
  description = "The address prefix for the subnet dedicated to the Container Apps Environment."
  default     = "10.0.1.0/24"
}

variable "internal_ingress_subnet_address_prefix" {
  type        = string
  description = "The address prefix for the subnet dedicated to internal ingress controllers if needed (optional)."
  default     = "10.0.2.0/24" # Example, adjust if needed
}


# --- Variables for Single Multi-Container App ---

variable "application_name" {
  type        = string
  description = "The logical name for the single multi-container application (used for naming resources)."
  default     = "multi-svc-app" # Example default, consider using project_prefix
}

variable "containers" {
  type = map(object({
    # Static config defined per container
    image_repo_name        = string # Name of the image repo in ACR (e.g., "service1", "service2")
    target_port            = number # The port the container listens on internally
    cpu                    = number # CPU cores allocated (e.g., 0.25, 0.5, 1.0)
    memory                 = string # Memory allocated (e.g., "0.5Gi", "1Gi")
    env_vars               = optional(map(string), {}) # Non-secret env vars
    secrets                = optional(map(string), {}) # Maps container env var name to KV secret name
    # Add probes, volume mounts etc. if needed per container definition
    # Example:
    # readiness_path = optional(string, "/healthz")
    # liveness_path  = optional(string, "/healthz")
  }))
  description = "A map defining the configuration for each container within the single application. Key is the container name (e.g., 'service1'). Image tag comes from separate variables."
  default = {
    "service1" = {
      image_repo_name  = "service1"
      target_port      = 8080
      cpu              = 0.25
      memory           = "0.5Gi"
      env_vars = {
        "LOG_LEVEL" = "INFO"
      }
      secrets = {
        "API_KEY" = "service1-api-key"
      }
    },
    "service2" = {
      image_repo_name  = "service2"
      target_port      = 5000
      cpu              = 0.25
      memory           = "0.5Gi"
      secrets = {
         "DATABASE_URL" = "service2-db-connection"
      }
    }
  }
}

variable "service_digests_file" {
  type        = string
  description = "Path to JSON file containing service digests"
}

# --- App-level settings ---

variable "app_revision_mode" {
  type = string
  default = "Multiple" # Required for A/B and Canary
  description = "Revision mode for the Container App ('Single' or 'Multiple')."
}

variable "app_external_ingress_enabled" {
  type = bool
  default = true # Make the combined app accessible externally by default
  description = "Whether the main application ingress should be accessible from the internet."
}

variable "app_ingress_target_port" {
  type = number
  default = 8080 # Default to service1's port for external traffic
  description = "The internal container port that external ingress traffic should target."
}

variable "app_min_replicas" {
  type = number
  default = 0 # Default scale-to-zero for non-prod
  description = "Minimum number of replicas for the application."
}

variable "app_max_replicas" {
  type = number
  default = 2 # Default max replicas
  description = "Maximum number of replicas for the application."
}