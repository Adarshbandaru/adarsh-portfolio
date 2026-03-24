# Bandaru Adarsh — Developer Portfolio

A stunning, modern personal portfolio website for **Bandaru Adarsh** — B.Tech CSE (AI & ML) student at Lovely Professional University.

## 🚀 Tech Stack

- **HTML5** — Semantic markup with SEO meta tags
- **CSS3** — Custom properties, glassmorphism, animations, dark/light mode
- **Vanilla JavaScript** — Particle canvas, typing effect, scroll animations, theme toggle

## ✨ Features

- 🌙 **Dark / Light Mode** with localStorage persistence
- ✍️ **Typing animation** cycling through roles
- 🎆 **Interactive particle canvas** background
- 📜 **Scroll reveal animations** with Intersection Observer
- 🖱️ **Mouse glow effect** on project cards
- 📊 **Count-up stats** animation
- 📱 **Fully responsive** — mobile, tablet, desktop
- 📬 **Contact form** with success feedback
- ♿ **Accessible** — ARIA labels, semantic HTML
- ⚡ **No build step needed** — open and go!
- 🔝 **Back-to-top button** with smooth scroll
- 📈 **Scroll progress bar** showing page scroll percentage
- ✨ **Enhanced animations** with parallax effects
- 🎯 **Keyboard navigation** support (Escape key)
- 🎨 **Improved mobile responsiveness** across all sections
- 🖌️ **Creative hover effects** with magnetic buttons
- 🌊 **Smooth scroll tracking** for active nav section

## 📂 Project Structure

```
portfolio/
├── index.html      # Main HTML (all sections)
├── styles.css      # Global styles, themes, animations
├── script.js       # All interactions & animations
└── README.md       # This file
```

## 🖥️ Running Locally

Simply open `index.html` in your browser — no server or build step required!

```bash
# Option A — Double click index.html in File Explorer

# Option B — Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

# Option C — Python quick server
python -m http.server 3000
# Then open: http://localhost:3000
```

## 🌐 Deploying to GitHub Pages

1. Push the repository to GitHub:
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/adarsh-bandaru/portfolio.git
git push -u origin main
```

2. Go to **GitHub → Settings → Pages**
3. Source: `main` branch, `/ (root)` folder
4. Click **Save** — your site will be live at `https://adarsh-bandaru.github.io/portfolio/`

## 🔼 Deploying to Vercel

### Via CLI
```bash
npm install -g vercel
vercel --prod
```

### Via Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Import Project"** → Import your GitHub repo
3. Framework Preset: **Other**
4. Leave all settings as default → **Deploy**
5. Your site is live in seconds!

### Via Netlify (alternative)
1. Drag & drop the `portfolio/` folder into [netlify.com/drop](https://app.netlify.com/drop)
2. Done — instant deploy with a shareable URL!

## 🎨 Customization

| File | What to change |
|------|---------------|
| `index.html` | Content, sections, links |
| `styles.css` | Colors (`:root` vars), fonts, spacing |
| `script.js` | Roles array, particle count, form endpoint |

### Changing Colors
Edit the CSS custom properties in `styles.css`:
```css
:root {
  --primary:       #7c3aed;   /* Main purple */
  --secondary:     #06b6d4;   /* Cyan accent */
  --accent:        #f59e0b;   /* Amber */
}
```

### Adding Real Contact Form
Replace the simulated form submission in `script.js` with Formspree:
```js
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
});
```

### Adding Your Resume
Replace the `resumeBtn` click handler in `script.js`:
```js
document.getElementById('resumeBtn').addEventListener('click', () => {
  window.open('your-resume.pdf', '_blank');
});
```
Or host the PDF in the `portfolio/` folder and link it in HTML directly:
```html
<a href="resume.pdf" download class="btn btn-outline">
```

## 📞 Contact

- **Email**: adarshbandaru05@gmail.com
- **GitHub**: [github.com/adarsh-bandaru](https://github.com/adarsh-bandaru)
- **LinkedIn**: [linkedin.com/in/adarsh-bandaru](https://linkedin.com/in/adarsh-bandaru)

---

© 2025 Bandaru Adarsh · Made with ❤️ and lots of ☕
