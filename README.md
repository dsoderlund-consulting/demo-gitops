# demo-gitops

This repository acts as source control of the configuration of applications whose lifecycle is managed through backstage templates and continuously deployed to a kubernetes cluster.

## ArgoCD

I am using ArgoCD as my gitops tool.

Once it is installed in a kubernetes cluster, you can set it up to sync from git with an application. Applications are a custom resource defintion in kubernetes, then can thus be created with a manifest, the argocd gui tool, or generated and templated through an application set.

This is how you can deploy an application set to create the applications in this repository:

``` bash
kubectl apply -f github-appset.yaml
```

## Flux

Flux is another popular choice. It is faster and a bit more opinionated on how a sync should happen and doesn't feature a GUI out of the box.

## Shared configuration

The api gateway for the platform holds some shared configuration for all applications.

To get around having to change this application, there is a folder in which you can add files with new dns names that should be valid redirect uris for applications behind the oauth2proxy.

The location to place files is in allowedDnsConfigPath.txt

``` bash
cat allowedDnsConfigPath.txt
```