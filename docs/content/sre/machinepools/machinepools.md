# Machine Pools

A machine pool creates machine sets that are all clones of the same configuration across availability zones. Machine pools perform all of the host node provisioning management actions on a worker node. We have different machine pools for different resources to cater the problems when one service deprives another service of resources when they share the same node. Below is the detail of minimum machines required for SAAP deployment.

## 3x Master

The control plane, which is composed of control plane machines (also known as the master machines), manages the SAAP cluster. Exactly three control plane nodes must be used for all production deployments. The control plane machines manage workloads on the compute machines, which are also known as worker machines.

| vCPU | Memory |
|---|---|
| 4  | 32 GiB  |

## 2x Infra

The following infrastructure workloads do not incur SAAP worker subscriptions, at least one infrastructure node is required for these supporting workloads.

|  | vCPU | Memory |
|---|---|---|
| Ingress monitor controller  | 150m  | 600 MiB  |
| OpenShift-GitOps  | 530 m  | 500 MiB  |
| Stakater-nexus  | 200 m  | 1.6 GiB  |
| Vault  | 255 m  | 360 MiB  |
|  Stakater-Tronador  | 100 m  | 200 MiB  |
|  OpenShift-Velero  | 500 m  | 150 MiB  |
|  Stakater-tenant-operator  | 600 m  | 1.2 GiB  |
|  Stakater-Forecastle  | 50 m  | 200 MiB  |
|  Stakater-SonarQube  | 350 m  | 1.5 GiB  |
| OpenShift-ingress (router)  | 300m  |  300 MiB  |
| Stakater-helm-operator | 500 m  | 800 MiB  |
| Stakater-volume-expander-operator  | 50 m  | 100 MiB  |
| Stakater-cert-manager-operator  | 100 m  | 1.5 GiB  |
|  Stakater-group-sync-operator  | 50 m  | 100 MiB  |
|  Stakater-konfigurator | 20 m  | 300 MiB  |
|  Stakater-namespace-configuration-operator | 200 m  | 300 MiB  |
|  Stakater-reloader | 20 m  | 500 MiB  |
|  Stakater-external-secrets-operator | 50 m  | 300 MiB  |
|  Stakater-kubehealth | 150 m  | 400 MiB  |
|  OpenShift-image-registry | 50 m  | 400 MiB  |
|  Stakater-kubernetes-replicator | 50 m  | 300 MiB  |

In addition to these tools, there are some cluster cmoponents required to run on each node.

| vCPU | Memory |
|---|---|
| 4  | 16 GiB  |

## 1x Monitoring

SAAP exposes metrics that can be collected and stored in back-ends by the cluster-monitoring-operator. As an SAAP administrator, you can view system resources, containers and components metrics in one dashboard interface, Grafana. Exactly one monitoring nodes must be used for all production deployments. For high availability consider using three monitoring nodes.

|  | vCPU | Memory |
|---|---|---|
| OpenShift monitoring | 1 Gi   | 4 GiB  |
| Stakater-workload-monitoring | 1 Gi  | 4 GiB  |

| vCPU | Memory |
|---|---|
| 4 | 16 GiB  |

## 1x Logging (optional)

For Cluster aggregated logging , SAAP offer one dedicated logging machine. Minimum requirements for logging infrastructure is as follows: 
For high availability consider using three logging nodes.

|  | vCPU | Memory |
|---|---|---|
| OpenShift logging | 4  | 12 GiB  |

| vCPU | Memory |
|---|---|
| 4  | 16 GiB  |
## 1x Pipeline(optional)

Pipeline machine holds pods running for pipelines. Minimum requirements for pipeline infrastructure is as follows: 

|  | vCPU | Memory |
|---|---|---|
| OpenShift pipelines | 100 m  | 200 MiB  |

| vCPU | Memory |
|---|---|
| 4  | 16 GiB  |

## 3x Worker

In a SAAP cluster, the worker nodes are where the actual application workloads run and are managed. Three worker machines are used.

| vCPU | Memory |
|---|---|
| 4  | 16 GiB  |