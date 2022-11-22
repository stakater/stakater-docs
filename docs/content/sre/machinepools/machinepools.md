# Machine Pools

A machine pool creates machine sets that are all clones of the same configuration across availability zones. Machine pools perform all of the host node provisioning management actions on a worker node. We have different machine pools for different resources to cater the problems when one service deprives another service of resources when they share the same node. Below is the detail of minimum machines required for SAAP deployment.

## 3x Master

The control plane, which is composed of control plane machines (also known as the master machines), manages the OpenShift Container Platform cluster. Exactly three control plane nodes must be used for all production deployments. The control plane machines manage workloads on the compute machines, which are also known as worker machines. The recommended size of a master host in an OpenShift Container Platform cluster of 2000 pods is the minimum requirements of 2 CPU cores and 16 GB of RAM, plus 2 CPU cores and 3 GB of RAM, totaling 4 CPU cores and 19 GB of RAM.

|   | vCPU | Memory |
|---|---|---|
| Amazon EC2  | 4  | 32 GiB  |
|  Binero | 6 | 24 GB |

## 2x Worker

In a Kubernetes cluster, the worker nodes are where the actual workloads requested by Kubernetes users run and are managed. The worker nodes advertise their capacity and the scheduler, which is part of the master services, determines on which nodes to start containers and pods. We divide worker machines into infra,logging,monitoring and pipeline machines to have dedicated machines for every type of resources. Two worker machines are used.

|   | vCPU | Memory |
|---|---|---|
| Amazon EC2  | 4  | 16 GiB  |
|  Binero | 4 | 16 GB  |

## 1x Infra

The following infrastructure workloads do not incur OpenShift Container Platform worker subscriptions, at least one infrastructure node is required for deployments.

   - Kubernetes and OpenShift Container Platform control plane services that run on masters

   - The default router

   - The integrated container image registry

   - The HAProxy-based Ingress Controller

   - Service brokers

   - Red Hat Quay

   - Red Hat OpenShift Container Storage

   - Red Hat Advanced Cluster Manager

   - Red Hat Advanced Cluster Security for Kubernetes

   - Red Hat OpenShift GitOps


|   | vCPU | Memory |
|---|---|---|
| Amazon EC2  | 4  | 16 GiB  |
|  Binero | 4 | 16 GB  |
## 1x Logging

For Cluster aggregated logging , we offer one dedicated logging machine. Minimum requirements for logging infrastructure is as follows: 

|   | vCPU | Memory |
|---|---|---|
| Amazon EC2  | 4  | 16 GiB  |
|  Binero | 4  | 16 GB |

## 2x Monitoring

OpenShift Container Platform exposes metrics that can be collected and stored in back-ends by the cluster-monitoring-operator. As an OpenShift Container Platform administrator, you can view system resources, containers and components metrics in one dashboard interface, Grafana. Exactly two monitoring nodes must be used for all production deployments. The recommended size of a monitoring node is the minimum of 6 vCPUs and 14 GB ram per 7200 pods.

|   | vCPU | Memory |
|---|---|---|
| Amazon EC2  |8  | 32 GiB  |
|  Binero | 6  | 32 GB  |


## 1x Pipeline

Red Hat OpenShift Pipelines is a cloud-native, continuous integration and continuous delivery (CI/CD) solution based on Kubernetes resources. You can use the OpenShift Container Platform Developer console to create Tekton resources, view logs of pipeline runs, and manage pipelines in your OpenShift Container Platform namespaces. We offer one dedicated pipeline machine. Minimum requirements for pipeline infrastructure is as follows: 

|   | vCPU | Memory |
|---|---|---|
| Amazon EC2  | 4  | 16 GiB  |
|  Binero | 4  | 16 GB  |

# Useful Links

- [Creating infrastructure nodes](https://docs.openshift.com/container-platform/4.10/nodes/nodes/nodes-nodes-creating-infrastructure-nodes.html)

- [Scaling Cluster Monitoring](https://docs.openshift.com/container-platform/4.10/scalability_and_performance/scaling-cluster-monitoring-operator.html)