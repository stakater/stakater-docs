# Changelog


## v0.0.x

**v0.0.13**

- feat: added different reconciliation times depending on the status of DTE's HelmRelease
- fix: fix for HelmRelease get request

**v0.0.12**

- fix: fix for kubebuilder lib which displayed logs timer in unix format

**v0.0.11**

- fix: fix for clusterrolebinding in chart templates

**v0.0.10**

- fix: fix a bug that didn't grant tronador access to create custom resources

**v0.0.9**

- feat: added support for TronadorConfig. Resources required in DTEs can now be created by mentioning them in tronador config

**v0.0.8**

- fix: fix a bug that prevented deletion of EnvironmentProvisioner resources

**v0.0.7**

- fix: deletion handled for helm release object created by Tronador

**v0.0.6**

- fix: fix name for generated helm release to conform to kubernetes resource name standards

**v0.0.5**

- fix: fix a permission issue in rolebinding

**v0.0.4**

- feat: added ability to set labels for the provisioned namespace

**v0.0.3**

- refactor: remove git auth and TronadorConfig object
- refactor: remove unused dependencies
- fix: Application and HelmRelease are now required fields for EnvironmentProvisioner
- fix: HelmRelease creation and updation
- feat: added more error handling

**v0.0.2**

- fix: fix leader election role in chart

**v0.0.1**

- initial release
