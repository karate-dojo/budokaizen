# Deployment Guide

Complete guide for deploying your IOGKF dojo website to GitHub Pages.

## 🚀 GitHub Pages Deployment

### Quick Deployment (Template Users)

[![Deploy to GitHub Pages](https://img.shields.io/badge/Deploy%20to-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://github.com/gabrielpedepera/IOGKF_dojo_website_template/generate)

1. **Create your site** - Click the "Use this template" button above
2. **Configure your dojo** - Edit the YAML files in `/data/en/`
3. **Enable GitHub Pages** - Go to Settings → Pages → Select "GitHub Actions"
4. **Your site is live!** - Available at `https://yourusername.github.io/repository-name`

### Detailed Steps

#### Step 1: Repository Setup
1. Fork or use the template to create your repository
2. Update `baseURL` in `hugo.toml` with your repository name:
   ```toml
   baseURL = "https://yourusername.github.io/your-repository-name/"
   ```

#### Step 2: Enable GitHub Pages
1. Go to your repository **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**, select **"GitHub Actions"**
4. Save the settings

#### Step 3: Deploy
1. **Push your changes** to the `main` branch
2. **GitHub Actions automatically builds and deploys** your site
3. **Access your site** at `https://yourusername.github.io/repository-name`

*Deployment typically takes 2-3 minutes*

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

*For detailed custom domain setup, see [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)*

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
1. Fork this repository
2. Update `baseURL` in `hugo.toml` with your repository name
3. Configure your dojo information in the data files
4. Enable GitHub Pages in repository settings (Source: GitHub Actions)
5. Push changes to trigger deployment

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

*Configuration completed as part of Prompt 12 implementation.*
