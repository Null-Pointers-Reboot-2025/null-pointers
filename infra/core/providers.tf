terraform {
  # Define the backend type - configuration details are passed via -backend-config in pipeline
  backend "azurerm" {}

  required_version = ">= 1.3"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    azurecaf = {
      source  = "aztfmod/azurecaf"
      version = "~> 1.2"
    }
  }
}

provider "azurerm" {
  features {}

  # Configure OIDC authentication for GitHub Actions
  # The provider will automatically use ARM_CLIENT_ID, ARM_TENANT_ID,
  # ARM_SUBSCRIPTION_ID environment variables if set.
  # It should also automatically detect the OIDC token from the GitHub Actions environment.
  use_oidc        = true
  client_id       = "" # Required attribute, but value sourced from ARM_CLIENT_ID env var
  tenant_id       = "" # Required attribute, but value sourced from ARM_TENANT_ID env var
  subscription_id = "" # Required attribute, but value sourced from ARM_SUBSCRIPTION_ID env var
  oidc_token      = "" # Explicitly use OIDC token sourced from ARM_OIDC_TOKEN env var
}

# No specific provider block needed for azurecaf unless customizing its behavior