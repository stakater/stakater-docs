# Troubleshooting Guide

## OperatorHub Upgrade Error

### Operator is stuck in upgrade if upgrade approval is set to Automatic

#### Problem

If operator upgrade is set to Automatic Approval on OperatorHub, there may be scenarios where it gets blocked.

#### Recommendation

:information_source: If upgrade approval is set to manual and you want to skip upgrade of a specific version, then delete the InstallPlan created for that specific version. Operator Lifecycle Manager (OLM) will create the latest available InstallPlan which can be approved then.

As OLM does not allow to upgrade or downgrade from a version stuck because of error, the only possible fix is to remove the operator from the cluster. When the operator is uninstalled it removes all of its resources except Custom Resource Definitions (CRDs), so there won't be any data loss. If any CRD has a webhook defined then that webhook should be removed before installing the stable version of the operator.

## Permission Issues

### Vault user permissions are not updated if the user is added to a Tenant, and the user does not exist in RHSSO

#### Problem

If a user is added to tenant resource, and the user does not exist in RHSSO, then RHSSO is not updated with the user's Vault permission.

Description/steps after which this situation occurs:

1. Add a new user to Tenant CR
2. Attempt to log in to Vault with the added user
3. Vault denies that the user exists, and signs the user up via RHSSO. User is now created on RHSSO (You may check for the user on RHSSO).

#### Recommendation

If the user does not exist in RHSSO, then MTO does not create the tenant access for Vault in RHSSO.

The user now needs to go to Vault, and sign up using OIDC. Then the user needs to wait for MTO to reconcile the updated tenant (reconciliation period is currently 1 hour). After reconciliation, MTO will add relevant access for the user in RHSSO.

If the user needs to be added immediately and it is not feasible to wait for next MTO reconciliation, then: add a label or annotation to the user, or restart the Tenant controller pod to force immediate reconciliation.