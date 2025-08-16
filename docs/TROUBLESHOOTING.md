# Troubleshooting Guide

Common issues and solutions for your IOGKF dojo website. This guide helps you quickly diagnose and fix problems.

## Quick Diagnostics

### Is Your Site Working?

1. **Check Live Site**: Visit your GitHub Pages URL
2. **Check Build Status**: Look for green checkmark on GitHub Actions tab
3. **Check Recent Changes**: Review your last commits

### Common Problem Categories

- [Deployment Issues](#deployment-issues) - Site not updating or loading
- [Content Problems](#content-problems) - Text, images, or data not showing
- [Language Issues](#language-issues) - Multi-language problems
- [Configuration Errors](#configuration-errors) - YAML or setup problems
- [Performance Issues](#performance-issues) - Slow loading or errors

---

## Deployment Issues

### Site Not Updating After Changes

**Symptoms**: Made changes but website still shows old content

**Diagnosis**:
```bash
# Check if deployment succeeded
# Go to GitHub → Your Repository → Actions tab
# Look for green checkmark on latest run
```

**Solutions**:

1. **Wait for Deployment**:
   - GitHub Pages takes 2-5 minutes to update
   - Check Actions tab for completion status

2. **Clear Browser Cache**:
   ```bash
   # Hard refresh in browser
   # Chrome/Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   # Safari: Cmd+Option+R
   ```

3. **Check Build Logs**:
   - Go to Actions tab on GitHub
   - Click on failed run (red X)
   - Look for error messages in logs

4. **Force Rebuild**:
   ```bash
   git commit --allow-empty -m "Force rebuild"
   git push
   ```

### Build Failing (Red X in Actions)

**Symptoms**: Red X on Actions tab, site not updating

**Common Causes & Solutions**:

1. **YAML Syntax Error**:
   ```bash
   # Error message will mention YAML parsing
   # Check your YAML files at yamllint.com
   # Common issue: incorrect indentation
   ```

2. **Hugo Version Mismatch**:
   ```bash
   # Update .github/workflows/hugo.yml
   # Change HUGO_VERSION to match your local version
   hugo version  # Check your local version
   ```

3. **Missing Files**:
   ```bash
   # Ensure these files exist:
   ls hugo.toml              # Hugo config
   ls layouts/index.html     # Homepage template
   ls data/en/dojo.yaml      # Basic configuration
   ```

### 404 Page Not Found

**Symptoms**: Site loads but shows "Page Not Found"

**Solutions**:

1. **Check GitHub Pages Settings**:
   - GitHub → Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "gh-pages" (not main)

2. **Check Repository Name**:
   ```bash
   # If repository is named exactly: username.github.io
   # Site URL: https://username.github.io
   
   # If repository has different name: my-dojo-site
   # Site URL: https://username.github.io/my-dojo-site
   ```

3. **Update baseURL in hugo.toml**:
   ```toml
   # For repository named "my-dojo-site"
   baseURL = "https://yourusername.github.io/my-dojo-site/"
   ```

---

## Content Problems

### Images Not Loading

**Symptoms**: Broken image icons, images don't display

**Diagnosis**:
```bash
# Check if image files exist
ls static/images/logo.png
ls static/images/

# Verify image URLs in browser
# Visit: https://yoursite.com/images/logo.png
```

**Solutions**:

1. **Check File Location**:
   ```bash
   # Images must be in static/images/
   # ❌ Wrong: images/logo.png
   # ✅ Correct: static/images/logo.png
   ```

2. **Check File Names** (case-sensitive):
   ```bash
   # ❌ Wrong: Logo.PNG, LOGO.png
   # ✅ Correct: logo.png
   ```

3. **Check Image Size**:
   - GitHub has 25MB file limit
   - Recommended: Under 500KB per image
   - Compress large images before uploading

4. **Verify Image Paths in Templates**:
   ```html
   <!-- Should use .Site.BaseURL -->
   <img src="{{ .Site.BaseURL }}images/logo.png">
   ```

### Menu/Navigation Missing

**Symptoms**: Navigation links don't appear

**Solutions**:

1. **Check Language Configuration**:
   ```toml
   # hugo.toml - ensure languages are configured
   [languages]
     [languages.en]
       languageName = "English"
       weight = 1
   ```

2. **Check Content Files**:
   ```bash
   # Ensure these exist
   ls content/en/_index.md
   ls content/en/about.md
   ls content/en/instructors.md
   ```

3. **Check YAML Data**:
   ```bash
   # Navigation depends on these files
   ls data/en/dojo.yaml
   ls data/en/instructors.yaml
   ```

### Schedule Not Displaying

**Symptoms**: Schedule page is empty or missing

**Solutions**:

1. **Check Schedule Data**:
   ```yaml
   # data/en/schedule.yaml must have content
   schedule:
     - day: "Monday"
       time: "7:00 PM - 8:30 PM"
       type: "Adult Classes"
   ```

2. **Verify YAML Syntax**:
   - Use [YAML Lint](https://www.yamllint.com/) to validate
   - Check indentation (must use spaces, not tabs)

---

## Language Issues

### Language Switcher Not Working

**Symptoms**: Language links don't work or go to wrong pages

**Solutions**:

1. **Check Template Fix**:
   ```html
   <!-- layouts/partials/i18nlist.html should use -->
   <a href="{{ $.Site.BaseURL }}{{ if ne .Lang "en" }}{{ .Lang }}/{{ end }}">
   ```

2. **Verify Language Content**:
   ```bash
   # Both languages need content
   ls content/en/_index.md
   ls content/pt/_index.md
   ```

3. **Check Data Files**:
   ```bash
   # Both languages need data
   ls data/en/dojo.yaml
   ls data/pt/dojo.yaml
   ```

### Missing Portuguese Content

**Symptoms**: Portuguese pages are empty or show English content

**Solutions**:

1. **Create Portuguese Data**:
   ```bash
   # Copy and translate all files
   cp data/en/dojo.yaml data/pt/dojo.yaml
   # Edit data/pt/dojo.yaml with Portuguese content
   ```

2. **Check Portuguese Content**:
   ```bash
   # Ensure content files exist
   ls content/pt/_index.md
   ls content/pt/about.md
   ```

---

## Configuration Errors

### YAML Parsing Errors

**Symptoms**: Build fails with YAML error messages

**Common Issues & Fixes**:

1. **Indentation Problems**:
   ```yaml
   # ❌ Wrong (mixed spaces and tabs)
   schedule:
   	- day: "Monday"
     time: "7:00 PM"
   
   # ✅ Correct (consistent spaces)
   schedule:
     - day: "Monday"
       time: "7:00 PM"
   ```

2. **Special Characters**:
   ```yaml
   # ❌ Wrong (unquoted special characters)
   description: This has: colons and "quotes"
   
   # ✅ Correct (quoted strings)
   description: "This has: colons and \"quotes\""
   ```

3. **Multiline Text**:
   ```yaml
   # ❌ Wrong
   address: 123 Main Street
   City, State 12345
   
   # ✅ Correct
   address: |
     123 Main Street
     City, State 12345
   ```

### Hugo Configuration Issues

**Symptoms**: Site behavior is incorrect

**Solutions**:

1. **Check hugo.toml Syntax**:
   ```toml
   # Ensure proper TOML format
   baseURL = "https://yoursite.com/"
   languageCode = "en-us"
   title = "Your Dojo"
   ```

2. **Verify Theme Configuration**:
   ```toml
   theme = "ananke"
   ```

3. **Check Hugo Version**:
   ```bash
   hugo version
   # Should be 0.148.0 or newer
   ```

---

## Performance Issues

### Slow Loading Site

**Symptoms**: Website takes long time to load

**Solutions**:

1. **Optimize Images**:
   - Compress images using [TinyPNG](https://tinypng.com/)
   - Resize large images before uploading
   - Use appropriate formats (JPG for photos, PNG for logos)

2. **Check File Sizes**:
   ```bash
   # Large files to check
   ls -lh static/images/
   # Should be under 500KB each
   ```

3. **Enable Minification**:
   ```bash
   # Hugo automatically minifies in production
   hugo --gc --minify
   ```

### Browser Compatibility Issues

**Symptoms**: Site works in one browser but not others

**Solutions**:

1. **Clear Browser Cache**:
   - Chrome: Settings → Privacy → Clear browsing data
   - Firefox: Settings → Privacy → Clear Data
   - Safari: Safari → Clear History

2. **Check JavaScript Errors**:
   - Open browser Developer Tools (F12)
   - Look for red errors in Console tab

3. **Test Different Browsers**:
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers (iOS Safari, Android Chrome)

---

## Getting Help

### Self-Diagnostic Checklist

Before asking for help, try this checklist:

- [ ] Waited 5 minutes after pushing changes
- [ ] Cleared browser cache and hard refreshed
- [ ] Checked GitHub Actions for green checkmark
- [ ] Validated YAML files at yamllint.com
- [ ] Verified all required files exist
- [ ] Tested in different browser

### Gathering Information

When asking for help, provide:

1. **GitHub Repository URL**
2. **Live Site URL**
3. **Error Messages** (exact text)
4. **What You Changed** (recent commits)
5. **Screenshots** of problems

### Where to Get Help

1. **GitHub Issues**: Create issue in template repository
2. **IOGKF Community**: Ask other dojo webmasters
3. **Hugo Documentation**: [gohugo.io](https://gohugo.io/documentation/)
4. **GitHub Pages Help**: [docs.github.com](https://docs.github.com/en/pages)

### Emergency Reset

If everything is broken and you need to start over:

```bash
# 1. Backup your customizations
cp data/en/dojo.yaml ~/backup-dojo.yaml
cp static/images/ ~/backup-images/ -r

# 2. Reset to template state
git fetch origin
git reset --hard origin/main

# 3. Restore your customizations
cp ~/backup-dojo.yaml data/en/dojo.yaml
cp ~/backup-images/* static/images/

# 4. Commit and push
git add .
git commit -m "Restore after reset"
git push
```

---

## Prevention Tips

### Regular Maintenance

1. **Test Before Committing**:
   ```bash
   hugo server  # Test locally first
   ```

2. **Small Changes**: Make one change at a time

3. **Backup Configuration**: Keep copies of working YAML files

4. **Monitor Builds**: Check Actions tab after pushing changes

### Best Practices

1. **Use Descriptive Commit Messages**:
   ```bash
   # ❌ Wrong
   git commit -m "fix"
   
   # ✅ Better
   git commit -m "Fix schedule formatting in Portuguese version"
   ```

2. **Test YAML Before Committing**:
   - Use [YAML Lint](https://www.yamllint.com/)
   - Check indentation carefully

3. **Keep It Simple**: Don't modify template code unless necessary

---

**Remember**: Most issues are simple configuration problems. Work through this guide systematically, and you'll solve 90% of problems quickly.
