import { SiteConfig } from "@/types";
import { siteConfig } from "@/config/site.config";

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

function isValidAuthor(author: unknown): boolean {
  return (
    typeof author === "object" &&
    author !== null &&
    typeof (author as Record<string, unknown>).name === "string"
  );
}

function isValidNavigationItem(item: unknown): boolean {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof (item as Record<string, unknown>).title === "string" &&
    typeof (item as Record<string, unknown>).href === "string"
  );
}

function isValidNavigation(navigation: unknown): boolean {
  return Array.isArray(navigation) && navigation.every(isValidNavigationItem);
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
    isValidAuthor(c.author) &&
    isValidNavigation(c.navigation)
  );
}
