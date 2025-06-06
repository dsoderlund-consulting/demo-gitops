// Regex to validate DNS names.
// This regex checks for valid hostname characters and structure,
// allowing for subdomains and ensuring labels don't start or end with hyphens.

export const DNS_NAME_REGEX =
  /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
