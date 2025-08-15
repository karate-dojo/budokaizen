# Language Configuration Guide

This Hugo site supports flexible language configuration. You can easily switch between single-language and multi-language modes.

## Current Configuration

The site is currently configured for **multi-language mode** with English (en) and Portuguese (pt).

## Available Configurations

### 1. Multi-Language Mode (Current Setup)

**Features:**
- Language dropdown in the navigation
- Separate content directories for each language
- Language-specific menus
- Automatic language switching

**Files involved:**
- `hugo.toml` - Main configuration
- `content/en/` - English content
- `content/pt/` - Portuguese content
- `layouts/partials/i18nlist.html` - Language switcher dropdown

### 2. Single Language Mode

To switch to single-language mode (English only):

#### Step 1: Modify `hugo.toml`

Comment out the multi-language sections and uncomment the single-language menu:

```toml
# Comment out the [languages] section:
# [languages]
#   [languages.en]
#     title = "Sakura Dojo"
#     weight = 1
#     contentDir = "content/en"
#     languageName = "English"
#     
#   [languages.pt]
#     title = "Dojo Sakura"
#     weight = 2
#     contentDir = "content/pt"
#     languageName = "Português"

# Comment out the language-specific menus:
# [languages.en.menu]
#   [[languages.en.menu.main]]
#     name = "About"
#     url = "/about/"
#     weight = 1
#   
#   [[languages.en.menu.main]]
#     name = "Instructors"
#     url = "/instructors/"
#     weight = 2

# [languages.pt.menu]
#   [[languages.pt.menu.main]]
#     name = "Sobre"
#     url = "/pt/about/"
#     weight = 1
#   
#   [[languages.pt.menu.main]]
#     name = "Instrutores"
#     url = "/pt/instructors/"
#     weight = 2

# Uncomment the single-language menu:
[menu]
  [[menu.main]]
    name = "About"
    url = "/about/"
    weight = 1
  
  [[menu.main]]
    name = "Instructors"
    url = "/instructors/"
    weight = 2
```

#### Step 2: Hide the Language Switcher

In the `[params]` section, add:

```toml
[params]
  # ... other params ...
  hide_language_switcher = true
```

#### Step 3: Move Content

Move your content from `content/en/` to `content/`:

```bash
mv content/en/* content/
rmdir content/en
rm -rf content/pt  # Remove Portuguese content if not needed
```

### 3. Adding More Languages

To add more languages (e.g., Spanish):

#### Step 1: Add Language Configuration

In `hugo.toml`:

```toml
[languages.es]
  title = "Dojo de Ejemplo"
  weight = 3
  contentDir = "content/es"
  languageName = "Español"
```

#### Step 2: Add Spanish Menu

```toml
[languages.es.menu]
  [[languages.es.menu.main]]
    name = "Acerca de"
    url = "/es/about/"
    weight = 1
  
  [[languages.es.menu.main]]
    name = "Instructores"
    url = "/es/instructors/"
    weight = 2
```

#### Step 3: Create Content Directory

```bash
mkdir -p content/es
# Copy and translate content files
cp content/en/*.md content/es/
```

## Language Switcher Features

The language switcher dropdown includes:

- 🌐 Globe icon with current language name
- Dropdown menu with all available languages
- Current language marked with ✓
- Hover effects and clean styling
- RTL (right-to-left) language support

## Configuration Parameters

In `hugo.toml` `[params]` section:

```toml
[params]
  # Show/hide language switcher
  show_language_switcher = true    # Shows when multiple languages available
  # OR
  hide_language_switcher = true    # Completely hides the switcher
```

## File Structure

```
├── hugo.toml                 # Main configuration
├── content/
│   ├── en/                   # English content
│   │   ├── _index.md
│   │   ├── about.md
│   │   └── instructors.md
│   └── pt/                   # Portuguese content
│       ├── _index.md
│       ├── about.md
│       └── instructors.md
├── data/
│   ├── en/                   # English data files
│   └── pt/                   # Portuguese data files
└── layouts/
    └── partials/
        └── i18nlist.html     # Custom language switcher
```

## Testing

1. Start Hugo server: `hugo server`
2. Visit `http://localhost:1313/`
3. Test language switching using the dropdown in the navigation
4. Verify URLs:
   - English: `http://localhost:1313/` or `http://localhost:1313/en/`
   - Portuguese: `http://localhost:1313/pt/`

## Troubleshooting

**Problem: Language switcher not showing**
- Check that you have multiple languages configured in `[languages]`
- Ensure `hide_language_switcher` is not set to `true`

**Problem: Wrong language content**
- Verify content is in the correct `content/{lang}/` directory
- Check `contentDir` in language configuration

**Problem: Menu links wrong**
- Ensure menu URLs include language prefix (e.g., `/pt/about/`)
- Check menu configuration in `hugo.toml`
