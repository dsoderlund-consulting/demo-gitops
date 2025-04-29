# demo-gitops

This repository acts as source control of the configuration of applications whose lifecycle is managed through backstage templates and continuously deployed to a kubernetes cluster.

## ArgoCD

I am using ArgoCD as my gitops tool.

Once it is installed in a kubernetes cluster, you can set it up to sync from git with an application. Applications are a custom resource defintion in kubernetes, then can thus be created with a manifest, the argocd gui tool, or generated and templated through an application set.

This is how you can deploy an application set to create the applications in this repository:

` sh
kubectl apply -f github-appset.yaml
`
