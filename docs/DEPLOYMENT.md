# Deployment Guide

Complete guide for deploying your IOGKF dojo website to GitHub Pages.

## 🚀 GitHub Pages Deployment

### Quick Deployment (Template Users)

[![Deploy to GitHub Pages](https://img.shields.io/badge/Deploy%20to-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://github.com/karate-dojo/IOGKF_website_template/generate)

1. **Create your site** - Click the "Use this template" button above
2. **📝 Note: Enable GitHub Pages first** - Go to Settings → Pages → Select "GitHub Actions" 
3. **Configure your dojo** - Edit the YAML files in `/data/en/`
4. **Push changes** - The GitHub Actions workflow will automatically deploy
5. **Your site is live!** - Available at `https://yourusername.github.io/repository-name`

> **💡 Helpful tip**: Make sure to enable GitHub Pages in your repository settings before the first deployment. The GitHub Actions workflow cannot automatically enable Pages due to GitHub's permission restrictions, so this step needs to be done manually.### Detailed Steps

#### Step 1: Repository Setup

1. Fork or use the template to create your repository
2. **No baseURL configuration needed!** - The template automatically detects your GitHub Pages URL

   > ✨ **Dynamic baseURL**: This template automatically configures the correct URL for your deployment. No manual editing required!

#### Step 2: Enable GitHub Pages (Setup Required)

> **📋 Setup Note**: This step needs to be completed before running deployments. GitHub Actions cannot automatically enable Pages, so we need to enable it manually first.

1. Go to your repository **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**, select **"GitHub Actions"**
4. Save the settings

**Note**: If you skip this step, you'll see a "Resource not accessible by integration" error on your first deployment attempt. No worries - just enable Pages and re-run the workflow.

#### Step 3: Deploy

1. **Push your changes** to the `main` branch
2. **GitHub Actions automatically builds and deploys** your site
3. **Access your site** at `https://yourusername.github.io/repository-name`

_Deployment typically takes 2-3 minutes_

### Custom Domain Setup

To use your own domain (e.g., `www.yourdojo.com`):

1. **Add CNAME file**:

   ```bash
   echo "www.yourdojo.com" > static/CNAME
   ```

2. **Configure DNS** with your domain provider:

   - Add a CNAME record pointing `www` to `yourusername.github.io`
   - Or add A records pointing to GitHub's IP addresses

3. **Enable custom domain** in GitHub Pages settings

_For detailed custom domain setup, see [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)_

## ✅ What's Been Pre-configured

This repository is now configured for automatic deployment to GitHub Pages using GitHub Actions.

### What's Been Configured

1. **GitHub Actions Workflow** (`.github/workflows/hugo.yml`)

   - Automatically builds and deploys on push to `main` branch
   - Uses Hugo Extended v0.148.2+
   - Includes proper permissions for GitHub Pages
   - Handles submodules and dependencies
   - Builds with minification and garbage collection

2. **Hugo Configuration** (`hugo.toml`)

   - Updated `baseURL` for GitHub Pages format
   - Configured for multi-language support (EN/PT)
   - Ready for production deployment

3. **Documentation** (`README.md`)
   - Added deploy button and instructions
   - Step-by-step GitHub Pages setup guide
   - Local development instructions

## How to Deploy

### For Repository Owners:

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Site will be available at: `https://yourusername.github.io/repository-name/`

### For New Users (Fork and Deploy):

1. **First**: Fork this repository
2. **Enable GitHub Pages**: Go to repository settings (Settings → Pages → Source: GitHub Actions)
3. Update `baseURL` in `hugo.toml` with your repository name (if needed)
4. Configure your dojo information in the data files
5. Push changes to trigger deployment

> **💡 Pro tip**: Enable GitHub Pages in repository settings before your first deployment to avoid any workflow errors.

## Testing Results

- ✅ Hugo build successful (132ms build time)
- ✅ Multi-language support working (EN: 15 pages, PT: 14 pages)
- ✅ Minification and garbage collection working
- ✅ Static files properly handled (5 files per language)
- ✅ GitHub Actions workflow syntax validated

## Next Steps

1. **Test the actual deployment** by pushing to a GitHub repository
2. **Verify GitHub Pages setup** in repository settings
3. **Confirm live site** loads properly
4. **Update dojo-specific configuration** as needed

---

## 🌐 Dynamic baseURL Configuration

This template features **automatic baseURL detection** - no manual configuration required!

### How It Works

- **Local Development**: Uses `/` for relative URLs
- **GitHub Pages**: Automatically detects `https://username.github.io/repository-name/`
- **Custom Domains**: Adapts automatically when custom domains are configured
- **Other Hosting**: Can override baseURL as needed

### Benefits

✅ **Zero Configuration** - Works immediately for any GitHub Pages deployment  
✅ **Fork Friendly** - New users don't need to edit configuration files  
✅ **Custom Domain Ready** - Automatically adapts when domains are added  
✅ **Template Friendly** - Perfect for template repositories

### Technical Implementation

The GitHub Actions workflow uses GitHub's provided environment variables:

```yaml
hugo --baseURL "${{ steps.pages.outputs.base_url }}/"
```

While `hugo.toml` uses a development-friendly default:

```toml
baseURL = "/"
```

_Configuration completed as part of Prompt 12 implementation._

## 🔧 Troubleshooting

### Common GitHub Pages Deployment Errors

#### "Resource not accessible by integration" Error

**Error Message:**

```
Error: Create Pages site failed. Error: Resource not accessible by integration
```

**Cause:** GitHub Actions cannot automatically enable GitHub Pages. This must be done manually first.

**Solution:**

1. Go to your repository **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**, select **"GitHub Actions"**
4. Save the settings
5. Re-run the failed GitHub Actions workflow

#### "Not Found - Get Pages site failed" Error

**Error Message:**

```
Warning: Get Pages site failed. Error: Not Found
```

**Cause:** GitHub Pages is not enabled for the repository.

**Solution:** Same as above - manually enable GitHub Pages in repository settings first.

#### Workflow Permissions Issues

If you encounter permission errors, ensure your repository has the correct workflow permissions:

1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select **"Read and write permissions"**
3. Check **"Allow GitHub Actions to create and approve pull requests"**
4. Save the settings
