# ------------ App-stack variables (dev) ------------

# Still needed by app stack
resource_group_name = "Team25"
location            = "uksouth"
environment         = "dev"
project_prefix      = "hackapp"

# Application-specific
application_name = "hackapp-app"

containers = {
  service1 = {
    image_repo_name = "service1"
    target_port     = 8080
    cpu             = 0.25
    memory          = "0.5Gi"
  }
  service2 = {
    image_repo_name = "service2"
    target_port     = 5000
    cpu             = 0.25
    memory          = "0.5Gi"
  }
}

app_revision_mode            = "Multiple"
app_external_ingress_enabled = true
app_ingress_target_port      = 8080
app_min_replicas             = 0
app_max_replicas             = 1
