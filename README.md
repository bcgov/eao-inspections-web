# EAO

## Welcome

Welcome to the EAO Inspections Web application.  This is an OpenShift hosted website that serves as a user and data management centre for Inspections iOS App users and the inspections data that they save.  

The site provides administrators the ability to manage users, assign them to teams (each user must have a team in order to be able to conduct inspections), and the uploaded inspections data.

The site data is backed by MongoDB via the Parse Server product.

[Inspections App related GitHub Project](https://github.com/bcgov/field-inspection-app-ios)

[Inspections Parse Server related GitHub Project](https://github.com/bcgov/eao-parse-server)


## Important: Branch & Pull Request Workflow

Please use the following steps for working on this project:

1. DO NOT fork this repo [because the pipeline expects branches to belong to this repo](https://github.com/BCDevOps/jenkins-pipeline-shared-lib/blob/master/src/bcgov/GitHubHelper.groovy)
2. Clone this repo directly
3. Go into branch master
4. Create a branch for your work
5. Checkin, commit, push to origin (Remember you didn't fork right?  If you did you WILL break things, stop now and go back to step 1)
6. Create a PR

Reviewers and maintainers - DO NOT MERGE the PR via GitHub, let the pipeline do this.  DO NOT manually clean up branches, let the pipeline do this.  Doing either of these manually will break the pipeline and cause all kinds of problems.

Also, be AWARE: if Jenkins reboots while partially through the pipeline, the input stages will be permanently broken and the job will need to be cancelled and re-run in order for the inputs to work again.

Here are the steps to follow:

1. Go into the tools environment in OpenShift
2. Find the Jenkins deployment and click on the URL route upper right of the deployment
3. Authenticate to Jenkins
4. Find the PR (the BlueOcean view is nice)
5. There are several stages to go through so make sure you do not skip any
6. Approve or Cancel each stage (you may need to exit the page and reload in order to see the next input prompt)
7. If you approve going out to prod, don't forget to approve the final cleanup stage

This will get your changes to the correct environments and dispose branches and resources properly.

## About

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Provisioning Process


[OpenShift Project Creation]

- oc login ::REPOSITORY:: [--token=::TOKEN::]
- oc new-project ::PROJECT_NAME::
- ensure .env, Dockerfile and src/environments are setup
- make ::dev|prod:: new-app


[Local Development]

- ng serve
- (or) make local (if you need to run on Docker image. Can shell into the container by ::make workspace::) 


[Initial Rollout]

- ensure that the app has been created and all configuration is setup
- oc status ( confirm before deploy ! )
- oc get routes ( confirm before deploy ! )

- make ::dev|prod:: deploy
