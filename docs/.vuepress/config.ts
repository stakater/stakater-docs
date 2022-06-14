import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";

export default defineUserConfig({
  // base URL
  base: "/",

  //language and other basic information of the website
  lang: "en-US",
  title: "Stakater App Agility Platform Documentation",
  description: "Stakater App Agility Platform Documentation", //TODO: Add user/search friendly description. abaziz

  theme: defaultTheme({
    sidebar: [
      {
        text: "Introduction",
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
        children: ["/sre/addons/introduction.md"],
      },
      {
        text: "Cloud Provider",
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
        children: [
          "/sre/applications/cloud-native-app.md",
          "/sre/applications/helm.md",
          "/sre/forecastle/forecastle.md",
        ],
      },
      {
        text: "GitOps",
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
        children: ["/sre/pipelines/introduction.md"],
      },
      {
        text: "ArgoCD",
        children: ["/sre/argocd/01-introduction.md"],
      },

      { text: "Tekton", children: ["/sre/tekton/cluster-tasks.md"] },

      {
        text: "Artifacts Management",
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
        children: [
          "/sre/code-quality/01-introduction.md",
          "/sre/code-quality/sonarqube-upgrade.md",
        ],
      },
      {
        text: "Logging",
        children: [
          "/sre/logging/logging.md",
          "/sre/logging/kibana-view-logs.md",
        ],
      },
      {
        text: "Monitoring",
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
        children: [
          "/sre/alerting/downtime-notifications-uptimerobot.md",
          "/sre/alerting/workload-application-alerts.md",
          "/sre/alerting/log-alerts.md",
          "/sre/alerting/predefined-prometheusrules.md",
        ],
      },
      {
        text: "Autoscaling",
        children: ["/sre/autoscaling/autoscaling.md"],
      },
      {
        text: "Storage",
        children: ["/sre/storage/volume-expander.md"],
      },
      {
        text: "Backup & Restore",
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
        children: [
          "/sre/networking/routes.md",
          "/sre/networking/hosting-dns.md",
          "/sre/networking/external-dns.md",
        ],
      },
      {
        text: "Secrets Management",
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
        children: ["/sre/certificates/cert-manager.md"],
      },
      {
        text: "Local Development",
        children: [
          "/sre/local-development/inner-loop.md",
          "/sre/local-development/inner-vs-outer-loop.md",
          "/sre/local-development/local-development-workflow.md",
          "/sre/local-development/tilt/step-by-step-guide.md",
        ],
      },
      {
        text: "Security",
        children: ["/sre/security/policies/policies.md"],
      },
      {
        text: "Cluster Configuration",
        children: ["/sre/cluster-configuration/node-configuration.md"],
      },
      {
        text: "Tenant-Operator",
        children: [
          "/sre/tenant-operator/overview.md",
          "/sre/tenant-operator/features.md",
          "/sre/tenant-operator/installation.md",
          "/sre/tenant-operator/integration-config.md",
          "/sre/tenant-operator/customresources.md",
          "/sre/tenant-operator/tenant-roles.md",
          "/sre/tenant-operator/usecases/use-cases.md",
          "/sre/tenant-operator/argocd-multitenancy.md",
          "/sre/tenant-operator/vault-multitenancy.md",
          "/sre/tenant-operator/changelog.md",
          "/sre/tenant-operator/faq.md",
        ],
      },
      {
        text: "Tronador",
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
        children: ["/sre/release-notes/release-notes.md"],
      },
      {
        text: "Support",
        children: ["/sre/support/support.md"],
      },
    ],
    //sidebar: 'auto',
    navbar: [
      {
        text: "Docs Home",
        link: "/sre/introduction/introduction.html",
      },

      {
        text: "Stakater Home",
        link: "https://www.google.com",
      },
      {
        text: "Offerings",
        children: [
          {
            text: "SAAP",
            link: "https://www.stakater.com/saap-kubernetes-openshift",
          },
          {
            text: "Consultancy",
            link: "https://www.stakater.com/kubernetes-consultancy",
          },
        ],
      },
      {
        text: "Learnings",
        children: [
          {
            text: "Events",
            link: "https://www.stakater.com/events",
          },
          {
            text: "Recordings",
            link: "https://www.stakater.com/events",
          },
        ],
      },
      {
        text: "Platform Assessment",
        link: "https://www.stakater.com/kubernetes-platform-assessment",
      },
      {
        text: "More",
        children: [
          {
            text: "Careers",
            link: "https://www.stakater.com/kubernetes-platform-assessment",
          },
          {
            text: "FAQs",
            link: "https://www.stakater.com/faqs",
          },
        ],
      },
    ],
  }),
});
