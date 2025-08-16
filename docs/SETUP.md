# Complete Setup Guide

This guide will walk you through setting up your IOGKF dojo website from start to finish.

## Prerequisites

### Required Software

1. **Hugo Extended v0.100.0+**
   ```bash
   # Check your version
   hugo version
   
   # Should show "extended" in the output
   # Example: hugo v0.148.2+extended+withdeploy
   ```

2. **Git**
   ```bash
   git --version
   ```

3. **Text Editor** (recommended):
   - [VS Code](https://code.visualstudio.com/) with Hugo Language Support extension
   - [Sublime Text](https://www.sublimetext.com/)
   - Any text editor that handles YAML well

### Account Setup

- **GitHub Account**: For hosting and deployment
- **OpenStreetMap** (optional): For embedded maps

## Installation Methods

### Method 1: Fork and Deploy (Easiest)

Perfect for non-technical users who want to get started quickly.

1. **Fork the Repository**
   - Go to: https://github.com/gabrielpedepera/IOGKF_dojo_website_template
   - Click "Fork" button
   - Choose your GitHub account

2. **Enable GitHub Pages**
   - In your forked repository, go to "Settings"
   - Click "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - Click "Save"

3. **Configure Your Dojo**
   - Edit files directly on GitHub (see Configuration Guide)
   - Or clone locally for easier editing

### Method 2: Local Development (Recommended)

For users who want full control and local testing.

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/IOGKF_dojo_website_template.git
   cd IOGKF_dojo_website_template
   ```

2. **Initialize Submodules**
   ```bash
   git submodule update --init --recursive
   ```

3. **Test Local Build**
   ```bash
   hugo server
   ```
   
   Open http://localhost:1313 to see your site.

## Initial Configuration

### 1. Update Site Settings

Edit `hugo.toml`:

```toml
baseURL = "https://yourusername.github.io/your-repository-name/"
title = "Your Dojo Name"
```

### 2. Configure Your Dojo Information

Edit the files in `/data/en/`:

- `dojo.yaml` - Basic dojo information
- `instructors.yaml` - Your instructors and their ranks
- `schedule.yaml` - Class schedule
- `social.yaml` - Social media links

See the [Configuration Guide](CONFIGURATION.md) for detailed explanations.

### 3. Upload Your Images

Replace the placeholder images in `/static/images/`:

- `logo.png` - Your dojo or IOGKF logo
- `hero.jpg` - Background image for the homepage

See the [Image Upload Guide](IMAGES.md) for specifications.

## Deployment Options

### GitHub Pages (Free)

Already configured if you followed Method 1. Just push changes to deploy:

```bash
git add .
git commit -m "Update dojo information"
git push origin main
```

Your site will be available at: `https://yourusername.github.io/repository-name/`

### Other Platforms

- **Netlify**: Drag and drop the `public/` folder after running `hugo`
- **Vercel**: Connect your GitHub repository
- **Custom Server**: Upload the contents of `public/` folder

## Verification Checklist

After setup, verify these items work:

- [ ] Site loads without errors
- [ ] Navigation menu works
- [ ] Language switcher functions (EN/PT)
- [ ] All pages display correctly
- [ ] Images load properly
- [ ] Contact form shows your information
- [ ] Map displays your location (if configured)
- [ ] Social media links work

## Next Steps

1. **Customize Content**: Edit the About page with your dojo's information
2. **Add Instructors**: Update the instructors list with your team
3. **Set Schedule**: Configure your class timetable
4. **Social Media**: Connect your social accounts
5. **Optional Features**: Add dojo history if desired

## Getting Help

- **Documentation**: Check other guides in the `docs/` folder
- **Troubleshooting**: See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Community**: Open an issue on GitHub for help

---

**Need help?** Don't hesitate to ask! The IOGKF community is here to support each other.
