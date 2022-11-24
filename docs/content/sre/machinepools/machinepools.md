# Machine Pools

Machine pool is a set of similar sized virtual machines. In SAAP, different machine pools serve different purposes. Details of machine pools and tools running on them are described below.

><u>**Glossary:**</u>
>
> **User workloads:** User applications (Your e-commerce frontend, backend APIs etc.)
>
> **SAAP workloads:** Supporting applications for software lifecycle.

## Resource Requirements

| Role | Size <br/>(vCPU x Memory x Storage) |Pool<br/>size | Total vCPU | Total Memory (GiB) | Total Storage (GiB) |Required |
|:---|:---|:---:|:---:|:---:|:---:|:---|
| Master  | 4 x 32 x100| 3 |12 | 96 |300 | Yes |
| Infra  | 4 x 16 x 64 | 2 |8 | 32 |128 | Yes |
| Monitoring  | 4 x 32 x 64  | 1 |4 | 16 |64 | Yes |
| Logging  | 4 x 16 x 64 |1 |4 | 16 |64 | Optional |
| Pipeline  | 4 x 16 x 64 |1 |4 | 16 |64 | Optional |
| Worker  | 4 x 16 x100 | 3 |12 | 48 |300 | Minimum 3<br/>Increased as desired |
| **Total Recommended**  |  |   |  | 11   | 46 | 224   | 12 | |
| **Total Minimum**  |  |   |   | 09  | 36 |  192 |12 |  |
## 3x Master

The control plane, which is composed of master machines (also known as the control plane), manages the SAAP cluster. The control plane machines run the control plane. No user workloads run on masters.

## 2x Infra

At least two infrastructure nodes are required for these SAAP workloads.

|  | vCPU | Memory |
|---|---|---|
| [Ingress Monitor Controller](https://github.com/stakater/IngressMonitorController)  | 150 m  | 600 MiB  |
| [OpenShift GitOps](https://docs.openshift.com/container-platform/4.7/cicd/gitops/understanding-openshift-gitops.html)  | 530 m  | 500 MiB  |
| [Nexus](https://github.com/sonatype/nexus-public)  | 200 m  | 1.6 GiB  |
| [Vault](https://github.com/hashicorp/vault)  | 255 m  | 360 MiB  |
|  [Stakater-Tronador](https://github.com/stakater/tronador-github-app)  | 100 m  | 200 MiB  |
|  [Velero](https://github.com/vmware-tanzu/velero)  | 500 m  | 150 MiB  |
|  [Multi Tenant Operator](https://docs.cloud.stakater.com/content/sre/multi-tenant-operator/overview.html)  | 600 m  | 1.2 GiB  |
|  [Forecastle](https://github.com/stakater/Forecastle)  | 50 m  | 200 MiB  |
|  [SonarQube](https://github.com/SonarSource/sonarqube)  | 350 m  | 1.5 GiB  |
| OpenShift-ingress (router)  | 300 m  |  300 MiB  |
| [Helm operator](https://github.com/fluxcd/helm-operator) | 500 m  | 800 MiB  |
| [Volume Expander Operator](https://github.com/redhat-cop/volume-expander-operator)  | 50 m  | 100 MiB  |
| [cert-manager-operator](https://github.com/openshift/cert-manager-operator)  | 100 m  | 1.5 GiB  |
|  [group-sync-operator](https://github.com/redhat-cop/group-sync-operator)  | 50 m  | 100 MiB  |
|  [Stakater-Konfigurator](https://github.com/stakater/Konfigurator) | 20 m  | 300 MiB  |
|  [Namespace-configuration-operator](https://github.com/redhat-cop/namespace-configuration-operator) | 200 m  | 300 MiB  |
|  [Stakater Reloader](https://github.com/stakater/Reloader) | 20 m  | 500 MiB  |
|  [External Secrets operator](https://github.com/external-secrets/external-secrets) | 50 m  | 300 MiB  |
|  [Kubehealth](https://github.com/arehmandev/kubehealth) | 150 m  | 400 MiB  |
|  [OpenShift-image-registry](https://github.com/openshift/image-registry) | 50 m  | 400 MiB  |
|  [Kubernetes-replicator](https://github.com/mittwald/kubernetes-replicator) | 50 m  | 300 MiB  |
|  **Total** | 4.2 | 11.5 GiB  |

## 1x Monitoring

Monitoring components to monitor SAAP workloads and user workloads are deployed on monitoring machines. The monitoring stack includes Prometheus stack (Prometheus-Grafana-Alertmanager).

Minimum one monitoring node must be used for all production deployments. For high availability consider using three monitoring nodes.

|  |Components| vCPU | Memory | 
|---|:---:|---|---|
| **OpenShift monitoring** |   |  | |
| | [Prometheus](https://github.com/prometheus/prometheus)   | 2.5 | 7.5 GiB|
| | [Grafana](https://github.com/grafana/grafana)   | 50 m | 100 MiB|
| | [Alertmanager](https://github.com/prometheus/alertmanager)   | 500 m | 1 GiB |
| | [Thanos](https://github.com/thanos-io/thanos)   | 50 m | 200 MiB |
| | [Node exporter](https://github.com/prometheus/node_exporter)  | 50 m | 500 MiB |
| **Stakater-workload-monitoring** |   |  | |
| | Prometheus   | 100 m | 2.5 GiB |
| | Grafana   | 20 m | 100 MiB |
| | Alertmanager   | 20 m | 250 MiB |
| **Total**|    | 3.4 | 11.5 GiB |


## 1x Logging (optional)

Logging components aggregates all logs and stores them centrally. These components run on logging nodes. The logging stack includes EFK stack (Elasticsearch-Fluentd-Kibana).

At least, one logging machine is required. For high availability consider using three logging nodes. 

|  | vCPU | Memory |
|---|---|---|
| [Elasticsearch](https://github.com/elastic/elasticsearch) | 500 m  | 4 GiB  |
| [Fluentd](https://github.com/fluent/fluentd) | 20 m  | 600 MiB  |
| Collector | 200 m  | 2 GiB  |
| [Kibana](https://github.com/elastic/kibana)| 300 m  | 500 MiB  |
| **Total**|    | 1 | 7 GiB |

## 1x Pipeline (optional)

Pipeline nodes holds pods running for CI/CD pipelines. Minimum requirements for pipeline infrastructure is as follows: 

|  | vCPU | Memory |
|---|---|---|
| OpenShift pipelines | 100 m  | 200 MiB  |


## 3x Worker

In a SAAP cluster, users run their applications on worker nodes. By default, three worker machines are available to run their workloads.

