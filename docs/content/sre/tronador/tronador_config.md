# TronadorConfig

```yaml
apiVersion: tronador.stakater.com/v1alpha1
kind: TronadorConfig
metadata:
  name: tronador-config
  namespace: stakater-tronador
spec:
  mappings:
    - authSecret: mains
      imagePullSecret: docker-secret
      repos:
        - stakater-nordmart-inventory
        - stakater-nordmart-review-ui
        - stakater-nordmart-review
    - authSecret: repo-secret
      imagePullSecret: docker-secret
      repos:
        - stakater-nordmart-review-private
    - authSecret: repo-secret-2
      imagePullSecret: docker-secret-2
      repos:
        - stakater-nordmart-review-ui-private
  orgLevelSecrets:
    authSecret: org-auth-secret
    imagePullSecret: org-img-pull-secret
  secrets:
    - apiVersion: v1
      kind: Secret
      metadata:
        name: repo-secret
      data:
        password: password
        username: username
      type: Opaque
    - apiVersion: v1
      kind: Secret
      metadata:
        name: repo-secret-2
      data:
        password: password
        username: username
      type: Opaque
    - apiVersion: external-secrets.io/v1alpha1
      kind: ExternalSecret
      metadata:
        name: docker-secret
      spec:
        data:
          - remoteRef:
              key: key
              property: username
            secretKey: secret-key
          - remoteRef:
              key: key
              property: password
            secretKey: secret-key
        refreshInterval: 1m
        secretStoreRef:
          kind: ClusterSecretStore
          name: secret-store
        target:
          creationPolicy: Owner
          name: docker-secret
          template:
            metadata:
              annotations:
                key: value
    - apiVersion: external-secrets.io/v1alpha1
      kind: ExternalSecret
      metadata:
        name: docker-secret-2
      spec:
        data:
          - remoteRef:
              key: key
              property: username
            secretKey: secret-key
          - remoteRef:
              key: key
              property: password
            secretKey: secret-key
        refreshInterval: 1m
        secretStoreRef:
          kind: ClusterSecretStore
          name: secret-store
        target:
          creationPolicy: Owner
          name: docker-secret-2
          template:
            metadata:
              annotations:
                key: value
    - apiVersion: v1
      kind: Secret
      metadata:
        name: org-auth-secret
      data:
        password: password
        username: username
      type: Opaque
    - apiVersion: external-secrets.io/v1alpha1
      kind: ExternalSecret
      metadata:
        name: org-img-pull-secret
      spec:
        data:
          - remoteRef:
              key: key
              property: username
            secretKey: secret-key
          - remoteRef:
              key: key
              property: password
            secretKey: secret-key
        refreshInterval: 1m
        secretStoreRef:
          kind: ClusterSecretStore
          name: secret-store
        target:
          creationPolicy: Owner
          name: org-img-pull-secret
          template:
            metadata:
              annotations:
                key: value
```

## spec

### mappings

`mappings` contains an array of repository mappings. Each repository mapping contains the following fields:
- **`repos`**: A list of repositories on whose DTEs the mapping will apply. Make sure to write just the Name of the repository itself, not the URL or Organization name.
- **`authSecret`**: Name of the Secret required in case of a private repository. If this field is not filled, it will be treated as a public repository.
- **`imagePullSecret`**: Name of the Secret required to access the image repository where the application's images are hosted, e.g. Nexus or Docker.


### orgLevelSecrets

`orgLevelSecrets` contains Secrets that are to be used as default Secrets for any repositories that do not have their name mentioned in a mapping. This field can prove useful in case there are a large number of repositories that share the same Secret(s), and it is infeasible to write all of the repository names in a mapping.

`orgLevelSecrets` contains two subfields: 
- **`authSecret`**: Name of the Secret required to access a private repository. 
- **`imagePullSecret`**: Name of the Secret required to access the image repository where the application's images are hosted, e.g. Nexus or Docker.

`orgLevelSecrets` and both of its sub-fields are optional. 


### secrets

Manifests inside `secrets` are a list of k8s resources which are required in DTEs for their proper functioning. These resources should only contain Secrets, or resources that can create Secrets in the cluster (in the same namespace as the Environment namespace). In case of the latter, the name of the resource **must** be the same as the name of the generated Secret. `secrets` is a required field if TronadorConfig is created.


## Points to be considered while applying TronadorConfig
- Tronador and all Environments would throw errors in case any cluster-wide resource is mentioned in the TronadorConfig.
- If namespace is set in any resource, Tronador will ignore it and only deploy the resource to the relevant namespace (see mappings section above).
- Tronador will only apply resources from the TronadorConfig CR present in the operator Namespace, and named `tronador-config`.
- TronadorConfig points to default `admin` ClusterRole of OpenShift; all the namespaced resources allowed by that ClusterRole will be applied in the Namespaces.