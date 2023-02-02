# Onboarding

Stakater provisions the Stakater App Agility Platform (SAAP) and takes first application to production in less than four weeks on the cloud of your choice!

## Onboarding - customer data - notes from meeting with `Usama` on 1 Feb

we ask customers if they want logging before provisioning, it is optional

what cloud? "Cloud Provider"

ask for credentials for cloud provider, like Binero account

cluster name? any preference

what IDP? credentials

Spoke cluster installation

Create user, download

Dominator needs permissions to git repo access - optional

Logs and events are in ES in that specific cluster
account of customer provider - cloud provider - [7 day retention](https://github.com/stakater-ab/saap-addons-charts/blob/main/stakater/openshift-logging-config/values.yaml#L42)

in case they want to forward events to data store they can do that optionally

infra alerts are sent to slack

app alerts are only sent to ES and can optionally be sent to our Slack

## Week 1 - Provisioning - Free

- Provision SAAP on the cloud of your choice

    - Stakater can arrange exclusive offers with cloud providers

- Configure access to systems

- On-boarding session and knowledge sharing

- Configure SSO

## Week 2-4 - Application Migration - Time and Material - Optional

- Select the first application or group of applications that work together

    - Setup infrastructure and application GitOps repositories for deploying application and dependent configurations

    - Setup tenant operator configuration and decide on the number of environments if required

    - Divide applications into microservices and containerize them

    - Deploy the application onto the cluster using Kubernetes Resources. List out secret required, dependent services, databases, storage requirements and implement them accordingly.

    - Deploy Kubernetes Resources using [Stakater Developed Helm Chart](https://github.com/stakater/application) on the environment chosen - prod, stage, test, dev - in the application GitOps configuration

    - Implement CI pipeline for the application if required. Deploy Tekton CI pipeline using the `Stakater Tekton Chart`

    - Implement monitoring, logging, validation/testing frameworks or any additional tools for the application

    - Validate

- Educate team on key concepts

## Next steps

- Reach out to Stakater for migrating next application, or

- Self-serviced migration of next application

## Customer Responsibilities

- Provide timely access to necessary people, systems, and information from relevant departments and teams

- Thorough engagement from management and teams

## Stakater Team

- Dedicated team

    - Project management: 20-40%

    - Solution architect: 50%

    - AppDev consultant: 100%

## Output

- First application live as container with cloud native CI/CD workflow

- Up-skilled team with key concepts of cloud native containerized workflow
