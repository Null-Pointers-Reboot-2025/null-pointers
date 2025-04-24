# ------------ Core-infra variables (dev) ------------

# Required
resource_group_name = "Team25"
location            = "australiaeast"
environment         = "dev"
project_prefix      = "hackapp"

# Optional
tags = {
  Project     = "MultiContainerApp"
  Environment = "Development"
  ManagedBy   = "Terraform"
}

# Registry / network
container_registry_sku           = "Basic"
vnet_address_space               = ["10.1.0.0/16"]
container_apps_subnet_address_prefix = "10.1.0.0/23" # Changed from /24 to /23
