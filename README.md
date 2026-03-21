# Sevanjali Prathishtana — Official Website

A modern, responsive NGO website built with **Next.js 14**, **TailwindCSS**, and **Framer Motion**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
sevanjali-nextjs/
├── app/
│   ├── layout.tsx          # Root layout with Navbar + Footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles + Tailwind
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # SEO robots.txt
│   ├── about/page.tsx      # About page
│   ├── activities/page.tsx # Activities page
│   ├── events/page.tsx     # Events page
│   ├── gallery/page.tsx    # Gallery with lightbox
│   └── contact/page.tsx    # Contact + form + map
├── components/
│   ├── Navbar.tsx          # Sticky navbar + mobile menu
│   ├── Footer.tsx          # Full footer
│   ├── Hero.tsx            # Hero section with animations
│   ├── About.tsx           # About section
│   ├── Stats.tsx           # Animated impact counters
│   ├── Activities.tsx      # Activity cards
│   ├── Founder.tsx         # Founder profile
│   ├── Events.tsx          # Events / Ganeshotsava
│   └── CallToAction.tsx    # CTA banner
├── public/
│   └── images/
│       ├── hero/           # Hero banner image
│       ├── gallery/        # Gallery photos
│       ├── events/         # Event photos
│       ├── activities/     # Activity photos
│       └── images/         # Logo, founder photo
└── package.json
```

## 🎨 Design System

| Element     | Value              |
|-------------|-------------------|
| Primary     | `#ff7a18` (Saffron)|
| Secondary   | `#2e8b57` (Forest) |
| Font (body) | Inter              |
| Font (head) | Playfair Display   |

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

## 📧 Contact Form

The contact form currently simulates submission. To connect it to a real backend:
- **Formspree**: Replace the `handleSubmit` in `app/contact/page.tsx` with a POST to `https://formspree.io/f/YOUR_ID`
- **EmailJS**: Use the EmailJS SDK
- **Next.js API Route**: Create `app/api/contact/route.ts`

## 📍 Google Maps

Update the Google Maps embed URL in `app/contact/page.tsx` with the accurate coordinates for Farangipete.

---

© Sevanjali Prathishtana – Serving Humanity Since 1993
