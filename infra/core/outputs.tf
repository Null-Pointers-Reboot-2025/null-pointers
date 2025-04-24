output "resource_group_name" {
  value       = data.azurerm_resource_group.main.name
  description = "Name of core RG."
}

output "acr_login_server" {
  value       = azurerm_container_registry.main.login_server
  description = "ACR login server."
}

output "acr_name" {
  value       = azurerm_container_registry.main.name
  description = "ACR resource name."
}

output "container_app_environment_id" {
  value       = module.container_app_environment.id
  description = "Container App Environment ID."
}
