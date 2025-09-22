# TrueCare Hospitality & Facilities Pvt Ltd - Static Website

A modern, responsive website for TrueCare Hospitality & Facilities Pvt Ltd built with pure HTML, CSS, and JavaScript for direct deployment to GitHub Pages.

## 🌟 Features

- **Responsive Design** - Mobile-first approach that works on all devices
- **Modern UI/UX** - Professional hospitality industry design
- **Interactive Elements** - Smooth scrolling, animations, and hover effects
- **Contact Integration** - WhatsApp integration and contact forms
- **Photo Gallery** - Interactive gallery with modal lightbox
- **Booking System** - Complete booking inquiry form with validation
- **SEO Optimized** - Proper meta tags and semantic HTML

## 📁 Project Structure

```
truecare-hospitality-website/
├── index.html          # Main HTML file
├── style.css           # Complete CSS styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── images/             # Image assets folder
    ├── logo.png
    ├── hotel-exterior.jpg
    ├── deluxe-room.jpg
    ├── restaurant.jpg
    └── pool.jpg
```

## 🚀 Quick Deployment to GitHub Pages

### Option 1: Direct Upload (Easiest)

1. **Create a new repository on GitHub:**
   - Go to [github.com](https://github.com) and sign in
   - Click the "+" icon → "New repository"
   - Name it `truecare-hospitality-website`
   - Make it **Public**
   - Click "Create repository"

2. **Upload your files:**
   - Click "uploading an existing file"
   - Drag and drop all files (`index.html`, `style.css`, `script.js`)
   - Create `images/` folder and upload your images
   - Commit the files

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Select "Deploy from a branch"
   - Branch: Select "main" and "/ (root)"
   - Click Save

4. **Access your website:**
   - Your site will be live at: `https://yourusername.github.io/truecare-hospitality-website/`

### Option 2: Git Command Line

```bash
# Clone your repository
git clone https://github.com/yourusername/truecare-hospitality-website.git
cd truecare-hospitality-website

# Add your files
# Copy index.html, style.css, script.js to this directory
# Create images/ folder and add your images

# Commit and push
git add .
git commit -m "Initial website upload"
git push origin main

# Enable GitHub Pages from repository settings
```

## 📝 Customization Guide

### Update Company Information

**In `index.html`:**
- Replace `[Your Hotel Address]` with actual address
- Update phone numbers from `+91-XXXX-XXXXXX` to actual numbers
- Change `info@truecare-hospitality.com` to your email
- Update `www.truecare-hospitality.com` to your domain

**In `script.js`:**
- Update WhatsApp number: Change `'918700401489'` to your WhatsApp number
- Customize WhatsApp message as needed

### Add Your Images

Create an `images/` folder in your repository and add:
- `logo.png` - Your company logo
- `hotel-exterior.jpg` - Hotel exterior photo
- `deluxe-room.jpg` - Room interior photo
- `restaurant.jpg` - Restaurant/dining area
- `pool.jpg` - Swimming pool or facilities

**Image Requirements:**
- Format: JPG or PNG
- Recommended size: 1200x800px for gallery images
- Logo: 200x200px (PNG with transparent background)

### Customize Colors and Branding

In `style.css`, update the CSS variables:

```css
:root {
  --primary-color: #2c3e50;      /* Your brand primary color */
  --secondary-color: #3498db;    /* Your brand secondary color */
  --accent-color: #e74c3c;       /* Accent color for highlights */
  /* Add more custom colors as needed */
}
```

## 🎨 Design Features

- **Mobile Responsive** - Works perfectly on phones, tablets, and desktops
- **Smooth Scrolling** - Navigation with smooth scroll to sections
- **Interactive Gallery** - Click images to view in fullscreen modal
- **Form Validation** - Client-side validation with visual feedback
- **Loading States** - Button loading animations during form submission
- **WhatsApp Integration** - Direct WhatsApp chat functionality
- **Professional Typography** - Clean, modern font hierarchy

## 📱 Sections Included

1. **Header** - Sticky navigation with mobile hamburger menu
2. **Hero** - Welcome section with call-to-action buttons
3. **About** - Company information and statistics
4. **Facilities** - Services and amenities showcase
5. **Gallery** - Interactive photo gallery
6. **Booking** - Complete booking inquiry form
7. **Location** - Address and map placeholder
8. **Contact** - Multiple contact methods and contact form
9. **Footer** - Company info and links

## ⚙️ Technical Details

- **Pure HTML/CSS/JS** - No frameworks or dependencies
- **Modern CSS** - CSS Grid, Flexbox, Custom Properties
- **ES6 JavaScript** - Modern JavaScript with proper event handling
- **SEO Friendly** - Proper meta tags and semantic HTML
- **Performance Optimized** - Minimal code, optimized images
- **Accessibility** - ARIA labels and keyboard navigation support

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- **Lightweight** - Fast loading with minimal HTTP requests
- **Mobile Optimized** - Touch-friendly interface
- **SEO Ready** - Proper meta tags and structured content

## 🤝 Support

For technical support or customization:
- Email: wetruecare@gmail.com
- Phone: +91-8700401489

## 📄 License

This project is licensed under the MIT License. Feel free to modify and use for your business needs.

---

## 🚀 Live Demo

Once deployed to GitHub Pages, your website will be accessible at:
`https://yourusername.github.io/truecare-hospitality-website/`

**Built with ❤️ for TrueCare Hospitality & Facilities Pvt Ltd**