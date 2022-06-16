import type { SidebarConfig } from "@vuepress/theme-default";

export const sidebarEn: SidebarConfig = [
  {
    text: "Introduction",
    collapsible: true,
    children: [
      {
        text: "SAAP Introduction",
        link: "/sre/introduction/introduction.md",
      },
      "/sre/introduction/why-sro.md",
      "/sre/introduction/sro-overview.md",
      "/sre/introduction/sro-features.md",
      "/sre/introduction/sro-key-differentiators.md",
    ],
  },
  {
    text: "Managed AddOns",
    collapsible: true,
    children: ["/sre/addons/introduction.md"],
  },
  {
    text: "Cloud Provider",
    collapsible: true,
    children: [
      "/sre/cloud-provider/introduction.md",
      "/sre/cloud-provider/azure.md",
      "/sre/cloud-provider/aws.md",
      "/sre/cloud-provider/google.md",
      "/sre/cloud-provider/binero.md",
    ],
  },
  {
    text: "Applications",
    collapsible: true,
    children: [
      "/sre/applications/cloud-native-app.md",
      "/sre/applications/helm.md",
      "/sre/forecastle/forecastle.md",
    ],
  },
  {
    text: "GitOps",
    collapsible: true,
    children: [
      "/sre/gitops/introduction.md",
      "/sre/gitops/github.md",
      "/sre/gitops/gitlab.md",
      "/sre/gitops/bot-account.md",
      "/sre/gitops/structure.md",
      "/sre/gitops/environments.md",
      "/sre/gitops/faqs.md",
    ],
  },
  {
    text: "Onboarding",
    collapsible: true,
    children: [
      "/sre/onboarding/tenant-onboarding.md",
      "/sre/onboarding/application-onboarding.md",
      "/sre/onboarding/environment-onboarding.md",
      "/sre/onboarding/cluster-onboarding.md",
      "/sre/onboarding/quota-onboarding.md",
      "/sre/onboarding/developer-training.md",
    ],
  },
  {
    text: "Authentication and Authorization",
    collapsible: true,
    children: [
      "/sre/authentication-authorization/google-idp.md",
      "/sre/authentication-authorization/azure-idp.md",
      "/sre/authentication-authorization/keycloak-idp.md",
      "/sre/authentication-authorization/saml-idp.md",
      "/sre/authentication-authorization/saap-authorization-roles.md",
      "/sre/authentication-authorization/curated-list-operators.md",
    ],
  },
  {
    text: "Continuous Integration & Deployment (CI&CD)",
    collapsible: true,
    children: ["/sre/pipelines/introduction.md"],
  },
  {
    text: "ArgoCD",
    collapsible: true,
    children: ["/sre/argocd/01-introduction.md"],
  },

  {
    text: "Tekton",
    collapsible: true,
    children: ["/sre/tekton/cluster-tasks.md"],
  },

  {
    text: "Artifacts Management",
    collapsible: true,
    children: [
      "/sre/repository/01-introduction.md",
      "/sre/repository/06-accessing-repository.md",
      "/sre/repository/03-permissions.md",
      "/sre/repository/04-routes.md",
      "/sre/repository/08-grant-nexus-admin-keycloak.md",
      "/sre/repository/05-FAQ.md",
    ],
  },
  {
    text: "Code Quality",
    collapsible: true,
    children: [
      "/sre/code-quality/01-introduction.md",
      "/sre/code-quality/sonarqube-upgrade.md",
    ],
  },
  {
    text: "Logging",
    collapsible: true,
    children: ["/sre/logging/logging.md", "/sre/logging/kibana-view-logs.md"],
  },
  {
    text: "Monitoring",
    collapsible: true,
    children: [
      "/sre/monitoring/01-introduction.md",
      "/sre/monitoring/02-maturity-model.md",
      "/sre/monitoring/app-uptime.md",
      "/sre/monitoring/app-alerts.md",
      "/sre/monitoring/goldilocks.md",
      "/sre/monitoring/kube-resource-report.md",
      "/sre/monitoring/grafana-dashboard.md",
    ],
  },
  {
    text: "Alerting",
    collapsible: true,
    children: [
      "/sre/alerting/downtime-notifications-uptimerobot.md",
      "/sre/alerting/workload-application-alerts.md",
      "/sre/alerting/log-alerts.md",
      "/sre/alerting/predefined-prometheusrules.md",
    ],
  },
  {
    text: "Autoscaling",
    collapsible: true,
    children: ["/sre/autoscaling/autoscaling.md"],
  },
  {
    text: "Storage",
    collapsible: true,
    children: ["/sre/storage/volume-expander.md"],
  },
  {
    text: "Backup & Restore",
    collapsible: true,
    children: [
      "/sre/backup-restore/01-introduction.md",
      "/sre/backup-restore/velero-cli.md",
      "/sre/backup-restore/backup-restore.md",
      "content/sre/backup-restore/troubleshoot.md",
      "content/sre/backup-restore/cleanup.md",
      "/sre/backup-restore/stateful-app-example.md",
      "/sre/backup-restore/restore-with-gitops.md",
      "/sre/backup-restore/02-limitations.md",
    ],
  },
  {
    text: "Networking",
    collapsible: true,
    children: [
      "/sre/networking/routes.md",
      "/sre/networking/hosting-dns.md",
      "/sre/networking/external-dns.md",
    ],
  },
  {
    text: "Secrets Management",
    collapsible: true,
    children: [
      "/sre/secrets/introduction.md",
      "/sre/secrets/sealed-secrets.md",
      "/sre/secrets/vault.md",
      "/sre/secrets/external-secret-operator/introduction.md",
      "/sre/secrets/external-secret-operator/workflow.md",
      "/sre/secrets/external-secret-operator/getting-started.md",
    ],
  },
  {
    text: "Certificate Management",
    collapsible: true,
    children: ["/sre/certificates/cert-manager.md"],
  },
  {
    text: "Local Development",
    collapsible: true,
    children: [
      "/sre/local-development/inner-loop.md",
      "/sre/local-development/inner-vs-outer-loop.md",
      "/sre/local-development/local-development-workflow.md",
      "/sre/local-development/tilt/step-by-step-guide.md",
    ],
  },
  {
    text: "Security",
    collapsible: true,
    children: ["/sre/security/policies/policies.md"],
  },
  {
    text: "Cluster Configuration",
    collapsible: true,
    children: ["/sre/cluster-configuration/node-configuration.md"],
  },
  {
    text: "Tenant-Operator",
    collapsible: true,
    children: [
      "/sre/tenant-operator/overview.md",
      "/sre/tenant-operator/features.md",
      "/sre/tenant-operator/installation.md",
      "/sre/tenant-operator/integration-config.md",
      "/sre/tenant-operator/customresources.md",
      "/sre/tenant-operator/tenant-roles.md",
      {
        text: "Use Cases",
        children: [
          {
            text: "Creating Quotas",
            link: "/sre/tenant-operator/usecases/quota.md",
          },
          {
            text: "Creating Tenant",
            link: "/sre/tenant-operator/usecases/tenant.md",
          },
          {
            text: "Creating Namespace",
            link: "/sre/tenant-operator/usecases/namespace.md",
          },
          {
            text: "Creating Template",
            link: "/sre/tenant-operator/usecases/template.md",
          },
          {
            text: "Deploying Template to Namespace",
            link: "/sre/tenant-operator/usecases/deploying-templates.md",
          },
          {
            text: "Configuring Multi-Tenant Isolation with Network Policy Template",
            link: "/sre/tenant-operator/usecases/configuring-multitenant-network-isolation.md",
          },
          {
            text: "Configuring IntegrationConfig",
            link: "/sre/tenant-operator/usecases/integrationconfig.md",
          },
          {
            text: "Creating ArgoCD AppProject",
            link: "/sre/tenant-operator/usecases/argocd.md",
          },
          {
            text: "Extending Manager ClusterRole",
            link: "/sre/tenant-operator/usecases/manager-clusterrole",
          },
        ],
      },
      "/sre/tenant-operator/argocd-multitenancy.md",
      "/sre/tenant-operator/vault-multitenancy.md",
      "/sre/tenant-operator/changelog.md",
      "/sre/tenant-operator/faq.md",
    ],
  },
  {
    text: "Tronador",
    collapsible: true,
    children: [
      "/sre/tronador/overview.md",
      "/sre/tronador/environment_provisioner.md",
      "/sre/tronador/tronador_config.md",
      "/sre/tronador/config_file.md",
      "/sre/tronador/cluster_task.md",
      "/sre/tronador/workflow.md",
      "/sre/tronador/troubleshooting.md",
      "/sre/tronador/changelog.md",
    ],
  },
  {
    text: "Frequently Asked Questions",
    collapsible: true,
    children: [
      "/sre/faq/product.md",
      "/sre/faq/operations.md",
      "/sre/faq/purchasing.md",
      "/sre/faq/customization.md",
      "/sre/faq/developers.md",
    ],
  },
  {
    text: "Release Notes",
    collapsible: true,
    children: ["/sre/release-notes/release-notes.md"],
  },
  {
    text: "Support",
    collapsible: true,
    children: ["/sre/support/support.md"],
  },
];
