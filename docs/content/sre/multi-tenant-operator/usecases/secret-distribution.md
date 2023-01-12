# Propagate Secrets from Parent to Descendant namespaces


Secrets like `registry` credentials often need to exist in multiple Namespaces, so that Pods within different namespaces can have access to those credentials in form of secrets. 

Manually creating those secrets within different namespaces could have the following challenges:
- keeping record of namespaces where you would want these secrets to be created
- Creating those secrets manually each time there is new namespace 
- If the secret changes, will have to update the secret in all descendant namespaces
- Could be error pron
- Time-consuming

MTO will copy a Secret called `regcred` which exists in the `default` Namespace to new Namespaces when they are created.
It will also push updates to the copied Secrets and keep the propagated secrets always sync and updated with parent namespaces.

---

With the help of Multi-Tenant Operator's Template feature we can make this secret distribution experience easily manageable.
Let's create Template which will hold reference of registry secret(secret name and namespace) 

```yaml
apiVersion: tenantoperator.stakater.com/v1alpha1
kind: Template
metadata:
  name: registry-secret
resources:
  resourceMappings:
    secrets:
      - name: registry
        namespace: default
```

Now using this Template we can propagate registry secret to different namespaces that has some common set of labels.
By using this label approach we don't have to maintain list of namespace on which we want to create this secret.
Will just add one label, say `kind: registry` and whichever namespace will have this label will get this secret.

For propagating it on different namespaces dynamically will have to create another resource called `TemplateGroupInstance`.
`TemplateGroupInstance` will have `Template` and `matchLabel` mapping as shown below:

```yaml
apiVersion: tenantoperator.stakater.com/v1alpha1
kind: TemplateGroupInstance
metadata:
  name: registry-secret-group-instance
spec:
  template: registry-secret
  selector:
    matchLabels:
      kind: registry
  sync: true
```

Afterwards, you will be able to see those secrets would be been mapped in all matching namespaces.
And, any time there is any new namespace created with this provided set of labels then it will get these secrets too.

```bash
kubectl get secret registry-secret -n example-ns-1
NAME             STATE    AGE
registry-secret    Active   3m

kubectl get secret registry-secret -n example-ns-2
NAME             STATE    AGE
registry-secret    Active   3m
```