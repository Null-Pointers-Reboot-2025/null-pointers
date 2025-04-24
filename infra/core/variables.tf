########################################
# Context
########################################
variable "project_prefix" {
  type        = string
  description = "Short prefix for names (1–10 chars)."
  validation {
    condition     = length(var.project_prefix) > 0 && length(var.project_prefix) <= 10
    error_message = "project_prefix must be 1–10 characters."
  }
}

variable "environment" {
  type        = string
  description = "dev | staging | prod."
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be dev, staging or prod."
  }
}

variable "location" {
  type        = string
  description = "Azure region (e.g. uksouth)."
}

########################################
# Tags
########################################
variable "tags" {
  type        = map(string)
  description = "Tags applied to every core resource."
  default = {
    Project     = "MultiContainerApp"
    Environment = "Unknown"
    ManagedBy   = "Terraform"
  }
}

########################################
# Tunables
########################################
variable "container_registry_sku" {
  type        = string
  description = "ACR SKU (Basic | Standard | Premium)."
  default     = "Basic"
}

variable "key_vault_sku_name" {
  type        = string
  default     = "standard"
}

variable "container_apps_environment_compute" {
  description = "Workload profile; Consumption by default."
  type = object({
    workload_profile_name = string
    minimum_nodes         = number
    maximum_nodes         = number
  })
  default = {
    workload_profile_name = "Consumption"
    minimum_nodes         = null
    maximum_nodes         = null
  }
}

variable "vnet_address_space" {
  type        = list(string)
  default     = ["10.0.0.0/16"]
}

variable "container_apps_subnet_address_prefix" {
  type        = string
  default     = "10.0.1.0/24"
}
