import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { locales } from "@/i18n/locales";
import { services } from "@/data/services";
import { articles } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/services", "/projects", "/blog", "/contact", "/privacy", "/terms"];
  const servicePaths = services.map((s) => `/services/${s.slug}`);
  const blogPaths = articles.map((a) => `/blog/${a.slug}`);

  const paths = [...staticPaths, ...servicePaths, ...blogPaths];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
    }))
  );
}
