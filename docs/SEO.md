# Page Titles and Descriptions

Hugo and Ananke provide page titles, meta descriptions, canonical URLs, indexing directives, and Open Graph/Twitter metadata. Each dojo can customize page metadata without changing navigation labels or visible headings.

## Per-page metadata

Add `seo.title` and `description` to the front matter of the appropriate content file:

```yaml
---
title: "Home"
description: "Discover our Goju-Ryu dojo, meet the instructors, and find training times and contact details."
seo:
  title: "Goju-Ryu Karate | Your Dojo"
---
```

`seo.title` is the **complete** browser/search title; the site name is not appended again. Keep `title` as the existing short page label. If `seo.title` is absent or empty, the existing Ananke title behavior is preserved: page title followed by the site's title. Text is HTML-escaped automatically.

`description` supplies the meta description and social descriptions. Google may select a different title or snippet from the visible page content. Open Graph and Twitter titles use the same complete title as the browser, instead of generic labels such as "Home". Sharing images use the page's `featured_image`, falling back to the site's configured logo; all image URLs are absolute.

Do not add a `meta keywords` list. Write accurate, natural descriptions supported by the visible content, and include names, locations, qualifications, or services only when verified.

## Languages

Metadata belongs to the page's language, not a global hardcoded translation:

| Page | English | Portuguese |
|------|---------|------------|
| Homepage | `content/en/_index.md` | `content/pt/_index.md` |
| Instructors | `content/en/instructors.md` | `content/pt/instructors.md` |
| Contact | `content/en/contact.md` | `content/pt/contact.md` |
| Schedule | `content/en/schedule.md` | `content/pt/schedule.md` |

For another language, set the fields in `content/{lang}/` after registering that language in Hugo. No template or JavaScript changes are required. These are editorial translations in content front matter, not UI strings in `i18n/`. When an SEO title is omitted, the fallback uses that page's existing title and its language's site title.

Visible dojo introductions and instructor details continue to use language-scoped `data/{lang}/dojo.yaml` and `data/{lang}/instructors.yaml`. Keep those consistent with the metadata.

Translated pages have reciprocal, self-referencing `hreflang` links in their HTML head as well as Hugo's language sitemaps. Language-only codes (`pt`, `en`) match the sitemap and avoid restricting English search results to one country. Optional Open Graph locales use each language's `params.social_locale` (`pt_PT`, `en_US`); these sharing conventions do not change search targeting.

## Crawlability and local identity

`baseURL` is the public Budôkaizen origin. Override it with `--baseURL` for another host or repository subpath; do not ship relative canonical or sitemap URLs. The `layouts/robots.txt` override generates a sitemap declaration that preserves repository subpaths, unlike Ananke's root-relative declaration. Non-production builds retain Ananke's crawl-disallow behavior. The unused tag/category taxonomies are disabled so their empty pages do not appear in search or sitemaps. The 404 page is marked `noindex`.

The homepage hero and instructor introduction each have one semantic H1 without changing their wording or appearance. Contact and schedule calls to action use their canonical trailing-slash paths, and telephone links use normalized dialable numbers.

Each translated homepage includes a `SportsActivityLocation` JSON-LD entity with a shared identifier from the first language's homepage (Portuguese in this site's configuration). It uses only the existing language-scoped dojo name, address, description, telephone, email, configured image and enabled social profiles. Missing name or address omits the entity. No opening hours, reviews, ratings, coordinates, or qualifications are inferred. This markup describes the dojo; it does not guarantee a Google rich result or replace a verified Google Business Profile.

## Template maintenance and verification

`layouts/_default/baseof.html` overrides the pinned Ananke base layout for SEO titles, social metadata, language alternates, local JSON-LD and 404 indexing. Preserve its remaining behavior and compare this override when upgrading the theme.

Run the regression checks and build:

```bash
node --test tests/*.test.cjs
hugo --gc --minify
```

Inspect each language's generated `<title>` and description. SEO checks cover title fallback, independently translated metadata, an added third language, escaped text, unchanged visible labels, canonical and sharing URLs under a repository subpath, reciprocal language links, sitemap/robots output, homepage H1 and factual JSON-LD.

## Optional Copilot SEO skills

[`AgriciDaniel/claude-seo`](https://github.com/AgriciDaniel/claude-seo) is a Claude Code plugin, not a drop-in Copilot plugin. Its installer targets `~/.claude` and its workflows reference Claude-specific launchers and agents. No installer or plugin is required for this site's checks.

For Copilot, adapt only reviewed technical, multilingual and local-SEO guidance into a project skill such as `.github/skills/dojo-seo/SKILL.md`, following [GitHub's agent skills documentation](https://docs.github.com/en/copilot/concepts/customizations/agent-skills). Pin the reviewed upstream revision, retain applicable MIT attribution, replace Claude-specific tools with this repository's Hugo/Node checks, and omit automatic multi-agent fan-out, external API setup and report-generation requirements. Merely copying the plugin's entrypoint would leave incompatible commands and missing resources. Review any bundled executable independently before using it. No skill has been installed as part of these site improvements.
