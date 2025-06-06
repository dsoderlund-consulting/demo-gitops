import * as fs from "fs";
import * as path from "path";
import { DNS_NAME_REGEX } from "./DNS_NAME_REGEX";

/**
 * Reads DNS names from files in a given folder, validates them,
 * and constructs redirect URIs.
 * @param folderPath The absolute path to the folder containing DNS name files.
 * @returns An array of valid redirect URIs.
 */
export function getValidRedirectUrisFromDnsNames(folderPath: string): string[] {
  const redirectUris: string[] = [];

  if (!fs.existsSync(folderPath)) {
    console.warn(
      `[INFO] Folder not found: ${folderPath}. No redirect URIs will be added from files.`
    );
    return redirectUris;
  }

  const files = fs.readdirSync(folderPath);
  console.log(
    `[INFO] Reading DNS names from folder: ${folderPath}. Found ${files.length} potential files.`
  );

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        const lines = content.split(/\r?\n/); // Handles both LF and CRLF

        for (const line of lines) {
          const dnsName = line.trim();
          if (dnsName === "") {
            continue; // Skip empty lines
          }
          if (DNS_NAME_REGEX.test(dnsName)) {
            redirectUris.push(`https://${dnsName}/oauth2/callback`);
          } else {
            console.warn(
              `[WARN] Invalid DNS name found in ${filePath}: "${dnsName}". Skipping.`
            );
          }
        }
      } catch (error) {
        console.error(
          `[ERROR] Error reading or processing file ${filePath}:`,
          error
        );
      }
    }
  }
  console.log(
    `[INFO] Successfully processed ${redirectUris.length} valid redirect URIs from files.`
  );
  return redirectUris;
}
