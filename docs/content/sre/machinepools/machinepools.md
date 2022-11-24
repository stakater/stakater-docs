# Machine Pools

A machine pool creates machine sets that are all clones of the same configuration across availability zones. Machine pools perform all of the host node provisioning management actions on a worker node. We have different machine pools for different resources to cater the problems when one service deprives another service of resources when they share the same node. Below is the detail of minimum machines required for SAAP deployment.

## 3x Master

The control plane, which is composed of control plane machines (also known as the master machines), manages the SAAP cluster. Minimum three control plane nodes must be used for all production deployments. The control plane machines manage workloads on the compute machines, which are also known as worker machines.

| vCPU | Memory |
|---|---|
| 4  | 32 GiB  |

## 2x Infra

At least one infrastructure node is required for these supporting workloads.

|  | vCPU | Memory |
|---|---|---|
| [Ingress Monitor Controller](https://github.com/stakater/IngressMonitorController)  | 150 m  | 600 MiB  |
| OpenShift-GitOps  | 530 m  | 500 MiB  |
| Stakater-nexus  | 200 m  | 1.6 GiB  |
| Vault  | 255 m  | 360 MiB  |
|  Stakater-Tronador  | 100 m  | 200 MiB  |
|  OpenShift-Velero  | 500 m  | 150 MiB  |
|  Multi Tenant Operator  | 600 m  | 1.2 GiB  |
|  Stakater-Forecastle  | 50 m  | 200 MiB  |
|  Stakater-SonarQube  | 350 m  | 1.5 GiB  |
| OpenShift-ingress (router)  | 300 m  |  300 MiB  |
| Stakater-Helm-operator | 500 m  | 800 MiB  |
| Stakater-volume-expander-operator  | 50 m  | 100 MiB  |
| Stakater-cert-manager-operator  | 100 m  | 1.5 GiB  |
|  Stakater-group-sync-operator  | 50 m  | 100 MiB  |
|  Stakater-Konfigurator | 20 m  | 300 MiB  |
|  Stakater-namespace-configuration-operator | 200 m  | 300 MiB  |
|  Stakater-Reloader | 20 m  | 500 MiB  |
|  Stakater-external-secrets-operator | 50 m  | 300 MiB  |
|  Stakater-kubehealth | 150 m  | 400 MiB  |
|  OpenShift-image-registry | 50 m  | 400 MiB  |
|  Stakater-Kubernetes-replicator | 50 m  | 300 MiB  |

In addition to these tools, there are some cluster components required to run on each node.

Minimum required specifications for infra nodes are as follows :

| vCPU | Memory |
|---|---|
| 4  | 16 GiB  |

## 1x Monitoring

SAAP exposes metrics that can be collected and stored in back-ends by the cluster-monitoring-operator. As a SAAP administrator, you can view system resources, containers and components metrics in one dashboard interface, Grafana. Minimum one monitoring node must be used for all production deployments. For high availability consider using three monitoring nodes.

|  | vCPU | Memory |
|---|---|---|
| OpenShift monitoring | 1 Gi   | 4 GiB  |
| Stakater-workload-monitoring | 1 Gi  | 4 GiB  |

Minimum required specifications for monitoring nodes are as follows :

| vCPU | Memory |
|---|---|
| 4 | 16 GiB  |

## 1x Logging (optional)

If its required, SAAP offer logging subsystem to aggregate all the logs from the SAAP cluster. Minimum requirements for logging infrastructure is as follows: 

|  | vCPU | Memory |
|---|---|---|
| OpenShift logging | 4  | 12 GiB  |

At least, one logging machine is required. For high availability consider using three logging nodes. Minimum required specifications for logging nodes are as follows :

| vCPU | Memory |
|---|---|
| 4  | 16 GiB  |
## 1x Pipeline (optional)

Pipeline machine holds pods running for pipelines. Minimum requirements for pipeline infrastructure is as follows: 

|  | vCPU | Memory |
|---|---|---|
| OpenShift pipelines | 100 m  | 200 MiB  |

Minimum required specifications for pipeline nodes are as follows :

| vCPU | Memory |
|---|---|
| 4  | 16 GiB  |

## 3x Worker

In a SAAP cluster, the worker nodes are where the actual user application workloads run and are managed. Minimum three worker machines are required for SAAP deployments.

| vCPU | Memory |
|---|---|
| 4  | 16 GiB  |
