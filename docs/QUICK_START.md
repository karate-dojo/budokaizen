# Dojo Owner's Quick Start Guide

**Goal**: Get your dojo website live in 15 minutes with minimal technical knowledge.

This guide is for dojo owners who want the simplest possible setup - one language (English), default pages, and just your dojo's basic information. No programming knowledge required!

## 🎯 What You'll Achieve

- A professional website for your dojo
- Contact information for potential students
- Instructor profiles with ranks
- Class schedule display
- Free hosting on GitHub Pages

## ⏱️ Time Required

- **5 minutes**: Setup and deployment
- **10 minutes**: Customizing your dojo information

## 📋 Before You Start

You'll need:
- [ ] A computer with internet access
- [ ] Your dojo's basic information (name, address, phone, email)
- [ ] List of instructors with their ranks
- [ ] Class schedule
- [ ] A GitHub account (free - create at [github.com](https://github.com))

## 🚀 Step 1: Create Your Website (2 minutes)

1. **Go to the template**: https://github.com/karate-dojo/IOGKF_website_template

2. **Click "Use this template"** → **"Create a new repository"**

3. **Name your repository**: 
   - Repository name: `your-dojo-name-website` (example: `sakura-dojo-website`)
   - Make sure it's **Public**
   - Click **"Create repository"**

## 🌐 Step 2: Enable Website Hosting (1 minute)

1. **In your new repository**, go to **Settings** (top menu)

2. **Click "Pages"** in the left sidebar

3. **Under "Source"**, select **"GitHub Actions"**

4. **Done!** Your website will be live at: `https://yourusername.github.io/your-repository-name`

*Note: It takes 2-3 minutes for the site to become available*

## ✏️ Step 3: Customize Your Dojo Information (12 minutes)

Now you'll edit simple text files to add your dojo's information. No technical knowledge needed!

### 3.1 Basic Dojo Information (3 minutes)

1. **Navigate to**: `data/en/dojo.yaml`
2. **Click the pencil icon** (✏️) to edit
3. **Replace the sample information** with your dojo's details:

```yaml
# Your dojo's name (appears on homepage)
dojo_name: "YOUR DOJO NAME HERE"

# Full address for contact page
address: |
  Your Street Address
  City, State/Province Postal Code
  Country

# Contact information
email: "your-email@domain.com"
phone: "Your phone number"

# Optional: Description (appears on homepage)
description: "Welcome to our traditional Goju-Ryu Karate dojo, proudly affiliated with the International Okinawan Goju-Ryu Karate-do Federation (IOGKF)."
```

4. **Scroll down** and click **"Commit changes"**
5. **Click "Commit changes"** again (keep default message)

### 3.2 Add Your Instructors (4 minutes)

1. **Navigate to**: `data/en/instructors.yaml`
2. **Click the pencil icon** (✏️) to edit
3. **Replace the sample instructors** with your instructors:

```yaml
instructors:
  - name: "Chief Instructor Name"
    dan: "7th Dan"
    title: "Chief Instructor"
    bio: "Brief biography of your chief instructor"
  
  - name: "Assistant Instructor Name"
    dan: "3rd Dan"
    title: "Assistant Instructor"
    bio: "Brief biography of your assistant instructor"
```

**Tips:**
- Add as many instructors as you have
- Remove instructors you don't need
- Keep the exact spacing (2 spaces for indentation)

4. **Commit changes** (same as step 3.1)

### 3.3 Update Your Class Schedule (3 minutes)

1. **Navigate to**: `data/en/schedule.yaml`
2. **Click the pencil icon** (✏️) to edit
3. **Replace with your actual schedule**:

```yaml
classes:
  - day: "Monday"
    time: "19:00 - 20:30"
    type: "Adult Beginner"
    
  - day: "Wednesday"
    time: "19:00 - 20:30"
    type: "Adult Advanced"
    
  - day: "Saturday"
    time: "10:00 - 11:30"
    type: "Youth Class"
```

4. **Commit changes**

### 3.4 Add Social Media (Optional - 2 minutes)

1. **Navigate to**: `data/social.yaml`
2. **Click the pencil icon** (✏️) to edit
3. **Add your social media links** (enable/disable as needed):

```yaml
social_media:
  facebook:
    url: "https://www.facebook.com/yourdojo"
    username: "@yourdojo"
    display_name: "Your Dojo Name"
    enabled: true
    
  instagram:
    url: "https://www.instagram.com/yourdojo"
    username: "@yourdojo"
    display_name: "Your Dojo"
    enabled: true
    
  # Set enabled: false to hide platforms you don't use
  twitter:
    enabled: false
```
# youtube: "https://youtube.com/yourdojo"
# twitter: "https://twitter.com/yourdojo"
```

4. **Commit changes**

## 🎉 Step 4: Check Your Website

1. **Wait 2-3 minutes** for changes to deploy
2. **Visit your website**: `https://yourusername.github.io/your-repository-name`
3. **Check that everything looks correct**

## 📋 Quick Verification Checklist

Visit your website and verify:
- [ ] Your dojo name appears on the homepage
- [ ] Contact information is correct
- [ ] Instructors are listed properly
- [ ] Class schedule shows your times
- [ ] Social media links work (if added)

## 🔧 Common Quick Fixes

### Problem: "Site not found" or shows template content
**Solution**: Wait 5 minutes and try again. GitHub takes time to deploy changes.

### Problem: Information not updated
**Solution**: 
1. Check you edited files in `data/en/` folder
2. Make sure you clicked "Commit changes"
3. Wait 2-3 minutes for deployment

### Problem: Website looks broken
**Solution**: Check YAML formatting:
- Keep exact spacing (2 spaces for indentation)
- Don't use tabs
- Make sure quotes match: `"text here"`

## 🖼️ Adding Your Logo (Optional)

1. **Prepare your logo**:
   - PNG format preferred
   - Recommended size: 300x120 pixels
   - Transparent background looks best

2. **Upload your logo**:
   - Navigate to `static/images/`
   - Click "Add file" → "Upload files"
   - Drag your logo file (must be named `logo.png`)
   - Click "Commit changes"

## 📞 Need Help?

- **Template Issues**: [Report here](https://github.com/karate-dojo/IOGKF_website_template/issues)
- **YAML Formatting**: Use [YAML Validator](https://yamlvalidator.com/) to check your files
- **General Questions**: Consult with your dojo instructor or IOGKF representative

## 🎯 What's Next?

Your basic website is now live! Optional enhancements:

1. **Add instructor photos**: See [Images Guide](IMAGES.md)
2. **Customize colors**: See [Customization Guide](CUSTOMIZATION.md)
3. **Add more languages**: See [Language Configuration](LANGUAGE_CONFIGURATION.md)
4. **Custom domain**: See [Deployment Guide](DEPLOYMENT.md)

## ✅ Success!

Congratulations! Your dojo now has a professional website that:
- Works on all devices (mobile, tablet, desktop)
- Loads fast and is secure
- Costs nothing to host
- Can be updated anytime by editing the YAML files

Share your website URL with students and the community!

---

**🥋 Remember**: This is an independent open-source template created to help IOGKF dojos maintain professional websites while preserving the traditional values of Goju-Ryu Karate.
