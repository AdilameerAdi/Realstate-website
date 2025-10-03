# Next.js Real Estate Website - Complete Project Guide

## 🎯 Project Overview
Modern Next.js/React real estate website for SCO Plots and properties in Gurugram, featuring responsive design, property sliders, and seamless property management. Based on reference: **https://www.scoplots.co.in**

## 📋 Phase 1: Project Setup & Planning

### Key Requirements
- Individual property pages with galleries, details, and amenities
- Global header/footer with Helios Land branding
- Contact widgets (tap-to-call, WhatsApp) on all pages
- Full mobile/tablet/desktop responsiveness
- Property sliders matching reference website
- SEO optimization with Next.js features
- Deployment to Vercel/Netlify

### Client Contact Information
- **Phone**: +91 98116 77423
- **Email**: deepak@heliosland.in
- **Office Address**: HELIOS LAND SCO-70, 3RD FLOOR M3M MARKET-84 SECTOR-84, GURGAON. GURUGRAM-122004
- **Business Name**: SCO Plots by Helios Land
- **Reference Website**: https://www.scoplots.co.in

### Technical Stack
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **Database**: MongoDB/PostgreSQL (or JSON for demo)
- **State Management**: Zustand/Context API
- **Image Optimization**: Next.js Image
- **Deployment**: Vercel/Netlify
- **Analytics**: Google Analytics 4

### Route Structure
```
/                           # Homepage
/about                      # About page
/properties                 # All properties
/residential-projects       # Residential properties
/commercial-projects        # Commercial properties
/new-upcoming-projects      # New & upcoming projects
/properties/[slug]          # Individual property pages
/contact                    # Contact page
/privacy-policy            # Privacy policy
/terms-conditions          # Terms & conditions
/disclaimer                # Disclaimer page
```

## 🎨 Phase 2: Design System

### Brand Colors
```javascript
// tailwind.config.js colors
colors: {
  'brand-gold': '#FFD93D',        // Primary gold
  'brand-dark-blue': '#134686',   // Primary dark blue
  'brand-white': '#FFFFFF',       // Background
  'text-primary': '#2C3E50',
  'text-secondary': '#7F8C8D',
  'border-light': '#E5E5E5',
}
```

### Typography
- **Logo Font**: From business logo (custom)
- **Body Font**: Inter (Google Fonts via next/font)
- **Headings**: Bold, dark blue (#134686)
- **Body Text**: Regular, text-primary

## 🏗️ Phase 3: Header Implementation

### Header Structure
```typescript
// components/layout/Header.tsx
- Logo (Top Left) - Links to homepage
- Contact Buttons (Right Side):
  - Call Button (Dark Blue #134686)
  - WhatsApp Button (Gold #FFD93D)
- Navigation Menu (Right Side):
  - Home
  - Residential Projects
  - Commercial Projects
  - New & Upcoming Projects
  - Contact Us
  - Phone at bottom: +91 98116 77423
```

### Logo Implementation
- Complete logo image positioned top left
- Proper sizing and responsive scaling
- Clickable, links to homepage
- White background

## 🏠 Phase 4: Homepage Components

### Hero Banner
- **Banner Image**: https://blog.ipleaders.in/real-estate-sector-re-development-india-analysis
- Full width responsive
- Overlay text if needed

### Property Sliders (Same as reference website)

#### 1. New & Upcoming Projects Slider
Properties with links to detail pages:
- **Birla Estate Sec-71** → https://birlanewlaunch-gurgaon.com/sector-71/
- **SS Camasa** → https://www.ssgroup-india.com/projects/homes/ss-camasa
- **SS GROUP 83 ICONIC PROJECT** → https://www.ssgroup-india.com/projects/homes/ss-cendana
- **SS Group** → https://www.ssgroup-india.com/
- **Whiteland Residences Sec-103** → https://whitelandwestinresidencessector103.info/

#### 2. Commercial Properties Slider
Properties with links:
- **BESTECH SCO-88A** → https://www.scoplots.co.in/signature-global-sco-88a/
- **M3M MARKET-84** → https://www.scoplots.co.in/m3m-market-84/
- **MICROTECH-81** → Contact for details
- **VATIKA INDIA NEXT-82A** → https://www.scoplots.co.in/vatika-crossover/
- **DLF SECTOR-84** → https://www.scoplots.co.in/dlf-sco-plots
- **EBD SECTOR-99** → https://www.scoplots.co.in/emaar-ebd-89/

#### 3. Residential Properties Slider
Properties with links:
- **WHITELAND WESTIN RESIDENCES-103** → https://yhataw.in/whiteland-westin-residences-sector-103-gurugram/
- **KRISUMI WATERFALL-36** → https://krisumi.com/project/waterfall-residences/
- **KRISUMI WATERSIDE-36** → https://krisumi.com/project/waterside-residences/
- **BIRLA ESTATES-71** → https://birlanewlaunch-gurgaon.com/sector-71/
- **VATIKA Sovereign Next** → https://www.vatikacollections.com/homes-future-ready/gurgaon/sovereign-park/

### SCO (SHOP CUM OFFICE) PLOTS Section
```
Content:
Helios Land presents a prime investment in one of India's most robust real estate markets:
Shop-Cum-Office (SCO) Plots in Gurugram.

Driven by accelerated urbanization and its status as a hub for over 500 Fortune companies,
Gurugram offers a fertile ground for commercial asset appreciation. This unique SCO concept,
approved under the Haryana Government's New Commercial Plotted Colony Policy, allows for
the development of independent, multi-story commercial properties (B+G+4).

Key Investment Highlights:
• Asset Class: Plotted commercial development with 100% land ownership.
• High Demand: Caters to the modern, integrated lifestyle of working, shopping, and dining.
• Location Advantage: Positioned in Gurugram's designated growth corridors.
• Versatile Revenue Streams: Ideal for high-street retail, corporate offices, and F&B outlets.

As specialists in SCO and residential properties, Helios Land provides access to the most
lucrative plots with exclusive offers. Connect with us to explore this unparalleled investment opportunity.
```

## 📍 Phase 5: Property Data

### Commercial Properties Extended List
```javascript
const commercialProperties = [
  { name: "EMMAR-EBD Sec-83", link: "https://www.scoplots.co.in/emaar-ebd-83/" },
  { name: "EMMAR-EBD Sec-114", link: "https://www.scoplots.co.in/emaar-ebd-114/" },
  { name: "EMMAR-EBD Sec-89", link: "https://www.scoplots.co.in/emaar-ebd-89/" },
  { name: "DLF SCO Plots", link: "https://www.scoplots.co.in/dlf-sco-plots" },
  { name: "Bestech Central Boulevard", link: "https://www.scoplots.co.in/bestech-central-boulevard/" },
  { name: "Vatika Crossover", link: "https://www.scoplots.co.in/vatika-crossover/" },
  { name: "M3M-114", link: "https://www.scoplots.co.in/m3m-114-market/" },
  { name: "M3M-84", link: "https://www.scoplots.co.in/m3m-market-84/" },
  { name: "Wall Street-73", link: "https://www.scoplots.co.in/wal-street-73/" },
  { name: "Signature Global", link: "https://www.scoplots.co.in/signature-global-sco-88a/" }
];
```

### Residential Properties Extended List
```javascript
const residentialProperties = [
  { name: "BPTP", link: "https://www.bptp.com/official" },
  { name: "Vatika Sovereign Park", link: "https://www.vatikacollections.com/homes-future-ready/gurgaon/sovereign-park/" },
  { name: "Whiteland Westin Residences-103", link: "https://yhataw.in/whiteland-westin-residences-sector-103-gurugram/" },
  { name: "Krisumi Waterside Residences", link: "https://krisumi.com/project/waterside-residences/" },
  { name: "SS Camasa", link: "https://www.ssgroup-india.com/projects/homes/ss-camasa" },
  { name: "Krisumi Waterfall-36", link: "https://krisumi.com/project/waterfall-residences/" },
  { name: "SS GROUP-CENDANA", link: "https://www.ssgroup-india.com/projects/homes/ss-cendana" },
  { name: "M3M-ANTALYA HILLS", link: "https://m3mgurgaon.co.in/m3m-antalya-hills/" },
  { name: "M3M GOLF HILLS", link: "https://m3mgurgaon.co.in/m3m-golf-hills/" },
  { name: "GODREJ-ZENITH", link: "https://godrejsector89gurgaon.com/godrej-zenith" },
  { name: "M3M-SOULITUDE", link: "https://www.m3mproperties.com/residential/gurugram/m3m-soulitude-sector-89/" },
  { name: "SMART WORLD GEMS", link: "https://smartworlddevelopers.com/projects/gems" },
  { name: "DLF PRIVANA", link: "https://www.dlfhomes.co.in/dlf-privana-south-sector-77-gurgaon/" }
];
```

### SS GROUP 83 ICONIC PROJECT Details
```
🏢 Standalone Iconic Tower (1.5 Acre)
✨ Stilt + 42 Floors with Double-Heighted Lobby & Exclusive Amenities & Clubhouse
🚪 3 Apartments To a Core | 4 High-Speed Lifts
🏠 Fully Loaded Apartments – Modular Kitchen & Wardrobes included
👨‍👩‍👧‍👦 Only 126 Exclusive Families in one tower
📏 Sizes Available: 3 BHK + 3T – ~1800 sq. ft.
💰 EOI PRICE : ₹2.70 Cr (All Inclusive) + GST
🛎 Be Among The First 50 Buyer To Enjoy Exclusive Pricing & Priority Selection
📑 Payment Plan: PLP - Lucrative Payment Plan
📍 A Perfect Blend of Luxury, Exclusivity & Comfort – Designed for living!
```

## 🦶 Phase 6: Footer Implementation

### Footer Structure
```typescript
// components/layout/Footer.tsx

1. Top Section:
   - "SCO Plots by Helios Land" (Center, using logo font style)

2. Middle Section (Center):
   - WhatsApp Button (Gold #FFD93D)
   - Call Button (Dark Blue #134686)

3. Bottom Section:
   - Left: Disclaimer | Privacy Policy | Contact Us (links)
   - Right: Phone (+91 98116 77423) | Email (deepak@heliosland.in)
```

## 📄 Phase 7: About Us Page

### About Content
```
Every great vision deserves the perfect foundation. At Helios Land, our purpose is to
secure it for you. As Gurugram's premier real estate advisors, we specialize in connecting
discerning investors, businesses, and families with high-potential SCO (Shop-Cum-Office)
and Residential Plots in the city's most strategic locations.

Our expertise is born from foresight—recognizing the incredible power of the
government-approved SCO model and Gurugram's global ascent. This allows us to guide
you not just to a property, but to a prosperous future.

With a deep passion for client success, the team at Helios Land is your trusted
partner in turning ambition into reality.
```

**Note**: Highlight "Helios Land" with stylish font or gold color (#FFD93D)

### Contact Details on About Page
- **Phone**: +91 98116 77423 (clickable)
- **Email**: deepak@heliosland.in (clickable)
- **Office**: HELIOS LAND SCO-70, 3RD FLOOR M3M MARKET-84 SECTOR-84, GURGAON. GURUGRAM-122004

## 🔧 Phase 8: Component Implementation

### PropertySlider Component
```typescript
// components/property/PropertySlider.tsx
interface PropertySliderProps {
  title: string;
  properties: Array<{
    name: string;
    link: string;
    image?: string;
    details?: string;
  }>;
}

export default function PropertySlider({ title, properties }: PropertySliderProps) {
  // Implement slider matching reference website design
  // Include navigation arrows
  // Responsive breakpoints
  // Link each property to its detail page
}
```

### ContactButtons Component
```typescript
// components/ui/ContactButtons.tsx
export default function ContactButtons() {
  const phoneNumber = "+919811677423";
  const whatsappNumber = "919811677423";

  return (
    <div className="flex gap-3">
      <a
        href={`tel:${phoneNumber}`}
        className="px-4 py-2 bg-[#134686] text-white rounded-lg hover:opacity-90"
      >
        Call Now
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        className="px-4 py-2 bg-[#FFD93D] text-[#134686] rounded-lg hover:opacity-90"
      >
        WhatsApp
      </a>
    </div>
  );
}
```

## 🚀 Phase 9: Next.js Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PHONE=+919811677423
NEXT_PUBLIC_WHATSAPP=919811677423
NEXT_PUBLIC_EMAIL=deepak@heliosland.in
NEXT_PUBLIC_BUSINESS_NAME=SCO Plots by Helios Land
NEXT_PUBLIC_OFFICE_ADDRESS=HELIOS LAND SCO-70, 3RD FLOOR M3M MARKET-84 SECTOR-84, GURGAON. GURUGRAM-122004
```

### Package.json Dependencies
```json
{
  "dependencies": {
    "next": "14.1.0",
    "react": "^18",
    "react-dom": "^18",
    "tailwindcss": "^3.4.0",
    "swiper": "^11.0.5",
    "lucide-react": "^0.300.0",
    "framer-motion": "^10.16.0",
    "@next/font": "^14.1.0"
  }
}
```

## 📱 Phase 10: Responsive Design

### Mobile Optimization
- Sticky contact bar at bottom
- Hamburger menu for navigation
- Touch-friendly sliders
- Optimized images for mobile
- Readable font sizes

### Tablet & Desktop
- Full navigation menu
- Side-by-side layouts
- Hover effects on cards
- Full-size property images

## 🔍 Phase 11: SEO & Performance

### SEO Implementation
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'SCO Plots by Helios Land - Premium Real Estate in Gurugram',
  description: 'Discover prime SCO plots and residential properties in Gurugram with Helios Land',
  keywords: 'SCO plots, Gurugram real estate, commercial property, residential plots, Helios Land',
  openGraph: {
    title: 'SCO Plots by Helios Land',
    description: 'Premier real estate advisor in Gurugram',
    images: ['/og-image.jpg'],
  },
}
```

### Performance Optimizations
- Lazy loading for property images
- Next.js Image optimization
- Static generation for property pages
- Efficient slider implementation
- Minified CSS/JS

## ✅ Phase 12: Testing Checklist

### Frontend Testing
- [ ] Logo displays properly and links to home
- [ ] Header navigation works on all devices
- [ ] Call and WhatsApp buttons functional
- [ ] All property sliders work smoothly
- [ ] Property links redirect correctly
- [ ] Footer layout matches design
- [ ] Contact information clickable
- [ ] White background throughout

### Design Validation
- [ ] Dark blue (#134686) used correctly
- [ ] Gold (#FFD93D) used correctly
- [ ] Font consistency maintained
- [ ] Responsive on all devices
- [ ] Matches reference website layout

### Content Validation
- [ ] All property names correct
- [ ] Links to external sites work
- [ ] Phone number displays correctly
- [ ] Email address clickable
- [ ] Office address formatted properly

## 🚀 Phase 13: Deployment

### Build & Deploy
```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Deploy to Vercel
vercel --prod
```

### Post-Deployment
- Test all external links
- Verify contact buttons work
- Check slider performance
- Monitor page load speed
- Set up analytics tracking

## 📋 Quick Reference

### Key Colors
- **Dark Blue**: #134686
- **Gold**: #FFD93D
- **White Background**: #FFFFFF

### Contact Info
- **Phone**: +91 98116 77423
- **Email**: deepak@heliosland.in
- **WhatsApp**: 919811677423

### Important Links
- **Reference Site**: https://www.scoplots.co.in
- **Office**: SCO-70, 3RD FLOOR M3M MARKET-84 SECTOR-84, GURUGRAM-122004

## 🎉 Project Summary

The Next.js real estate website for Helios Land includes:
- ✅ Modern React/Next.js architecture
- ✅ Responsive property sliders
- ✅ Dark blue (#134686) and gold (#FFD93D) color scheme
- ✅ White background throughout
- ✅ Complete property listings with external links
- ✅ Contact integration (Call & WhatsApp)
- ✅ SEO optimized
- ✅ Mobile responsive
- ✅ Based on reference website design

**Business**: SCO Plots by Helios Land
**Focus**: SCO Plots and Premium Real Estate in Gurugram

---

**Quick Start:**
```bash
cd nextjs-realestate
npm install
npm run dev
# Open http://localhost:3000
```