// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.smilechildrenscharity.com";
  const routes = [
    "",
    "/about",
    "/our-story",
    "/families",
    "/impact",
    "/smile-house",
    "/family-support",
    "/events",
    "/news",
    "/fundraising",
    "/corporate",
    "/legacy",
    "/volunteer",
    "/shop",
    "/donate",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
