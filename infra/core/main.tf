########################################
# CAF-compliant names
########################################
resource "azurecaf_name" "rg" {
  name          = var.project_prefix
  resource_type = "azurerm_resource_group"

  # prefixes = ["rg"] # Rely on resource_type for prefix
  suffixes  = [var.environment, var.location]
  separator = "-"
  clean_input = true
}

resource "azurecaf_name" "acr" {
  name          = var.project_prefix
  resource_type = "azurerm_container_registry"

  # prefixes = ["acr"] # Rely on resource_type for prefix
  suffixes  = [var.environment]     # ACR names must be globally unique
  separator = ""
  clean_input = true
}

resource "azurecaf_name" "log" {
  name          = var.project_prefix
  resource_type = "azurerm_log_analytics_workspace"

  # prefixes = ["log"] # Rely on resource_type for prefix
  suffixes  = [var.environment, var.location]
  separator = "-"
  clean_input = true
}

resource "azurecaf_name" "kv" {
  name          = var.project_prefix
  resource_type = "azurerm_key_vault"

  # prefixes = ["kv"] # Rely on resource_type for prefix
  suffixes  = [var.environment, var.location]
  separator = "-"
  clean_input = true
}

resource "azurecaf_name" "vnet" {
  name          = var.project_prefix
  resource_type = "azurerm_virtual_network"

  # prefixes = ["vnet"] # Rely on resource_type for prefix
  suffixes  = [var.environment, var.location]
  separator = "-"
  clean_input = true
}

resource "azurecaf_name" "cae_subnet" {
  name          = "cae"
  resource_type = "azurerm_subnet"

  # prefixes = ["snet"] # Rely on resource_type for prefix
  suffixes  = [var.environment]
  separator = "-"
  clean_input = true
}

resource "azurecaf_name" "cae" {
  name          = var.project_prefix
  resource_type = "azurerm_container_app_environment"

  # prefixes = ["cae"] # Rely on resource_type for prefix
  suffixes  = [var.environment, var.location]
  separator = "-"
  clean_input = true
}

########################################
# Core resources
########################################
data "azurerm_client_config" "current" {}

data "azurerm_resource_group" "main" {
  name = "Team25"
}

resource "azurerm_container_registry" "main" {
  name                = azurecaf_name.acr.result
  resource_group_name = data.azurerm_resource_group.main.name
  location            = data.azurerm_resource_group.main.location
  sku                 = var.container_registry_sku
  admin_enabled       = false
  tags                = merge(var.tags, { Environment = var.environment })
}

resource "azurerm_log_analytics_workspace" "main" {
  name                = azurecaf_name.log.result
  location            = data.azurerm_resource_group.main.location
  resource_group_name = data.azurerm_resource_group.main.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags                = merge(var.tags, { Environment = var.environment })
}

resource "azurerm_key_vault" "main" {
  name                        = azurecaf_name.kv.result
  location                    = data.azurerm_resource_group.main.location
  resource_group_name         = data.azurerm_resource_group.main.name
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  sku_name                    = var.key_vault_sku_name
  enable_rbac_authorization   = true
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false
  tags                        = merge(var.tags, { Environment = var.environment })
}

resource "azurerm_virtual_network" "main" {
  name                = azurecaf_name.vnet.result
  location            = data.azurerm_resource_group.main.location
  resource_group_name = data.azurerm_resource_group.main.name
  address_space       = var.vnet_address_space
  tags                = merge(var.tags, { Environment = var.environment })
}

resource "azurerm_subnet" "container_apps" {
  name                 = azurecaf_name.cae_subnet.result
  resource_group_name  = data.azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = [var.container_apps_subnet_address_prefix]

  # delegation {
  #   name = "ContainerAppEnvironments"

  #   service_delegation {
  #     name    = "Microsoft.App/environments"
  #     actions = ["Microsoft.Network/virtualNetworks/subnets/join/action"]
  #   }
  # }
}

########################################
# Container Apps Environment
########################################
module "container_app_environment" {
  source = "./modules/container_app_environment"

  name                       = azurecaf_name.cae.result
  resource_group_name        = data.azurerm_resource_group.main.name
  location                   = data.azurerm_resource_group.main.location
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
  infrastructure_subnet_id   = azurerm_subnet.container_apps.id

  tags = merge(var.tags, { Environment = var.environment })
}
