# Machine Pools

A machine pool creates machine sets that are all clones of the same configuration across availability zones. Machine pools perform all of the host node provisioning management actions on a worker node. We have different machine pools for different resources to cater the problems when one service deprives another service of resources when they share the same node. Below is the detail of minimum machines required for SAAP deployment.

## 3x Master

The control plane, which is composed of control plane machines (also known as the master machines), manages the OpenShift Container Platform cluster. Exactly three control plane nodes must be used for all production deployments. The control plane machines manage workloads on the compute machines, which are also known as worker machines. The recommended size of a master host in an OpenShift Container Platform cluster of 2000 pods is the minimum requirements of 2 CPU cores and 16 GB of RAM, plus 2 CPU cores and 3 GB of RAM, totaling 4 CPU cores and 19 GB of RAM.

| vCPU | Memory |
|---|---|
| 4  | 32 GiB  |

## 2x Worker

In a Kubernetes cluster, the worker nodes are where the actual workloads requested by Kubernetes users run and are managed. The worker nodes advertise their capacity and the scheduler, which is part of the master services, determines on which nodes to start containers and pods. We divide worker machines into infra,logging,monitoring and pipeline machines to have dedicated machines for every type of resources. Two worker machines are used.

| vCPU | Memory |
|---|---|
| 4  | 16 GiB  |

## 1x Infra

The following infrastructure workloads do not incur OpenShift Container Platform worker subscriptions, at least one infrastructure node is required for deployments.

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
|  Stakater-Sonarqube  | 350 m  | 1.5 GiB  |

| vCPU | Memory |
|---|---|
| 4  | 16 GiB  |
## 1x Logging

For Cluster aggregated logging , we offer one dedicated logging machine. Minimum requirements for logging infrastructure is as follows: 

|  | vCPU | Memory |
|---|---|---|
| OpenShift logging | 4  | 12 GiB  |

| vCPU | Memory |
|---|---|
| 4  | 16 GiB  |

## 2x Monitoring

OpenShift Container Platform exposes metrics that can be collected and stored in back-ends by the cluster-monitoring-operator. As an OpenShift Container Platform administrator, you can view system resources, containers and components metrics in one dashboard interface, Grafana. Exactly two monitoring nodes must be used for all production deployments. The recommended size of a monitoring node is the minimum of 6 vCPUs and 14 GB ram per 7200 pods.

|  | vCPU | Memory |
|---|---|---|
| OpenShift monitoring | 600 m  | 3 GiB  |
| Stakater-workload-monitoring | 1 GiB  | 4 GiB  |

| vCPU | Memory |
|---|---|
| 6 | 32 GiB  |


## 1x Pipeline

Red Hat OpenShift Pipelines is a cloud-native, continuous integration and continuous delivery (CI/CD) solution based on Kubernetes resources. You can use the OpenShift Container Platform Developer console to create Tekton resources, view logs of pipeline runs, and manage pipelines in your OpenShift Container Platform namespaces. We offer one dedicated pipeline machine. Minimum requirements for pipeline infrastructure is as follows: 

|  | vCPU | Memory |
|---|---|---|
| OpenShift pipelines | 100 m  | 200 MiB  |

| vCPU | Memory |
|---|---|
| 4  | 16 GiB  |
