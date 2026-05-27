# Copilot Instructions for IOGKF Website Template

## Build & Development

```bash
# Install theme (required after clone)
git submodule update --init --recursive

# Local development server with live reload
hugo server

# Production build (mirrors CI)
hugo --gc --minify
```

Hugo Extended v0.100.0+ is required. The CI pipeline (`.github/workflows/hugo.yml`) uses Hugo Extended 0.148.2 with Dart Sass and deploys to GitHub Pages on push to `main`.

## Architecture

This is a Hugo static site using the **Ananke** theme (git submodule in `themes/ananke/`). Content is primarily **data-driven via YAML files** rather than Markdown — most pages are rendered by custom layout templates that read from `data/` files.

### Data-Driven Content Model

Site content lives in language-scoped YAML files under `data/{lang}/`:

| File | Drives |
|------|--------|
| `data/{lang}/dojo.yaml` | Homepage hero + contact page (name, address, phone, email, map embed) |
| `data/{lang}/schedule.yaml` | Schedule page (class timetables) |
| `data/{lang}/instructors.yaml` | Instructors page (names, ranks, photos) |
| `data/{lang}/menu.yaml` | Navigation menu items |
| `data/social.yaml` | Social media links (language-independent) |
| `data/site_config.yaml` | Language switcher flags/names |

Templates access data via `index .Site.Data .Site.Language.Lang "filename"` to load the correct language variant.

### Layout Structure

Custom layouts in `layouts/` override the Ananke theme:

- `layouts/index.html` — Homepage (reads `dojo.yaml`)
- `layouts/contact/single.html` — Contact page with map embed
- `layouts/schedule/single.html` — Class schedule
- `layouts/instructors/single.html` — Instructor profiles
- `layouts/social/single.html` — Social media cards
- `layouts/partials/` — Shared components: navigation, header, language switcher, head additions

Content files in `content/{lang}/` are thin Markdown stubs that specify `type` and `layout` in front matter to invoke the correct layout template (e.g., `type: "contact"`, `layout: "instructors"`).

### Multi-Language Setup

- Languages configured in `hugo.toml` under `[languages]` (currently English and Portuguese)
- Content directories mirror per language: `content/en/`, `content/pt/`
- Data files mirror per language: `data/en/`, `data/pt/`
- UI strings in `i18n/en.toml` and `i18n/pt.toml`
- Navigation uses `relLangURL` for language-aware links
- Language switcher partial auto-shows when multiple languages are configured

## Key Conventions

- **Graceful fallbacks**: Templates check for missing/empty data and render localized "coming soon" placeholder text via `i18n` strings. Always maintain this pattern when adding new data-driven sections.
- **Language-scoped data access**: Always use `index .Site.Data .Site.Language.Lang "key"` to load YAML data — never hardcode a language path.
- **Content stubs**: Pages are driven by YAML data, not Markdown body content. Content `.md` files only provide front matter (`title`, `type`, `layout`) to route to the correct template.
- **Assets vs Static**: Interactive JS and CSS that need Hugo Pipes processing go in `assets/`. Static files that are served as-is go in `static/`.
- **Adding a new language**: Create `content/{lang}/` and `data/{lang}/` directories mirroring the English structure, add an `i18n/{lang}.toml` file, and register the language in `hugo.toml` under `[languages]`.
