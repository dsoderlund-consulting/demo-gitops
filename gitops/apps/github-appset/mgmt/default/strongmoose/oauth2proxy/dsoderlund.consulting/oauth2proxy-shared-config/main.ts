import { Construct } from "constructs";
import { App, Chart, ChartProps } from "cdk8s";
import {
  Client,
  ClientSpecDeletionPolicy,
  ClientSpecManagementPolicies,
} from "./imports/openidclient.keycloak.crossplane.io";
import * as path from "path";
import { getValidRedirectUrisFromDnsNames } from "./getValidRedirectUrisFromDnsNames";

export class MyChart extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps = { disableResourceNameHashes: true }
  ) {
    super(scope, id, props);

    const allowedDnsNamesFolder = path.join(__dirname, "allowedDnsNames");
    const dynamicallyGeneratedRedirectUris = getValidRedirectUrisFromDnsNames(
      allowedDnsNamesFolder
    );

    // define resources here
    new Client(this, "client", {
      metadata: {
        name: "oauth2proxy",
        annotations: {
          "dsoderlund.consulting/rendered-by": "cdk8s",
          "dsoderlund.consulting/managed-by": "crossplane",
        },
      },
      spec: {
        providerConfigRef: {
          name: "keycloak-config",
        },
        deletionPolicy: ClientSpecDeletionPolicy.ORPHAN,
        managementPolicies: [ClientSpecManagementPolicies.VALUE_ASTERISK],
        forProvider: {
          import: true,
          accessType: "CONFIDENTIAL",
          clientId: "oauth2proxy",
          description:
            "Generated through cdk8s and applied with crossplane (you can't make changes to this in the keycloak UI, they will be overwritten)",
          realmId: "master",
          // If no URIs are found, it's better to pass undefined or an empty array based on how the CRD handles it.
          validRedirectUris:
            dynamicallyGeneratedRedirectUris.length > 0
              ? dynamicallyGeneratedRedirectUris
              : undefined,
        },
      },
    });
  }
}

const app = new App();
new MyChart(app, "oauth2proxy-shared-config");
app.synth();
