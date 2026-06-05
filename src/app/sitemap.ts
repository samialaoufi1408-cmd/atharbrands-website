import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

const ROUTES = ["", "/about", "/services", "/methodology", "/work", "/discovery", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
