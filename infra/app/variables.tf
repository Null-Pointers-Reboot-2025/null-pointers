# Shared context
variable "project_prefix"      { type = string }
variable "environment"         { type = string }
variable "location"            { type = string }
variable "resource_group_name" { type = string }

# App identifiers
variable "application_name" {
  type        = string
  description = "Logical name for the multi-container app."
}

# Static container definitions
variable "containers" {
  type = map(object({
    image_repo_name = string
    target_port     = number
    cpu             = number
    memory          = string
    env_vars        = optional(map(string), {})
    secrets         = optional(map(string), {})
  }))
  description = "Per-container configuration map."
}

# Immutable digests (injected by CD)
variable "service_digests_file" {
  type        = string
  description = "Path to JSON file containing service digests"
}

# Ingress / scaling
variable "app_revision_mode"            { type = string }
variable "app_external_ingress_enabled" { type = bool }
variable "app_ingress_target_port"      { type = number }
variable "app_min_replicas"             { type = number }
variable "app_max_replicas"             { type = number }
