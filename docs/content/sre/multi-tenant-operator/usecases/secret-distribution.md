# Propagate Secrets from Parent to Descendant namespaces


Secrets like `registry` credentials often need to exist in multiple
Namespaces, so that Pods within those namespaces can have access to those credentials in form of secrets. 

Manually creating those secrets within different namespaces could be challenging and could have following challenges:
- keep record of namespaces where you would want these secrets to be created
- Create those secrets manually each time there is new demand
- If the secret changes, will have to update in all descendant namespaces
- Could be error pron
- Time-consuming

MTO will copy a Secret called `regcred` which exists in the `default` Namespace to
new Namespaces when they are created. 
It will also push updates to the copied Secrets and keep the propagated secrets always sync and updated with parent namespaces.
