# Machine Pools

A machine pool creates machine sets that are all clones of the same configuration across availability zones. Machine pools perform all of the host node provisioning management actions on a worker node. We have different machinepools for different resources to cater the problems when one service deprives another service of resources when they share the same node. Below is the detail of minimum machines required for SAAP deployment.

## 3x Master

The control plane, which is composed of control plane machines (also known as the master machines), manages the OpenShift Container Platform cluster. Exactly three control plane nodes must be used for all production deployments. The control plane machines manage workloads on the compute machines, which are also known as worker machines. 

|   | vCPU | Memory |  Cost/mo<sup id="fnref1"><a href="#fn1" rel="footnote">*</a></sup> |
|---|---|---|---|
| Amazon EC2  | 8  | 64 GiB  | 400 USD  |
|  Binero | 8 | 48 GB | 2079.88 SEK  |

## 2x Worker

In a Kubernetes cluster, the worker nodes are where the actual workloads requested by Kubernetes users run and are managed. The worker nodes advertise their capacity and the scheduler, which is part of the master services, determines on which nodes to start containers and pods. We divide worker machines into infra,logging,monitoring and pipeline machines to have dedicated machines for every type of resources. Two worker machines are used.

|   | vCPU | Memory |  Cost/mo<sup id="fnref1"><a href="#fn1" rel="footnote">*</a></sup>|
|---|---|---|---|
| Amazon EC2  | 8  | 32 GiB  | 300 USD  |
|  Binero | 8 | 32 GB  | 2079.88 SEK  |

## 3x Infra

We use three infrastructure machines for all the resources except for logging , monitoring or pipelines workloads.

|   | vCPU | Memory |  Cost/mo<sup id="fnref1"><a href="#fn1" rel="footnote">*</a></sup> |
|---|---|---|---|
| Amazon EC2  | 8  | 32 GiB  | 300 USD  |
|  Binero | 8 | 32 GB  | 2079.88 SEK  |

## 1x Logging

One logging machine is used for cluster logging workloads.

|   | vCPU | Memory |  Cost/mo<sup id="fnref1"><a href="#fn1" rel="footnote">*</a></sup> |
|---|---|---|---|
| Amazon EC2  | 4  | 16 GiB  | 150 USD  |
|  Binero | 4  | 16 GB | 880.04 SEK  |

## 2x Monitoring

Two monitoring machines are used for cluster monitoring workloads

|   | vCPU | Memory |  Cost/mo<sup id="fnref1"><a href="#fn1" rel="footnote">*</a></sup> |
|---|---|---|---|
| Amazon EC2  |8  | 32 GiB  | 300 USD  |
|  Binero | 6  | 32 GB  | 1640.09 SEK  |


## 1x Pipeline

One pipeline machine is used for pipeline runs.

|   | vCPU | Memory |  Cost/mo<sup id="fnref1"><a href="#fn1" rel="footnote">*</a></sup> |
|---|---|---|---|
| Amazon EC2  | 4  | 16 GiB  | 150 USD  |
|  Binero | 6  | 24 GB  | 1320.06 SEK  |


<h4 id="fn1">
    <a href="#fn1" rel="footnote">*  </a>This estimate is an approximation and may differ.
</h4>
