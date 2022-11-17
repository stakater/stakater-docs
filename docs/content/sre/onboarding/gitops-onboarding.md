Let us set up Stakater Opinionated Gitops Structure.

Stakater's GitOps structure is composed of two repositories; one for deploying infrastructural resources, and one for deploying the application workloads.

For the purpose of this tutorial, we will be using the name nordmart-infra-gitops-config for the former repository and nordmart-apps-gitops-config for the latter.
You can name these two repositories anything you want but make sure the names are descriptive.

Let's set these two repositories up!!

### Nordmart Infra GitOps Config
The cluster scoped infrastructural configurations are deployed through this repository.

To make things easier, we have created a [template](https://github.com/stakater/infra-gitops-config.git) that you can use to create your infra repository.

1. Open up your SCM and create any empty repository 

2. Now let's copy the structure that we saw in the [template](https://github.com/stakater/infra-gitops-config.git). Add a folder bearing your cluster's name at the root of the repository that you just created. If you plan on using this repository for multiple clusters, add a folder for each cluster.
3. Inside the folder created in step 2, add two folders; one named "argocd-apps", and another one named "tenant-operator-config"
 
> The argocd-apps folder will contain argocd applications that will _watch_ different resources added to the same repository. Let's spare ourselves from the details for now.

4. Open the tenant-operator-config folder and add two folder inside it: quotas, tenants
5. The tenants folder will contain the tenant you want to add to your cluster. Let's create one called "gabbar "by adding the file below:

```yaml
apiVersion: tenantoperator.stakater.com/v1beta1
kind: Tenant
metadata:
  name: gabbar
spec:
  quota: gabbar-large
  owners:
    users:
     - abc@gmail.com
  argocd:
      sourceRepos:
      - 'https://github.com/your-organization/infra-gitops-config'
      - 'https://github.com/your-organization/apps-gitops-config'
  templateInstances:
  - spec:
      template: tenant-vault-access
      sync: true
  namespaces:
  - build
  - dev
  - prod
  sandboxConfig:
    enabled: true
    private: true
  specificMetadata:
  - namespaces:
      - gabbar-build
    annotations:
      openshift.io/node-selector: node-role.kubernetes.io/pipeline=

```
6. We also need to add a quota for our gabbar tenant in our "quotas" folder created in step 4. So let's do it using the file below. The name of this quota need to match the name you specified in tenant CR.
```yaml
apiVersion: tenantoperator.stakater.com/v1beta1
kind: Quota
metadata:
  name: gabbar-large
  annotations:
    quota.tenantoperator.stakater.com/is-default: "false"
spec:
  resourcequota:
    hard:
      requests.cpu: "16"
      requests.memory: 32Gi
  limitrange:
    limits:
      - defaultRequest:
          cpu: 10m
          memory: 50Mi
        type: Container

```
7. Now that the quota and the tenant have been added, let's create an argocd application in the argpcd-apps folder that will point to these resources and help us deploy them.
Open up the argocd-apps folder and add the following file to it:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: CLUSTER_NAME-tenant-operator-config
  namespace: openshift-gitops
spec:
  destination:
    namespace: openshift-gitops
    server: 'https://kubernetes.default.svc'
  source:
    path: CLUSTER_NAME/tenant-operator-config
    repoURL: 'REPLACE ME WITH URL OF THE REPOSITORY THAT YOU ARE CURRENTLY WORKING ON'
    targetRevision: HEAD
    directory:
      recurse: true
  project: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true

```
Make sure you replace the repoUrl and all instances of CLUSTER_NAME with your cluster's name.
If you notice the path, you will realize that this application is pointing to 'tenant-operator-config' folder housing your tenant and quotas.

We have set up the basic structure for our infra repository. Let's move on to the apps repository.

# nordmart-apps-gitops-config

Single source of truth for declarative workloads to be deployed on [SAAP](https://www.stakater.com/saap-kubernetes-openshift) (Stakater App Agility Platform).

Stakater opinionated gitops repository structure:

- Mono repo; one repo for all clusters, tenants/teams and environments
- Single branch i.e. main and then separate folders per environment
- ArgoCD for application deployment
- Helm for templatization

## Why?

As a software organization, I would like to:

* Audit all changes made to pipelines, infrastructure, and application configuration.
* Roll forward/back to desired state in case of issues.
* Consistently configure all environments.
* Reduce manual effort by automating application and environment setup and remediation.
* Have an easy way to manage application and infrastructure state across clusters/environments.

## What?

* GitOps is a natural evolution of DevOps and Infrastructure-as-Code.
* GitOps is when the infrastructure and/or application state is fully represented by the contents of a git repository. Any changes to the git repository are reflected in the corresponding state of the associated infrastructure and applications through automation.

GitOps is a set of practices that leverages Git workflows to manage infrastructure and application configurations. By using Git repositories as the source of truth, it allows the DevOps team to store the entire state of the cluster configuration in Git so that the trail of changes are visible and auditable.

**GitOps** simplifies the propagation of infrastructure and application configuration changes across multiple clusters by defining your infrastructure and applications definitions as “code”.

- Ensure that the clusters have similar states for configuration, monitoring, or storage.
- Recover or recreate clusters from a known state.
- Create clusters with a known state.
- Apply or revert configuration changes to multiple clusters.
- Associate templated configuration with different environments.

## Principles?

* Git is the source of truth.
* Separate application source code (Java/Go) from deployment manifests i.e the application source code and the GitOps configuration reside in separate git repositories.
* Deployment manifests are helm charts and standard Kubernetes (k8s) manifests i.e Kubernetes manifests in the GitOps repository can be simply applied with nothing more than a `oc apply`.
* Helm for defining the differences between environments.

## Hierarchy

Tenant (Product) owns Applications which are promoted to different Environments (Static and Dynamic)

Cluster >> Tenants (teams/products) >> Applications >> Environments

A cluster can hold multiple tenants; and each tenant can hold multiple applications; and each application be deployed into multiple environments.

This gitops structure supports:

- Multiple clusters
- Multiple tenants/teams/products
- Multiple apps
- Multiple environments (both static and dynamic)

### Multiple clusters

We have 2 clusters:

1. Cluster # 1 (i.e. devtest) holds 3 environments: build, preview and dev
2. Cluster # 2 (i.e. prod) holds 2 environments: stage and prod

### Mutliple tenants

We have 2 product based tenants; who have exactly same structure

1. gabbar
2. veeru

### Multiple apps

We have 3 apps:

**Gabbar** has two apps:

1. stakater-nordmart-review,
2. stakater-nordmart-review-ui

**Veeru** has one app:

1. stakater-nordmart-inventory

### Mutliple environments

We have 5 environments for each **application**:

1. build
2. preview
3. dev
4. stage
5. prod

#### Build Env

A dedicated build namespace for a tenant which holds tekton pipleines; all tekton pipleines for all of applications of a given tenant run in this particular namespace

#### Preview Env

To support dynamic environments on PR (pull requests) we use Stakater Tronador; and Tronador's **Environment** custom resource is created in this namespace.

### Naming Convention

Environment names are prefixed by a number which depends upon the order in which the application should be promoted between the different environments; e.g. DTE > dev > stage > prod

We follow similar naming convention for naming the clusters.

### Nordmart Infra GitOps Config

The cluster scoped infrastructural configurations are deployed through a separate [infra](https://github.com/stakater/nordmart-infra-gitops-config) repository.

## CI/CD/CD Workflow

### High Level Architecture

![High Level Architecture](./docs/images/cluster-tenant-app-env.png)

---

### CI/CD Overview

![CI/CD Overview](./docs/images/overview.png)

---

### Pull request workflow

![PR Workflow](./docs/images/pr-workflow.png)

---

### Main branch workflow

[CI/CD/CD](https://www.websequencediagrams.com/?lz=dGl0bGUgQ29udGludW91cyBJbnRlZ3JhdGlvbgoKcGFydGljaXBhbnQgRGV2ZWxvcGVyAAkNQ29kZSBSZXBvAB8NVGVrdG9uADINSW1hZ2UgUmVnaXN0cnkATQ1LOHMgRGV2AGENQXJ0aWZhY3RvAB0PR2l0T3BzAGASQXJnAHUOSzhzIFFBCgoAgS4JLT4AgSMJOiBnaXQgcHVzaAoAgTcJLT4AgS8GOiB3ZWJob29rCm5vdGUgcmlnaHQgb2YAgUwHOiBzZXR1cAoAgVsGAEATbGwAIRducG0gdGVzdAAEG3J1biBidWlsZFxuAAIFIGltYWdlAGMJAII0DjoAgTsFABwHAIEVFmRlcGxveVxuaGVsbSB0ZW1wbGF0ZS4uLgCBNQkAgnIHOiBvYyBhcHBseSAtZgoAgwcHAFwUAIFMEQA4CXJ1bgBuHWhlYWx0aABnEkdFVCAvABYHAIJaFnRhZy1yZWxlYXMAggAKAIM-C2FkZCB0YWcAgxYXaW0AMwoAgQEYbG0ATxEAhHILOiBwdWJsaXNoACUFIGNoYXIAgysYZ2l0b3BzAIQSCQCFHws6IHVwZGF0ZSBRQSBmb2xkZXIKQXJnbwAVDwCEOAkAFgYAhTsGOiBzeW5jCg&s=default#)

![CI/CD/CD](./docs/images/ci-cd-cd-v1.png)

---

### Helm values override

#### Helm values override # 1

![Helm values override](./docs/images/helm-values-override.png)

#### Helm values override # 2

![Helm values override](./docs/images/helm-values-override-2.png)

---

### Outputs

The pipelines produce following outputs

![Pipeline outputs](./docs/images/outputs.png)

---

### Release workflow

![Release workflow](./docs/images/release-workflow.png)

---

### Tenant, Application and Environment Mapping

![Mapping](./docs/images/model-stk.jpg)

---

### Using an external chart in a helm chart repository

Helm charts in GitOps repositories can be defined

- Option # 1: locally, with a templates folder including all the Kubernetes manifests or
- Option # 2: without a templates folder using a dependency and this dependency points to an external Helm Chart Repository where your chart is located.

We prefer the later approach (option # 2); with this setup, the only configuration present in the GitOps repository is the environment-specific configuration and dependencies, based on versions. This solution scales better and has better versioning capabilities, but requires some more Helm expertise from developers.

Your resources are structured as follows:

1. For this particular environment, you define a Chart.yaml with an external dependency to a Chart Version. The Helm chart is located in a remote Helm Chart repository

2. The values.yaml for this particular environment contains all the environment-specific configuration and includes an image tag that points to a tag in the Container Registry

![App ](./docs/images/external-chart.png)

[Credits](https://www.pionative.com/post/how-to-manage-gitops-environments-at-scale-a-technical-guide)
