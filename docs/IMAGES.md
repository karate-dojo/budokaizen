# Image Management Guide

Learn how to add, optimize, and manage images for your IOGKF dojo website.

## Overview

Images enhance your dojo website by showcasing your training space, instructors, and community. This guide covers everything from basic image uploads to optimization best practices.

## Image Locations

### Directory Structure

```
static/
└── images/
    ├── logo.png          # Main dojo logo (required)
    ├── logo.svg          # Vector logo (optional)
    ├── hero-bg.jpg       # Homepage background (optional)
    ├── instructors/      # Instructor photos (future feature)
    ├── gallery/          # Dojo photos
    └── events/           # Event photos
```

### Logo Files

Your dojo logo is the most important image:

- **Location**: `static/images/logo.png`
- **Also supported**: `static/images/logo.svg`
- **Displays**: Homepage, navigation, social media

#### Quick Logo Requirements
- **Recommended size**: 300x120px (maintains aspect ratio)
- **Format**: PNG with transparent background preferred
- **Alternative**: SVG for vector graphics (scales perfectly)
- **File name**: Must be exactly `logo.png` or `logo.svg`

## Image Requirements

### Logo Specifications

#### PNG Logo (Required)
- **Size**: 200x200 pixels minimum
- **Format**: PNG with transparent background
- **File**: `logo.png`
- **Max file size**: 100KB recommended

#### SVG Logo (Optional)
- **Format**: SVG vector format
- **File**: `logo.svg`
- **Benefits**: Scales perfectly, smaller file size
- **Preferred**: Use SVG when available

### Background Images

#### Hero Background (Optional)
- **Location**: `static/images/hero-bg.jpg`
- **Size**: 1920x1080 pixels (Full HD)
- **Format**: JPG (for photos), PNG (for graphics)
- **File size**: Under 500KB for fast loading
- **Style**: Horizontal orientation works best

### General Image Guidelines

| Type | Max Width | Max Height | Format | Max Size |
|------|-----------|------------|--------|----------|
| Logo | 400px | 400px | PNG/SVG | 100KB |
| Hero Background | 1920px | 1080px | JPG | 500KB |
| Gallery Photos | 1200px | 800px | JPG | 300KB |
| Instructor Photos | 400px | 400px | JPG | 150KB |

## Adding Images

### Method 1: Direct Upload (GitHub Web)

1. **Navigate to Repository**:
   - Go to your GitHub repository
   - Click on `static/images/` folder

2. **Upload Files**:
   - Click "Add file" → "Upload files"
   - Drag and drop your images
   - Add commit message: "Add dojo photos"
   - Commit changes

3. **Automatic Deployment**:
   - GitHub Pages will automatically rebuild
   - Images available in 2-3 minutes

### Method 2: Local Development

1. **Copy Files**:
   ```bash
   # Copy to images directory
   cp your-logo.png static/images/logo.png
   cp background.jpg static/images/hero-bg.jpg
   ```

2. **Test Locally**:
   ```bash
   hugo server
   # Visit http://localhost:1313 to preview
   ```

3. **Deploy**:
   ```bash
   git add static/images/
   git commit -m "Add dojo images"
   git push
   ```

### Method 3: Git Command Line

```bash
# Clone repository (if not already done)
git clone https://github.com/yourusername/your-dojo-site.git
cd your-dojo-site

# Add images
cp ~/Desktop/logo.png static/images/
cp ~/Desktop/hero-background.jpg static/images/hero-bg.jpg

# Commit and push
git add static/images/
git commit -m "Add dojo logo and hero background"
git push origin main
```

## Image Optimization

### Before Uploading

#### Resize Images
Use free tools to resize images:

- **Online**: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
- **Mac**: Preview app, Image Capture
- **Windows**: Paint, Photos app
- **Mobile**: Built-in photo editors

#### Compress Images
Reduce file size while maintaining quality:

1. **Online Compressors**:
   - [TinyPNG](https://tinypng.com/) - Best for PNG
   - [TinyJPG](https://tinyjpg.com/) - Best for JPG
   - [Squoosh](https://squoosh.app/) - Advanced options

2. **Desktop Software**:
   - [ImageOptim](https://imageoptim.com/) (Mac)
   - [RIOT](http://luci.criosweb.ro/riot/) (Windows)

### Format Selection

| Use Case | Best Format | Why |
|----------|-------------|-----|
| Logo with transparency | PNG | Supports transparent background |
| Logo (simple graphics) | SVG | Scales perfectly, small file size |
| Photos (backgrounds) | JPG | Good compression for photos |
| Screenshots | PNG | Better for sharp lines and text |

## Using Images in Content

### Homepage Logo

The logo is automatically used if present:

```yaml
# No configuration needed - just place file at:
# static/images/logo.png or static/images/logo.svg
```

### Background Images

To add a hero background image:

1. **Add Image**: Place at `static/images/hero-bg.jpg`
2. **Hugo Will Automatically**: Use it as homepage background
3. **Fallback**: Default gradient if no image present

### Future Features

#### Instructor Photos (Coming Soon)
```yaml
# data/en/instructors.yaml (future update)
instructors:
  - name: "John Smith"
    dan: "7th Dan"
    photo: "instructors/john-smith.jpg"  # Future feature
    title: "Chief Instructor"
```

#### Gallery Pages (Planned)
- Dojo photo galleries
- Event photo albums
- Training session photos

## Troubleshooting

### Common Issues

#### 1. Images Not Displaying

**Problem**: Added images but they don't show on website

**Solutions**:
```bash
# Check file location
ls static/images/logo.png

# Verify file names (case-sensitive)
# ❌ Wrong: Logo.PNG, LOGO.png
# ✅ Correct: logo.png

# Check Hugo server restart
hugo server --disableFastRender
```

#### 2. Images Too Large

**Problem**: Website loads slowly

**Solutions**:
- Compress images before uploading
- Use appropriate dimensions
- Convert photos to JPG format

#### 3. Logo Not Crisp

**Problem**: Logo appears blurry or pixelated

**Solutions**:
- Use higher resolution (400x400 minimum)
- Save as PNG with transparency
- Consider SVG format for vector logos

#### 4. GitHub Upload Fails

**Problem**: Cannot upload large images

**Solutions**:
- GitHub file limit is 25MB (plenty for web images)
- Compress images first
- Use Git command line for multiple files

### Testing Images

#### Local Testing
```bash
# Start Hugo server
hugo server

# Check these URLs:
# http://localhost:1313/images/logo.png
# http://localhost:1313/images/hero-bg.jpg
```

#### Production Testing
```bash
# After deployment, check:
# https://yourusername.github.io/your-repo/images/logo.png
```

## Best Practices

### Performance Optimization

1. **Right-Size Images**: Don't upload 4K images for small display areas
2. **Compress Before Upload**: Use TinyPNG or similar tools
3. **Use Appropriate Formats**: JPG for photos, PNG for logos, SVG when possible
4. **Lazy Loading**: Hugo handles this automatically for modern browsers

### Accessibility

1. **Alt Text**: All images should have descriptive alt text
2. **High Contrast**: Ensure logos work on various backgrounds
3. **File Names**: Use descriptive names (`dojo-entrance.jpg` not `IMG_1234.jpg`)

### SEO Benefits

1. **Descriptive Filenames**: `sensei-john-teaching-kata.jpg`
2. **Appropriate Sizes**: Fast loading improves search rankings
3. **Image Sitemaps**: Hugo automatically generates these

### Backup Strategy

1. **Keep Originals**: Store high-resolution originals separately
2. **Version Control**: Git tracks all image changes
3. **Cloud Backup**: Consider backing up to Google Drive/Dropbox

## Quick Reference

### Essential Files
```
static/images/logo.png          # Required: Your dojo logo
static/images/logo.svg          # Optional: Vector logo
static/images/hero-bg.jpg       # Optional: Homepage background
```

### Recommended Dimensions
```
Logo:           200x200 to 400x400 pixels
Hero Background: 1920x1080 pixels
Gallery Photos:  1200x800 pixels
```

### Upload Methods
```bash
# GitHub Web Interface: Easiest for beginners
# Git Command Line: Best for multiple files
# Local Development: Best for testing first
```

---

**Pro Tip**: Start with just a logo and add more images gradually. A good logo makes more impact than many mediocre photos.
