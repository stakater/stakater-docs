# Vault

Vault is a tool for securely accessing secrets. A secret is anything that you want to tightly control access to, such as API keys, passwords, or certificates.
Vault provides a unified interface to any secret, while providing tight access control and recording a detailed audit log.

When you create a secret in Kubernetes it is stored in etcd as plain text, also the secret is accessible to anyone that has access to your cluster. Vault solves this issue by providing a central secret management store that provides an additional layer of security using it's authentication methods. Secrets are only accessible when you provide a corresponding token

There are 2 kinds of secrets in the Vault:

* Secrets for managed applications provided by Stakater (ex: Nexus repository credential, etc.)
  Users only have read permission.
  The path is `managed-addons/*`.
* Tenant specific secrets.
  A `KV` v2 secret engine is enabled on `TENANT_NAME/kv` path in default. Even though users delete that path, it is created automatically so please don't remove that.
  Users can enable/disable secret engines on `TENANT_NAME/*` paths and create/delete/update/read secrets in them.

Users can manage secrets via Vault UI or Vault CLI.

## Manage Vault secrets via UI

Users included in any tenants can access to the Vault UI using OIDC authentication.

Once login, users can do all actions on the path `TENANT_NAME/*`.

* Enable/disable any kinds of secret engines
* Create/update/get/list/delete secrets

### Authentication

![Vault-oidc-login](./images/vault_oidc_login.png)

* Access `https://stakater-vault-openshift-stakater-vault.CLUSTER_DOMAIN`
* Select `OIDC` method on `Sing in to Vault` page.
* Keep `Role` as default.
* Click `Sign in with OIDC Provider`
* Then login on popup authentication dialog. The browser should allow the popup dialog.

![Vault-login_popup](./images/login_popup.png)

### Enable secret engines

![select-secret-engine](./images/select_secret_engine.png)

![configure-secret-engine](./images/configure_secret_engine.png)

### Create secrets

![create-secret](./images/create_secret.png)

## Manage Vault secrets via CLI

To use Vault CLI, the token is required. Users can get/renew/revoke the token on the UI. (Click the user account Avatar.)

![Vault-token](./images/vault_token.png)

Once token is fetched, users can use the CLI provided by UI. So there is no need to install Vault CLI.

![Vault-cli](./images/vault_cli.png)

```bash
Vault login token=${TOKEN}
```

## Consume Vault secrets

SAAP supports 3 different ways to consume secrets from Vault:

1. Option # 1 - Consume Vault secret via a Volume
2. Option # 2 - Consume Vault secret via Environment Variable
3. Option # 3 - Consume Vault secret via ExternalSecret (Recommended)

Below you can find step by step guide to consume via different options.

### Option # 1 - Consume Vault secret via a Volume

To mount Vault secret in a volume do following:

_TODO_ Is this step required by all three options?

* **Step 1**: Add label in serviceaccount so it can be granted Vault read access to secret path

     ```bash
      serviceAccount:
        enabled: true
        additionalLabels: 
          stakater.com/vault-access: "true"
     ```

* **Step 2**: Enable ```SecretProviderClass``` object in Helm values and define key and value path of Vault. For example

     ```bash
     secretProviderClass:
      enabled: true
      name: postgres-secret
      roleName: '{{.Release.Namespace}}'
      objects: 
        - objectName: postgresql-password
          secretPath: gabbar/data/postgres
          secretKey: postgresql-password
     ```

* **Step 3**: Define volume in Helm values that use above created ```SecretProviderClass```
  
     ```bash
     deployment:
       volumes: 
         - name: postgres-secret
           csi:
             driver: secrets-store.csi.k8s.io
             readOnly: true
             volumeAttributes:
               secretProviderClass: postgres-secret
     ```

* **Step 4**: Now mount this volume in container
  
     ```bash
     volumeMounts:
     - name: postgres-secret
       readOnly: true
       mountPath: /data/db-creds
     ```

### Option # 2 - Consume Vault secret via Environment Variable

To mount Vault secret in an environment variable do following:

* **Step 1**: Enable ```SecretProviderClass``` object in Helm values and define key/value path and secret objects in Vault. For example

     ```bash
     secretProviderClass:
      enabled: true
      name: postgres-secret
      roleName: '{{.Release.Namespace}}'
      objects: 
        - objectName: postgresql-password
          secretPath: gabbar/data/postgres
          secretKey: postgresql-password
      secretObjects:
        - data:
          - key: postgres-password
            objectName: postgresql-password
          secretName: postgres-secret
          type: Opaque 
     ```

   The value of **secretName** will be the name of Kubernetes secret.

* **Step 2**: Define volume in Helm values that use above created ```SecretProviderClass```
  
     ```bash
     deployment:
       volumes: 
         - name: postgres-secret
           csi:
             driver: secrets-store.csi.k8s.io
             readOnly: true
             volumeAttributes:
               secretProviderClass: postgres-secret
     ```

* **Step 3**: Now mount this volume in container.
  
     ```bash
     volumeMounts:
     - name: postgres-secret
       readOnly: true
       mountPath: /data/db-creds
     ```
  
  Volume mount is required in order to create a Kubernetes secret.

* **Step 4**: This secret can be used as environment variable

     ```bash
     env:
        - name: POSTGRES_PASSWORD
          valueFrom:
             secretKeyRef:
                 name: postgres-secret
                 key: postgres-password
     ```

[Here](https://github.com/stakater-lab/stakater-nordmart-review/blob/main/deploy/values.yaml#L24) is a working example.

Your secret should be available at the path defined above in Vault; a change in secret value in Vault will automatically restart the application by [Stakater Reloader](https://github.com/stakater/Reloader)

### Option # 3 - Consume Vault secret via ExternalSecret

Kubernetes secret do not support storing or retrieving secret data from external secret management systems, e.g. [HashiCorp Vault](https://www.vaultproject.io/)

**External Secrets** solves this problem by providing access to secrets stored externally. It does this by adding an `ExternalSecret` object to Kubernetes using a [CustomResourceDefinition](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/).

SAAP comes with fully managed [**External Secrets Operator**](https://github.com/external-secrets/external-secrets/) to integrate with Vault and makes it extremely easy to consume secrets from Vault.

* **Step 1**: Add `tenant-vault-access` template to the tenant

    ```bash
    apiVersion: tenantoperator.stakater.com/v1alpha1
    kind: Tenant
    metadata:
      name: gabbar
    spec:
      users:
        owner:
        - user1
        - user2
      quota: medium
      namespacetemplate:
        templateInstances:
        - spec:
            template: tenant-vault-access
            sync: true
    ```

_TODO_ What will this template do? Who owns and manages this template? Is it owned by SAAP?

* **Step 2**: Enable `externalSecret` in your `deploy/values.yaml` and provide details of the secret path in Vault.

    ```bash
    externalSecret:
      enabled: true
      secretStore:
        name: tenant-vault-secret-store
      files:   
      inventory-postgres: #Name of Kubernetes Secret
        data:
          postgresql-password: #Name of Kubernetes Secret Key
            remoteRef:
              key: inventory-postgres #Name of Vault Secret
              property: postgresql-password #Name of Vault Secret Key
    ```

_TODO_ So, when I update a secret in Vault; then is the application restarted automatically by Reloader?
