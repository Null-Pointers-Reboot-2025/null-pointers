output "container_app_id" {
  value       = module.container_app.id
  description = "Resource ID of the deployed Container App."
}

output "container_app_fqdn" {
  value       = module.container_app.fqdn
  description = "Public FQDN (blank if internal)."
}
