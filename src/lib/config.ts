import { SiteConfig } from "@/types";
import { siteConfig } from "../../site.config";

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

export function validateSiteConfig(config: unknown): config is SiteConfig {
  if (!config || typeof config !== "object") {
    return false;
  }

  const c = config as Record<string, unknown>;

  return (
    typeof c.name === "string" &&
    typeof c.description === "string" &&
    typeof c.url === "string" &&
    typeof c.author === "object" &&
    c.author !== null &&
    typeof (c.author as Record<string, unknown>).name === "string" &&
    Array.isArray(c.navigation) &&
    c.navigation.every(
      (item: unknown) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as Record<string, unknown>).title === "string" &&
        typeof (item as Record<string, unknown>).href === "string"
    )
  );
}
