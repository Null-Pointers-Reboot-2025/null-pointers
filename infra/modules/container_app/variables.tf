variable "app_name" {
  type        = string
  description = "The logical name of the application service (e.g., 'frontend', 'api'). Used for naming."
}

variable "project_prefix" {
  type        = string
  description = "The project prefix used for consistent naming."
}

variable "environment" {
  type        = string
  description = "The deployment environment (e.g., 'dev', 'staging', 'prod')."
}

variable "location" {
  type        = string
  description = "The Azure region where the Container App will be deployed."
}

variable "resource_group_name" {
  type        = string
  description = "The name of the resource group."
}

variable "container_app_environment_id" {
  type        = string
  description = "The resource ID of the Container App Environment where this app will run."
}

variable "container_registry_login_server" {
  type        = string
  description = "The login server of the Azure Container Registry (e.g., 'myacr.azurecr.io')."
}

variable "container_registry_id" {
  type        = string
  description = "The resource ID of the Azure Container Registry (used for role assignment)."
}

variable "key_vault_id" {
  type        = string
  description = "The resource ID of the Azure Key Vault containing the secrets (used for role assignment)."
  default     = null
}

variable "key_vault_uri" {
  type        = string
  description = "The URI of the Azure Key Vault (e.g., https://myvault.vault.azure.net/)."
  default     = null
}

# --- Service Digests ---

variable "service_digests_file" {
  type        = string
  description = "Path to JSON file containing service digests. Each key should match a container name with the digest as the value."
}

# --- Container Definitions ---

variable "container_definitions" {
  type = map(object({
    # Core settings
    image_repo_name = string # Name of the image repo in ACR
    target_port     = number # The port the container listens on internally
    cpu             = number # CPU cores allocated (e.g., 0.25, 0.5, 1.0)
    memory          = string # Memory allocated (e.g., "0.5Gi", "1Gi")
    
    # Environment and secrets
    env_vars        = optional(map(string), {}) # Non-secret env vars
    secrets         = optional(map(string), {}) # Maps container env var name to KV secret name
    
    # Container startup
    command         = optional(list(string)) # Command to execute (optional)
    args            = optional(list(string)) # Arguments for the command (optional)
    
    # Health monitoring
    liveness_probe  = optional(object({
      path                  = optional(string, "/healthz")
      port                  = optional(number)
      transport             = optional(string, "HTTP")
      header                = optional(map(list(string)))
      initial_delay_seconds = optional(number, 15)
      interval_seconds      = optional(number, 10)
      timeout_seconds       = optional(number, 5)
      failure_count_threshold = optional(number, 3)
      success_count_threshold = optional(number, 1)
    }))
    
    readiness_probe = optional(object({
      path                  = optional(string, "/healthz")
      port                  = optional(number)
      transport             = optional(string, "HTTP")
      header                = optional(map(list(string)))
      interval_seconds      = optional(number, 10)
      timeout_seconds       = optional(number, 5)
      failure_count_threshold = optional(number, 3)
      success_count_threshold = optional(number, 1)
    }))
    
    startup_probe   = optional(object({
      path                  = optional(string, "/healthz")
      port                  = optional(number)
      transport             = optional(string, "HTTP")
      header                = optional(map(list(string)))
      interval_seconds      = optional(number, 10)
      timeout_seconds       = optional(number, 5)
      failure_count_threshold = optional(number, 3)
      success_count_threshold = optional(number, 1)
    }))
    
    # Storage
    volume_mounts   = optional(map(string), {}) # Map of volume name to mount path
  }))
  description = "A map defining the configuration for each container within the application. The key is the container name."
}

# --- Volumes ---

variable "volumes" {
  type = map(object({
    name         = string
    storage_name = optional(string)
    storage_type = optional(string)
    
    # For Azure File Shares
    azure_file_share = optional(object({
      name           = string
      account_name   = string
      account_key    = string
      share_name     = string
      read_only      = optional(bool, false)
    }))
    
    # For Ephemeral storage
    empty_dir = optional(object({
      size_limit = optional(string)
    }))
  }))
  description = "Storage volumes to be mounted to containers"
  default     = {}
}

# --- App-level settings ---

variable "revision_mode" {
  type        = string
  description = "Revision mode for the Container App ('Single' or 'Multiple')."
  default     = "Multiple"
  validation {
    condition     = contains(["Single", "Multiple"], var.revision_mode)
    error_message = "Revision mode must be either 'Single' or 'Multiple'."
  }
}

variable "external_ingress_enabled" {
  type        = bool
  description = "Whether the container app should have external ingress enabled."
  default     = true
}

variable "ingress_target_port" {
  type        = number
  description = "The internal container port that external ingress traffic should target."
}

variable "ingress_traffic_weights" {
  type = list(object({
    label           = optional(string)
    revision_suffix = optional(string)
    percentage      = number
    latest_revision = optional(bool, false)
  }))
  description = "Traffic weight configurations for revisions. If omitted, 100% traffic goes to latest revision."
  default     = [
    {
      percentage      = 100
      latest_revision = true
    }
  ]
}

variable "ingress_transport" {
  type        = string
  description = "The transport protocol for ingress traffic: http, http2, auto, or tcp."
  default     = "http"
  validation {
    condition     = contains(["http", "http2", "auto", "tcp"], var.ingress_transport)
    error_message = "Ingress transport must be one of: http, http2, auto, tcp."
  }
}

variable "ingress_allowed_ips" {
  type        = list(string)
  description = "List of allowed IP ranges for ingress traffic."
  default     = []
}

# --- Scaling ---

variable "min_replicas" {
  type        = number
  description = "Minimum number of replicas for the container app."
  default     = 0
}

variable "max_replicas" {
  type        = number
  description = "Maximum number of replicas for the container app."
  default     = 1
}

variable "scale_rules" {
  type = list(object({
    name = string
    
    # HTTP scaling
    http = optional(object({
      metadata = map(string)
      auth     = optional(list(map(string)))
    }))
    
    # TCP scaling
    tcp = optional(object({
      metadata = map(string)
      auth     = optional(list(map(string)))
    }))
    
    # Custom scaling
    custom = optional(object({
      metadata = map(string)
      auth     = optional(list(map(string)))
    }))
    
    # Azure Queue scaling
    azure_queue = optional(object({
      queue_name              = string
      queue_length            = number
      auth                    = list(map(string))
      storage_account_name    = optional(string)
    }))
  }))
  description = "List of scaling rules for the Container App"
  default     = []
}

# --- Authentication and Dapr ---

variable "identity_type" {
  type        = string
  description = "The type of managed identity to assign to the Container App."
  default     = "SystemAssigned"
  validation {
    condition     = contains(["SystemAssigned", "UserAssigned", "SystemAssigned, UserAssigned"], var.identity_type)
    error_message = "Identity type must be 'SystemAssigned', 'UserAssigned', or 'SystemAssigned, UserAssigned'."
  }
}

variable "user_assigned_identity_ids" {
  type        = list(string)
  description = "List of user-assigned identity IDs to assign to the Container App."
  default     = []
}

variable "dapr_enabled" {
  type        = bool
  description = "Whether to enable Dapr for the Container App."
  default     = false
}

variable "dapr_app_id" {
  type        = string
  description = "The Dapr application ID."
  default     = null
}

variable "dapr_app_port" {
  type        = number
  description = "The port Dapr uses to communicate with the application."
  default     = null
}

variable "dapr_app_protocol" {
  type        = string
  description = "The protocol Dapr uses to communicate with the application (e.g., 'http', 'grpc')."
  default     = "http"
}

# --- General ---

variable "registry_use_managed_identity" {
  type        = bool
  description = "Whether to use the system-assigned managed identity to pull images from ACR."
  default     = true
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to the container app resource."
  default     = {}
}