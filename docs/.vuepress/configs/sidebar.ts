import type { SidebarConfig } from "@vuepress/theme-default";

export const sidebarEn: SidebarConfig = [
  {
    text: "Introduction",
    collapsible: true,
    children: [
      "/content/sre/introduction/introduction.md",
      "/content/sre/introduction/why-sro.md",
      "/content/sre/introduction/sro-overview.md",
      "/content/sre/introduction/sro-features.md",
      "/content/sre/introduction/sro-key-differentiators.md",
      "/content/sre/introduction/saap-vs-k8s.md"
    ],
  },
  {
    text: "Managed AddOns",
    collapsible: true,
    children: ["/content/sre/addons/introduction.md"],
  },
  {
    text: "Cloud Provider",
    collapsible: true,
    children: [
      "/content/sre/cloud-provider/introduction.md",
      "/content/sre/cloud-provider/azure.md",
      "/content/sre/cloud-provider/aws.md",
      "/content/sre/cloud-provider/google.md",
      "/content/sre/cloud-provider/binero.md",
    ],
  },
  {
    text: "Cluster Management",
    collapsible: true,
     children: [
       "/content/sre/cluster-management/hibernating-your-cluster.md",],
  },
  {
    text: "Applications",
    collapsible: true,
    children: [
      "/content/sre/applications/cloud-native-app.md",
      "/content/sre/applications/helm.md",
      "/content/sre/forecastle/forecastle.md",
    ],
  },
  {
    text: "GitOps",
    collapsible: true,
    children: [
      "/content/sre/gitops/introduction.md",
      "/content/sre/gitops/github.md",
      "/content/sre/gitops/gitlab.md",
      "/content/sre/gitops/bot-account.md",
      "/content/sre/gitops/structure.md",
      "/content/sre/gitops/environments.md",
      "/content/sre/gitops/faqs.md",
    ],
  },
  {
    text: "Onboarding",
    collapsible: true,
    children: [
      "/content/sre/onboarding/tenant-onboarding.md",
      "/content/sre/onboarding/application-onboarding.md",
      "/content/sre/onboarding/environment-onboarding.md",
      "/content/sre/onboarding/cluster-onboarding.md",
      "/content/sre/onboarding/quota-onboarding.md",
      "/content/sre/onboarding/developer-training.md",
    ],
  },
  {
    text: "Authentication and Authorization",
    collapsible: true,
    children: [
      "/content/sre/authentication-authorization/google-idp.md",
      "/content/sre/authentication-authorization/azure-idp.md",
      "/content/sre/authentication-authorization/keycloak-idp.md",
      "/content/sre/authentication-authorization/saml-idp.md",
      "/content/sre/authentication-authorization/saap-authorization-roles.md",
      "/content/sre/authentication-authorization/curated-list-operators.md",
    ],
  },
  {
    text: "Continuous Integration & Deployment (CI&CD)",
    collapsible: true,
    children: ["/content/sre/pipelines/introduction.md"],
  },
  {
    text: "ArgoCD",
    collapsible: true,
    children: ["/content/sre/argocd/01-introduction.md"],
  },

  {
    text: "Tekton",
    collapsible: true,
    children: ["/content/sre/tekton/cluster-tasks.md"],
  },
  {
    text: "Artifacts Management",
    collapsible: true,
    children: [
      "/content/sre/repository/01-introduction.md",
      "/content/sre/repository/06-accessing-repository.md",
      "/content/sre/repository/03-permissions.md",
      "/content/sre/repository/04-routes.md",
      "/content/sre/repository/08-grant-nexus-admin-keycloak.md",
      "/content/sre/repository/05-FAQ.md",
    ],
  },
  {
    text: "Code Quality",
    collapsible: true,
    children: [
      "/content/sre/code-quality/01-introduction.md",
      "/content/sre/code-quality/sonarqube-upgrade.md",
    ],
  },
  {
    text: "Logging",
    collapsible: true,
    children: ["/content/sre/logging/logging.md", "/content/sre/logging/kibana-view-logs.md"],
  },
  {
    text: "Monitoring",
    collapsible: true,
    children: [
      "/content/sre/monitoring/01-introduction.md",
      "/content/sre/monitoring/02-maturity-model.md",
      "/content/sre/monitoring/app-uptime.md",
      "/content/sre/monitoring/app-alerts.md",
      "/content/sre/monitoring/goldilocks.md",
      "/content/sre/monitoring/kube-resource-report.md",
      "/content/sre/monitoring/grafana-dashboard.md",
    ],
  },
  {
    text: "Alerting",
    collapsible: true,
    children: [
      "/content/sre/alerting/downtime-notifications-uptimerobot.md",
      "/content/sre/alerting/workload-application-alerts.md",
      "/content/sre/alerting/log-alerts.md",
      "/content/sre/alerting/predefined-prometheusrules.md",
    ],
  },
  {
    text: "Autoscaling",
    collapsible: true,
    children: ["/content/sre/autoscaling/autoscaling.md"],
  },
  {
    text: "Storage",
    collapsible: true,
    children: ["/content/sre/storage/volume-expander.md"],
  },
  {
    text: "Backup & Restore",
    collapsible: true,
    children: [
      "/content/sre/backup-restore/01-introduction.md",
      "/content/sre/backup-restore/velero-cli.md",
      "/content/sre/backup-restore/backup-restore.md",
      "/content/sre/backup-restore/troubleshoot.md",
      "/content/sre/backup-restore/cleanup.md",
      "/content/sre/backup-restore/stateful-app-example.md",
      "/content/sre/backup-restore/restore-with-gitops.md",
      "/content/sre/backup-restore/02-limitations.md",
    ],
  },
  {
    text: "Networking",
    collapsible: true,
    children: [
      "/content/sre/networking/routes.md",
      "/content/sre/networking/hosting-dns.md",
      "/content/sre/networking/external-dns.md",
    ],
  },
  {
    text: "Secrets Management",
    collapsible: true,
    children: [
      "/content/sre/secrets/introduction.md",
      "/content/sre/secrets/sealed-secrets.md",
      "/content/sre/secrets/vault.md",
      "/content/sre/secrets/external-secret-operator/introduction.md",
      "/content/sre/secrets/external-secret-operator/workflow.md",
      "/content/sre/secrets/external-secret-operator/getting-started.md",
    ],
  },
  {
    text: "Certificate Management",
    collapsible: true,
    children: ["/content/sre/certificates/cert-manager.md"],
  },
  {
    text: "Local Development",
    collapsible: true,
    children: [
      "/content/sre/local-development/inner-loop.md",
      "/content/sre/local-development/inner-vs-outer-loop.md",
      "/content/sre/local-development/local-development-workflow.md",
      "/content/sre/local-development/tilt/step-by-step-guide.md",
    ],
  },
  {
    text: "Security",
    collapsible: true,
    children: [
      "/content/sre/security/policies/policies.md",
      "/content/sre/security/rhacs/01-introduction.md",
      "/content/sre/security/rhacs/02-permissions.md",
      "/content/sre/security/rhacs/03-accessing-rhacs.md",
    ],
  },
  {
    text: "Cluster Configuration",
    collapsible: true,
    children: ["/content/sre/cluster-configuration/node-configuration.md"],
  },
  {
    text: "Tenant-Operator",
    collapsible: true,
    children: [
      "/content/sre/tenant-operator/overview.md",
      "/content/sre/tenant-operator/features.md",
      "/content/sre/tenant-operator/installation.md",
      "/content/sre/tenant-operator/integration-config.md",
      "/content/sre/tenant-operator/customresources.md",
      "/content/sre/tenant-operator/tenant-roles.md",
      {
        text: "Use Cases",
        children: [
          {
            text: "Creating Quotas",
            link: "/content/sre/tenant-operator/usecases/quota.md",
          },
          {
            text: "Creating Tenant",
            link: "/content/sre/tenant-operator/usecases/tenant.md",
          },
          {
            text: "Creating Namespace",
            link: "/content/sre/tenant-operator/usecases/namespace.md",
          },
          {
            text: "Creating Template",
            link: "/content/sre/tenant-operator/usecases/template.md",
          },
          {
            text: "Deploying Template to Namespace",
            link: "/content/sre/tenant-operator/usecases/deploying-templates.md",
          },
          {
            text: "Configuring Multi-Tenant Isolation with Network Policy Template",
            link: "/content/sre/tenant-operator/usecases/configuring-multitenant-network-isolation.md",
          },
          {
            text: "Distributing Secrets Using Sealed Secrets Template",
            link: "/content/sre/tenant-operator/usecases/distributing-secrets-using-sealed-secret-template.md",
          },
          {
            text: "Configuring IntegrationConfig",
            link: "/content/sre/tenant-operator/usecases/integrationconfig.md",
          },
          {
            text: "Creating ArgoCD AppProject",
            link: "/content/sre/tenant-operator/usecases/argocd.md",
          },
          {
            text: "Extending Manager ClusterRole",
            link: "/content/sre/tenant-operator/usecases/manager-clusterrole",
          },
        ],
      },
      "/content/sre/tenant-operator/hibernation.md",
      "/content/sre/tenant-operator/argocd-multitenancy.md",
      "/content/sre/tenant-operator/vault-multitenancy.md",
      "/content/sre/tenant-operator/changelog.md",
      "/content/sre/tenant-operator/troubleshooting.md",
      "/content/sre/tenant-operator/faq.md",
    ],
  },
  {
    text: "Tronador",
    collapsible: true,
    children: [
      "/content/sre/tronador/overview.md",
      "/content/sre/tronador/environment_provisioner.md",
      "/content/sre/tronador/environment.md",
      "/content/sre/tronador/tronador_config.md",
      "/content/sre/tronador/config_file.md",
      "/content/sre/tronador/cluster_task.md",
      "/content/sre/tronador/workflow.md",
      "/content/sre/tronador/troubleshooting.md",
      "/content/sre/tronador/changelog.md",
    ],
  },
  {
    text: "Frequently Asked Questions",
    collapsible: true,
    children: [
      "/content/sre/faq/product.md",
      "/content/sre/faq/operations.md",
      "/content/sre/faq/purchasing.md",
      "/content/sre/faq/customization.md",
      "/content/sre/faq/developers.md",
    ],
  },
  {
    text: "Release Notes",
    collapsible: true,
    children: ["/content/sre/release-notes/release-notes.md"],
  },
  {
    text: "Support",
    collapsible: true,
    children: ["/content/sre/support/support.md"],
  },
];
