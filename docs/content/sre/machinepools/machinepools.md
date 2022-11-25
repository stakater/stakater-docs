# Machine Pools

A machine pool is a set of similar sized virtual machines, in Kubernetes terminology called nodes. In SAAP (Stakater App Agility Platform), different machine pools exist to serve different purposes. Details of machine pools and tools running on them are described here.

><u>**Glossary:**</u>
>
> **User workloads:** User applications (e-commerce frontend, backend APIs, etc.)
>
> **SAAP workloads:** Supporting applications for software lifecycle

## Resource Requirements

The overall minimum resource requirements are:

| Machine pool role | Minimum size (vCPU x Memory x Storage) | Minimum pool size | Total vCPU | Total Memory (GiB) | Total Storage (GiB) | Required |
|:---|:---|---:|---:|---:|---:|:---|
| Master | 4 x 32 x 100 | 3 | 12 | 96 | 300 | Yes |
| Infra | 4 x 16 x 100 | 2 | 8 | 32 | 200 | Yes |
| Monitoring | 4 x 32 x 100 | 1 | 4 | 32 | 100 | Yes |
| _Logging_ | _4 x 16 x 100_ | _1_ | _4_ | _16_ | _100_ | _Optional_ |
| _Pipeline_ | _4 x 16 x 100_ | _1_ | _4_ | _16_ | _100_ | _Optional_ |
| Worker | 4 x 16 x 100 | 3 | 12 | 48 | 300 | Yes |
| **Total minimum** | | 9 | 36 | 208 | 900 | |
| **Total recommended** | | 11 | 44 | 240 | 1100 | |

## Additional Storage Requirements

| SAAP component | Storage requirement (GiB)|
|---|---:|
| [Elasticsearch](https://github.com/elastic/elasticsearch) | 280  |
| [Prometheus - infrastructure](https://github.com/prometheus/prometheus) | 100  |
| [Prometheus - workload](https://github.com/prometheus/prometheus)| 100 |
| [SonarQube](https://github.com/SonarSource/sonarqube) | 5  |
| SonarQube Database | 8 |
| [Nexus](https://github.com/sonatype/nexus-public) | 100  |
| [Vault](https://github.com/hashicorp/vault) | 10 |
| **Total** | 603 |

**Volume Snapshot**  represents a snapshot of a volume on a storage system, it is recommended to have minimum one snapshot of each component.
## Network Requirements

**Load Balancer** is used to distribute traffic across multiple servers in order to prevent server overload. It is recommended to use 3 load balancers (2 Public, 1 Private).

**Floating IPs**  
## 3 x Master

The control plane, which is composed of master nodes, also known as the control plane, manages the SAAP cluster. The control plane nodes run the control plane. No user workloads run on master nodes.

## 2 x Infra

At least two infrastructure nodes are required for the SAAP infrastructure workloads:

| SAAP component | vCPU requirement | Memory requirement |
|---|---:|---:|
| [cert-manager-operator](https://github.com/openshift/cert-manager-operator)  | 100 m  | 1.50 GiB  |
| [External Secrets operator](https://github.com/external-secrets/external-secrets) | 50 m  | 0.30 GiB  |
| [Stakater Forecastle](https://github.com/stakater/Forecastle)  | 50 m  | 0.20 GiB  |
| [group-sync-operator](https://github.com/redhat-cop/group-sync-operator)  | 50 m  | 0.10 GiB  |
| [Helm operator](https://github.com/fluxcd/helm-operator) | 500 m  | 0.80 GiB  |
| [Stakater Ingress Monitor Controller](https://github.com/stakater/IngressMonitorController)  | 150 m  | 0.60 GiB  |
| [Kubehealth](https://github.com/arehmandev/kubehealth) | 150 m  | 0.40 GiB  |
| [Kubernetes replicator](https://github.com/mittwald/kubernetes-replicator) | 50 m  | 0.30 GiB  |
| [Stakater Multi Tenant Operator](https://docs.stakater.com/content/sre/multi-tenant-operator/overview.html)  | 600 m  | 1.20 GiB  |
| [Nexus](https://github.com/sonatype/nexus-public)  | 200 m  | 1.60 GiB  |
| [OpenShift GitOps](https://docs.openshift.com/container-platform/4.7/cicd/gitops/understanding-openshift-gitops.html)  | 530 m  | 0.50 GiB  |
| [OpenShift Image Registry](https://github.com/openshift/image-registry) | 50 m  | 0.40 GiB  |
| [OpenShift Router](https://docs.openshift.com/container-platform/4.11/networking/ingress-operator.html)  | 300 m  |  0.30 GiB  |
| [SonarQube](https://github.com/SonarSource/sonarqube)  | 350 m  | 1.50 GiB  |
| [Stakater Konfigurator](https://github.com/stakater/Konfigurator) | 20 m  | 0.30 GiB  |
| [Stakater Reloader](https://github.com/stakater/Reloader) | 20 m  | 0.50 GiB  |
| [Stakater Tronador](https://docs.stakater.com/content/sre/tronador/overview.html)  | 100 m  | 0.20 GiB  |
| [Vault](https://github.com/hashicorp/vault)  | 255 m  | 0.36 GiB  |
| [Velero](https://github.com/vmware-tanzu/velero)  | 500 m  | 0.15 GiB |
| [Volume Expander Operator](https://github.com/redhat-cop/volume-expander-operator)  | 50 m  | 0.10 GiB |
| **Total** | 4275 m | 11.61 GiB |

No user workloads run on infrastructure nodes.

## 1 x Monitoring

Monitoring components to monitor SAAP workloads and user workloads are deployed on monitoring nodes. The monitoring stack includes the Prometheus stack (Prometheus, Grafana and Alertmanager).

Minimum one monitoring node must be used for all production deployments. For high availability consider using two monitoring nodes.

| Type of monitoring | SAAP component | vCPU requirement | Memory requirement |
|---|:---|---:|---:|
| **Infrastructure** |   |  | |
| | [Alertmanager](https://github.com/prometheus/alertmanager)   | 500 m | 1.00 GiB |
| | [Grafana](https://github.com/grafana/grafana)   | 50 m | 0.10 GiB|
| | [Node exporter](https://github.com/prometheus/node_exporter)  | 50 m | 0.50 GiB |
| | [Prometheus](https://github.com/prometheus/prometheus)   | 2500 m | 7.50 GiB|
| | [Thanos](https://github.com/thanos-io/thanos)   | 50 m | 0.20 GiB |
| **Workloads** |   |  | |
| | [Alertmanager](https://github.com/prometheus/alertmanager) | 20 m | 0.25 GiB |
| | [Grafana](https://github.com/grafana/grafana) | 20 m | 0.10 GiB |
| | [Prometheus](https://github.com/prometheus/prometheus) | 100 m | 2.50 GiB |
| **Total**|    | 3290 m | 12.15 GiB |

For more details of monitoring, please visit [Creating Application Alerts](../monitoring/app-alerts.md).

No user workloads run on monitoring nodes.

## 1 x Logging (optional)

Logging components aggregate all logs and store them centrally. These components run on logging nodes. The logging stack includes the EFK stack (Elasticsearch, Fluentd and Kibana).

The logging pool is optional, if there is no need for it, it will not be deployed. Logging infrastructure is still highly recommended for troubleshooting purposes.

Minimum one logging node is required. For high availability consider using three logging nodes.

| SAAP component | vCPU requirement | Memory requirement |
|---|---:|---:|
| Collector | 200 m  | 2.0 GiB  |
| [Elasticsearch](https://github.com/elastic/elasticsearch) | 500 m  | 4.0 GiB  |
| [Fluentd](https://github.com/fluent/fluentd) | 20 m  | 0.6 GiB  |
| [Kibana](https://github.com/elastic/kibana)| 300 m  | 0.5 GiB  |
| **Total** | 1020 m | 7.1 GiB |

No user workloads run on logging nodes.

## 1 x Pipeline (optional)

Pipeline nodes hold pods running for tekton based CI/CD pipelines.

The pipeline pool is optional, if there is no need for it, it will not be deployed.

Minimum requirements for pipeline infrastructure is:

| SAAP component | vCPU requirement | Memory requirement |
|---|---:|---:|
| OpenShift pipelines | 100 m | 0.2 GiB |

No user workloads run on pipelines nodes.

## 3 x Worker

In a SAAP cluster, users run their applications on worker nodes. By default, a SAAP subscription comes with three worker nodes.
