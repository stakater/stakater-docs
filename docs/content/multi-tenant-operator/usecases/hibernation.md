# Freeing up unused resources at night time with tenant hibernation

Bill is a cluster admin who wants to free unused cluster resources in an effort to reduce costs during the night when the cluster isn't being used.

First, Bill creates a tenant with the `hibernation` schedules mentioned in the spec, or adds the hibernation field to existing tenant:

```yaml
apiVersion: tenantoperator.stakater.com/v1beta1
kind: Tenant
metadata:
  name: sigma
spec:
  hibernation:
    sleepSchedule: 0 20 * * 1-5
    wakeSchedule: 0 8 * * 1-5
  owners:
    users:
      - user
  editors:
    users:
      - user1
  quota: medium
  namespaces:
    withoutTenantPrefix:
      - build
      - stage
      - dev
```

The schedules above will make all namespaces that belong to the tenant put the deployments and `statefulSets` within those namespaces to sleep, by reducing their pod count to 0 at 8 PM every weekday. At 8 AM on a weekday, the namespaces will then wake up by restoring their applications' previous pod count.

Bill can verify this behaviour by checking the newly created ResourceSupervisor resource at running time:


```bash
oc get ResourceSupervisor -A
NAME           AGE
sigma          5m
```

The ResourceSupervisor will look like this at running time:

```yaml
apiVersion: tenantoperator.stakater.com/v1beta1
kind: ResourceSupervisor
metadata:
  finalizers:
    - tenantoperator.stakater.com/resourcesupervisor
  name: example
spec:
  argocd:
    appProjects: []
    namespace: ''
  hibernation:
    sleepSchedule: 0 20 * * 1-5
    wakeSchedule: 0 8 * * 1-5
status:
  currentStatus: running
  nextReconcileTime: '2022-10-12T20:00:00Z'
```

The ResourceSupervisor will look like this at sleeping time:

```yaml
apiVersion: tenantoperator.stakater.com/v1beta1
kind: ResourceSupervisor
metadata:
  finalizers:
    - tenantoperator.stakater.com/resourcesupervisor
  name: example
spec:
  argocd:
    appProjects: []
    namespace: ''
  hibernation:
    sleepSchedule: 0 20 * * 1-5
    wakeSchedule: 0 8 * * 1-5
status:
  currentStatus: sleeping
  nextReconcileTime: '2022-10-13T08:00:00Z'
  sleepingApplications:
    - Namespace: build
      kind: Deployment
      name: example
      replicas: 3
    - Namespace: stage
      kind: Deployment
      name: example
      replicas: 3
```

Bill wants to prevent the `build` namespace from going to sleep, so they can add the `hibernation.stakater.com/exclude: 'true'` annotation to it. The ResourceSupervisor will now look like this after reconciling:

```yaml
apiVersion: tenantoperator.stakater.com/v1beta1
kind: ResourceSupervisor
metadata:
  finalizers:
    - tenantoperator.stakater.com/resourcesupervisor
  name: example
spec:
  argocd:
    appProjects: []
    namespace: ''
  hibernation:
    sleepSchedule: 0 20 * * 1-5
    wakeSchedule: 0 8 * * 1-5
status:
  currentStatus: sleeping
  nextReconcileTime: '2022-10-13T08:00:00Z'
  sleepingApplications:
    - Namespace: stage
      kind: Deployment
      name: example
      replicas: 3
```
