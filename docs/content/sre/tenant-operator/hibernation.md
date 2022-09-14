# Hibernating Namespaces with Tenant Operator


You can manage workloads in your cluster with Tenant Operator by implementing a hibernation schedule for your tenants.
Hibernation downsizes running Deployments and StatefulSets in a tenant’s namespace according to a defined cron schedule. You can set a hibernation schedule for your tenants by adding the ‘spec.hibernation’ field to their respective Custom Resource.

```yaml
hibernation:
  sleepSchedule: 23 * * * *
  wakeSchedule: 26 * * * *

```
`spec.hibernation.sleepSchedule` accepts a cron expression indicating the time to put the workloads in your tenant’s namespaces to sleep.

`spec.hibernation.wakeSchedule` accepts a cron expression indicating the time to wake the workloads in your tenant’s namespaces up.

> Note: both sleep and wake schedules must be specified for your Hibernation schedule to be valid.<aside> 
  
Additionally, adding the following annotation `hibernation.stakater.com/exclude: 'true'` to a namespace, excludes that namespace from hibernating.
> Note that this won't wake up an already sleeping namespace before the wake schedule.
  
## Resource Supervisor
  
Adding a Hibernation Schedule to a Tenant creates an accompanying ResourceSupervisor custom resource.
The Resource Supervisor stores the Hibernation schedules and manages the current and previous states of all the applications, whether they are sleeping or awake.
  
When the sleep timer is activated, the controller for the resource stores the details of your applications; including the number of replicas, configurations, etc., in the namespaces owned by the tenant and will then put your applications to sleep. When the wake timer is activated, the controller wakes up the applications using their stored details.
  
Enabling ArgoCD support for Tenants will also hibernate applications in the tenants 'appProjects'. 
  
```yaml
apiVersion: tenantoperator.stakater.com/v1beta1
kind: ResourceSupervisor
metadata:
 name: sigma
spec:
 argocd:
   appProjects:
     - sigma
   namespace: openshift-gitops
 hibernation:
   sleepSchedule: 42 * * * *
   wakeSchedule: 45 * * * *
```
> Currently, Hibernation is available for only StatefulSets and Deployments
