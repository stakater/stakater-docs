# Vault Multitenancy

The pod is authenticated to Vault by [Kubernetes auth method](https://www.Vaultproject.io/docs/auth/kubernetes). In Vault, roles are associated with Kubernetes service account. Roles, when associated with serviceaccount, permits it to read secret at particular path in Vault.

In SAAP,policies and roles are automatically created by tenant operator that grants service accounts of namespace to **read** secrets at tenants path.

Role name is same as **namespace** name

![image](./images/tenant-operator-Vault-auth.png)

fig 1. Shows how tenant operator manages authentication with Vault
