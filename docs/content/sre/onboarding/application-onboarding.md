# Add new application

This guide covers the step by step guide to onboard a new project/application/microservice on SAAP.

Changes required in application repository:

1. Add Helm Chart to application repository
2. Add Dockerfile to application repository
3. Add webhook to application repository 

Changes required in `gitops config repository`:

4. Add files in `apps-gitops-config` repository

Replace angle brackets with following values in below templates:

  - `<tenant>`: Name of the tenant
  - `<application>`: Name of the application
  - `<env>`:  Environment name
  - `<gitops-repo>`:  URL of your GitOps repo
  - `<nexus-repo>`: URL of nexus repository

## 1. Add Helm Chart to application repository

In application repo add Helm Chart in ***deploy*** folder at the root of your repository. To configure Helm chart add following 2 files in ***deploy*** folder.

1. A Chart.yaml is defined for each environment with an [external dependency](https://github.com/stakater/application) to a Chart Version. The Helm chart is present in a remote Helm Chart repository

```yaml 
apiVersion: v2
name: <application>
description: A Helm chart for Kubernetes
dependencies:
- name: application
  version: 1.2.10
  repository: https://stakater.github.io/stakater-charts  

type: application

version: 0.0.0
```

2. The values.yaml contains all the environment-specific configurations for the particular environment along with an image tag that points to a tag in the Container registry. Configure Helm values as per application needs.

```yaml
application:
  # application name should be short so limit of 63 characters in route can be fulfilled. Default route name formed is <application-name>-<namespace>.<base-domain>
  applicationName: <application>

  deployment:
    imagePullSecrets: nexus-docker-config-forked
```

For the sake of references explore following:

- [stakater-nordmart-review](https://github.com/stakater-lab/stakater-nordmart-review/deploy)
- [stakater-nordmart-review-ui](https://github.com/stakater-lab/stakater-nordmart-review-ui/deploy)

## 2. Add Dockerfile to application repository

Create [multi-stage builds](https://docs.docker.com/build/building/multi-stage/), use multiple `FROM` statements in your Dockerfile. Each `FROM` instruction can use a different base, and each of them begins a new stage of the build. You can selectively copy artifacts from one stage to another, leaving behind everything you don’t want in the final image. The end result is the same tiny production image as before, with a significant reduction in complexity. You don’t need to create any intermediate images, and you don’t need to extract any artifacts to your local system at all.

### Java

```
## BUILD STAGE
FROM maven:3.6.3-openjdk-11-slim AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package

## RUN STAGE
FROM registry.access.redhat.com/ubi8/openjdk-8

LABEL name="review" \
      maintainer="Stakater <hello@stakater.com>" \
      vendor="Stakater" \
      release="1" \
      summary="Java Spring boot application"

# Set working directory
ENV HOME=/opt/app
WORKDIR $HOME

# Expose the port on which your service will run
EXPOSE 8080

# NOTE we assume there's only 1 jar in the target dir
COPY --from=build /usr/src/app/target/*.jar $HOME/artifacts/app.jar

USER 1001

# Set Entrypoint
ENTRYPOINT exec java $JAVA_OPTS -jar artifacts/app.jar
```

## 3. Add webhook to application repository

Add webhook to the application repository; you can find the webhook URL in the routes of the `build` namespace; for payload you need to include the `pull requests` and `pushes` with ContentType `application/json`.

### GitHub

For GitHub add following to the payload.

![GitHub](./images/github.png)

### GitLab

_TODO_

### Bitbucket

_TODO_

## 4. Add files to `gitops config repository`

You need to create application folder inside a tenant. Inside application folder you need to create each environment folder that application will be deployed to. Following folders will be created.

- `\<tenant>/<01-application>`
- `\<tenant>/<01-application>/<00-build>`
- `\<tenant>/<01-application>/<00-preview>`
- `\<tenant>/<01-application>/<01-env>`
- `\<tenant>/<01-application>/<02-env>`
- `\<tenant>/<01-application>/<0n-env>`

To deploy, you'll need to add Helm chart of your application in **each** environment folder.

Add values of Helm chart that are different from  default values at ```deploy/values.yaml```  defined in application repository

Templates for the files:

- `<tenant>/<application>/<env>\values.yaml`:

``` yaml
<application>:
  application:
    space:
      enabled: false
    deployment:
      image:
        repository: <nexus-repo>/<tenant>/<application>
        tag: v0.0.1
```

- `<tenant>/<app>/<env>\Chart.yaml`:

``` yaml
apiVersion: v2
name: <application>
description: A Helm chart for Kubernetes
dependencies:
- name: <application>
  version: 0.0.*
  repository: <nexus-url> 

type: application

version: 0.1.0

appVersion: 1.0.0

```

- `<tenant>/configs/<env>/argocd/<application>.yaml`:

``` yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: <tenant>-<env>-<application>
  namespace: openshift-stakater-argocd
spec:
  destination:
    namespace: <tenant>-<env>
    server: 'https://kubernetes.default.svc'
  source:
    path: <tenant>/<application>/<env>
    repoURL: '<gitops-config>'
    targetRevision: HEAD
  project: <tenant>-<env>
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

## Junkyard

SAAP ships with few generic Tekton pipelines for quick jump start; all those pipelines expect to have Dockerfile in the root of the repository. Dockerfile should handle both build and package part; we typically use multi-stage Dockerfiles with 2 steps; one for build and another for run e.g.

The idea is to avoid having different pipelines for different applications and if possible do stuff in dockerfiles but there can be use cases where one might need to language specific pipelines.

Customers can do the way they like; as we ship few generic Tekton pipelines just for the sake of jump start.

We do have a separate offering `Pipeline as a Service`; in which we completely manage all sorts (generic and specific) of Tekton pipelines; reach out to [`sales@stakater.com`](mailto:sales@stakater.com) for more information.