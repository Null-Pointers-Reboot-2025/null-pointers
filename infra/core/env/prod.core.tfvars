# ------------ Core-infra variables (prod) ------------

# Required
resource_group_name = "Team25"
location            = "uksouth"
environment         = "prod"
project_prefix      = "hackapp"

# Optional
tags = {
  Project     = "MultiContainerApp"
  Environment = "Production"
  ManagedBy   = "Terraform"
}

# Registry / network
container_registry_sku           = "Standard" # Example: Using Standard SKU for Prod
vnet_address_space               = ["10.2.0.0/16"] # Example: Using a different VNet space for Prod
container_apps_subnet_address_prefix = "10.2.0.0/23" # Example: Using a different subnet for Prod
