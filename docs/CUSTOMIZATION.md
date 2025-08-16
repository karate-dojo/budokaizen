# Customization Guide

Advanced customization options for your IOGKF dojo website. This guide covers styling, layout modifications, and advanced features.

## Overview

While the template works great out-of-the-box, you can customize it to match your dojo's unique identity. This guide covers safe customization methods that won't break during template updates.

## Customization Levels

### 🟢 Safe Customizations
- Content and data configuration
- Color scheme modifications
- Font selections
- Adding custom CSS

### 🟡 Moderate Customizations  
- Layout adjustments
- Adding new content types
- Custom shortcodes

### 🔴 Advanced Customizations
- Template modifications
- New page types
- JavaScript additions

---

## CSS Customization

### Adding Custom CSS

Create a custom CSS file that won't be overwritten:

1. **Create Custom CSS File**:
   ```bash
   mkdir -p assets/css/
   touch assets/css/custom.css
   ```

2. **Add Your Styles**:
   ```css
   /* assets/css/custom.css */
   
   /* Custom dojo colors */
   :root {
     --primary-color: #8B0000;      /* Dark red */
     --secondary-color: #FFD700;    /* Gold */
     --accent-color: #2F4F4F;       /* Dark slate gray */
   }
   
   /* Override header background */
   .site-header {
     background-color: var(--primary-color);
   }
   
   /* Custom button styling */
   .btn-primary {
     background-color: var(--secondary-color);
     color: var(--primary-color);
     border: none;
   }
   
   /* Dojo-specific styling */
   .instructor-card {
     border-left: 4px solid var(--secondary-color);
   }
   ```

3. **Include in Templates**:
   ```html
   <!-- layouts/partials/head-additions.html -->
   {{ $customCSS := resources.Get "css/custom.css" }}
   {{ if $customCSS }}
     {{ $customCSS := $customCSS | resources.Minify }}
     <link rel="stylesheet" href="{{ $customCSS.RelPermalink }}">
   {{ end }}
   ```

### Color Schemes

#### Traditional Dojo Colors
```css
/* Traditional red and gold */
:root {
  --primary: #8B0000;    /* Deep red */
  --secondary: #FFD700;  /* Gold */
  --text: #2C2C2C;       /* Dark gray */
  --background: #FFFFFF; /* White */
}
```

#### Modern Minimalist
```css
/* Clean and modern */
:root {
  --primary: #1E293B;    /* Slate gray */
  --secondary: #3B82F6;  /* Blue */
  --text: #374151;       /* Gray */
  --background: #F8FAFC; /* Light gray */
}
```

#### Ocean/Okinawan Theme
```css
/* Inspired by Okinawan waters */
:root {
  --primary: #1E40AF;    /* Ocean blue */
  --secondary: #F59E0B;  /* Sunset orange */
  --text: #1F2937;       /* Dark */
  --background: #F0F9FF; /* Very light blue */
}
```

### Typography Customization

```css
/* Custom fonts */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&display=swap');

/* Apply to headers */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 700;
}

/* Body text */
body {
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 300;
}

/* Japanese/martial arts styling */
.dojo-name {
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

---

## Layout Modifications

### Adding Custom Sections

#### 1. Philosophy Section
```html
<!-- layouts/partials/philosophy.html -->
<section class="philosophy-section py-5">
  <div class="container">
    <div class="row">
      <div class="col-md-8 mx-auto text-center">
        <h2>{{ i18n "philosophy_title" }}</h2>
        <blockquote class="blockquote">
          <p>{{ i18n "philosophy_quote" }}</p>
          <footer class="blockquote-footer">
            {{ i18n "philosophy_author" }}
          </footer>
        </blockquote>
      </div>
    </div>
  </div>
</section>
```

#### 2. Include in Homepage
```html
<!-- layouts/index.html -->
<!-- Add after hero section -->
{{ partial "philosophy.html" . }}
```

#### 3. Add Translations
```yaml
# i18n/en.yaml
philosophy_title: "Our Philosophy"
philosophy_quote: "The ultimate aim of karate lies not in victory nor defeat, but in the perfection of the character of its participants."
philosophy_author: "Gichin Funakoshi"
```

### Custom Page Layouts

#### Event Page Layout
```html
<!-- layouts/events/single.html -->
{{ define "main" }}
<article class="event-detail">
  <header class="event-header">
    <h1>{{ .Title }}</h1>
    <div class="event-meta">
      <time datetime="{{ .Date }}">{{ .Date.Format "January 2, 2006" }}</time>
      {{ if .Params.location }}
        <span class="location">{{ .Params.location }}</span>
      {{ end }}
    </div>
  </header>
  
  <div class="event-content">
    {{ .Content }}
  </div>
  
  {{ if .Params.registration_link }}
    <div class="event-registration">
      <a href="{{ .Params.registration_link }}" class="btn btn-primary">
        {{ i18n "register_now" }}
      </a>
    </div>
  {{ end }}
</article>
{{ end }}
```

---

## Advanced Features

### Photo Gallery

#### 1. Create Gallery Structure
```bash
mkdir -p content/en/gallery
mkdir -p static/images/gallery
```

#### 2. Gallery Page Template
```html
<!-- layouts/gallery/list.html -->
{{ define "main" }}
<div class="gallery-container">
  <h1>{{ .Title }}</h1>
  
  <div class="photo-grid">
    {{ range .Site.Data.gallery }}
      <div class="photo-item">
        <img src="{{ .Site.BaseURL }}images/gallery/{{ .image }}" 
             alt="{{ .caption }}" 
             loading="lazy">
        <div class="photo-caption">{{ .caption }}</div>
      </div>
    {{ end }}
  </div>
</div>
{{ end }}
```

#### 3. Gallery Data
```yaml
# data/en/gallery.yaml
photos:
  - image: "dojo-entrance.jpg"
    caption: "Main entrance to our dojo"
  - image: "training-session.jpg"
    caption: "Students practicing kata"
  - image: "belt-ceremony.jpg"
    caption: "Recent promotion ceremony"
```

#### 4. Gallery CSS
```css
/* Photo gallery styling */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.photo-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.photo-item:hover {
  transform: translateY(-5px);
}

.photo-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.photo-caption {
  padding: 1rem;
  background: white;
  font-size: 0.9rem;
  color: #666;
}
```

### Newsletter Signup

#### 1. Contact Form Integration
```html
<!-- layouts/partials/newsletter.html -->
<section class="newsletter-signup">
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <h3>{{ i18n "newsletter_title" }}</h3>
        <p>{{ i18n "newsletter_description" }}</p>
        
        <!-- Netlify Forms (if using Netlify) -->
        <form name="newsletter" method="POST" data-netlify="true">
          <div class="input-group">
            <input type="email" 
                   name="email" 
                   class="form-control" 
                   placeholder="{{ i18n "email_placeholder" }}"
                   required>
            <button type="submit" class="btn btn-primary">
              {{ i18n "subscribe" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
```

### Events Calendar

#### 1. Events Data Structure
```yaml
# data/en/events.yaml
events:
  - title: "Black Belt Testing"
    date: "2024-03-15"
    time: "10:00 AM"
    location: "Main Dojo"
    description: "Quarterly black belt examination"
    type: "testing"
    
  - title: "Seminar with Sensei Yamamoto"
    date: "2024-04-20"
    time: "2:00 PM - 5:00 PM"
    location: "Main Dojo"
    description: "Special weapons seminar"
    type: "seminar"
    registration_required: true
```

#### 2. Events Display
```html
<!-- layouts/partials/upcoming-events.html -->
<section class="upcoming-events">
  <h2>{{ i18n "upcoming_events" }}</h2>
  
  {{ $events := sort .Site.Data.en.events.events "date" }}
  {{ $now := now }}
  
  <div class="events-list">
    {{ range first 3 (where $events "date" ">" $now) }}
      <div class="event-card">
        <div class="event-date">
          <span class="month">{{ dateFormat "Jan" .date }}</span>
          <span class="day">{{ dateFormat "2" .date }}</span>
        </div>
        <div class="event-details">
          <h4>{{ .title }}</h4>
          <p class="event-time">{{ .time }}</p>
          <p class="event-location">{{ .location }}</p>
          {{ if .registration_required }}
            <span class="badge badge-warning">Registration Required</span>
          {{ end }}
        </div>
      </div>
    {{ end }}
  </div>
</section>
```

---

## Advanced Styling

### Animation Effects

```css
/* Smooth animations */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects */
.instructor-card {
  transition: all 0.3s ease;
}

.instructor-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

/* Loading animations */
.loading-spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### Responsive Design

```css
/* Mobile-first responsive design */

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .instructor-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .instructor-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .hero-section {
    min-height: 70vh;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .container-custom {
    max-width: 1140px;
  }
}
```

---

## JavaScript Enhancements

### Image Lightbox

```html
<!-- layouts/partials/lightbox.html -->
<script>
// Simple lightbox for gallery images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.gallery img');
  
  images.forEach(img => {
    img.addEventListener('click', function() {
      createLightbox(this.src, this.alt);
    });
  });
  
  function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="${src}" alt="${alt}">
        <button class="lightbox-close">&times;</button>
      </div>
    `;
    
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox || e.target.className === 'lightbox-close') {
        document.body.removeChild(lightbox);
      }
    });
  }
});
</script>

<style>
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.lightbox img {
  width: 100%;
  height: auto;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}
</style>
```

### Smooth Scrolling Navigation

```javascript
// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
```

---

## Best Practices

### Safe Customization Guidelines

1. **Use Custom Files**: Don't modify theme files directly
2. **CSS Override**: Use CSS specificity to override theme styles
3. **Backup First**: Always backup working configurations
4. **Test Locally**: Use `hugo server` to test changes
5. **Document Changes**: Keep notes on customizations

### Performance Considerations

1. **Optimize Images**: Compress and resize before adding
2. **Minimize CSS**: Use Hugo's minification features
3. **Lazy Loading**: Implement for images below the fold
4. **Critical CSS**: Inline critical styles for faster loading

### Maintenance Tips

1. **Version Control**: Track all customizations with Git
2. **Documentation**: Document custom code for future reference
3. **Regular Testing**: Test after Hugo or theme updates
4. **Mobile Testing**: Always test responsive design

---

## Getting Help

### Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### Community Support

- IOGKF Webmaster Network
- Hugo Community Forums
- GitHub Issues (for template-specific questions)

---

**Remember**: Start with small customizations and build up gradually. The goal is to enhance your dojo's unique identity while maintaining the template's functionality and ease of maintenance.
