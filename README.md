# Helios Land - Real Estate Website

A comprehensive real estate platform built with Next.js, featuring property listings, inquiry management, and an admin panel for content management.

## Features

### User-Facing Features
- Property listings (Commercial, Residential, SCO Plots)
- Featured project showcase
- Contact forms with inquiry submission
- Responsive design with mobile support
- WhatsApp and phone integration
- Property details with external links

### Admin Panel Features
- Professional sidebar navigation
- Property management (Add, Edit, View)
- Inquiry management with status tracking
- Dashboard with statistics
- Supabase database integration
- Secure authentication

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Simple admin authentication
- **Icons**: Lucide React
- **Deployment**: Vercel ready

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account (optional, falls back to static data)

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Configure Supabase (Optional)**
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key from project settings
   - Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up database (if using Supabase)**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and run the contents of `supabase-schema.sql`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Main website: http://localhost:3000
   - Admin panel: http://localhost:3000/admin
   - Admin credentials: `admin` / `helios2024`

## Project Structure

```
├── components/
│   ├── admin/           # Admin panel components
│   ├── Layout.js        # Main layout wrapper
│   └── PropertySlider.js # Property carousel
├── data/
│   └── properties.js    # Static property data (fallback)
├── lib/
│   └── supabase.js      # Supabase client and services
├── pages/
│   ├── admin/           # Admin panel pages
│   ├── about.js         # About page
│   ├── commercial.js    # Commercial properties
│   ├── contact.js       # Contact form
│   ├── index.js         # Homepage
│   ├── residential.js   # Residential properties
│   └── sco-plots.js     # SCO plots page
├── public/
│   └── images/          # Static images
├── styles/
│   └── globals.css      # Global styles and Tailwind
├── supabase-schema.sql  # Database schema
└── .env.local.example   # Environment variables template
```

## Database Schema

The application uses two main tables:

### Properties Table
- `id` - Primary key
- `title` - Property title
- `slug` - URL-friendly identifier
- `location` - Property location
- `price` - Property price
- `type` - Property type (commercial/residential/sco)
- `image` - Property image URL
- `external_link` - Link to external property page
- `featured` - Boolean for featured properties
- Additional fields for specifications and descriptions

### Inquiries Table
- `id` - Primary key
- `name` - Customer name
- `phone` - Phone number
- `email` - Email address
- `property_type` - Type of property interested in
- `message` - Customer message
- `status` - Inquiry status (New/Contacted/Closed)

## Admin Panel Usage

### Accessing Admin Panel
1. Go to `/admin`
2. Login with credentials: `admin` / `helios2024`

### Managing Properties
1. **View Properties**: Click "Properties" in sidebar
2. **Add Property**: Click "Add Property" in sidebar
3. **Edit Property**: Click edit button in properties list
4. **Search/Filter**: Use search bar and filters

### Managing Inquiries
1. **View Inquiries**: Click "Inquiries" in sidebar
2. **Update Status**: Change status dropdown
3. **Contact Customer**: Use phone/email/WhatsApp links
4. **Search/Filter**: Find specific inquiries

## Configuration

### Brand Colors
- Primary Gold: `#FFD93D`
- Dark Blue: `#134686`
- Light Gray: `#F8F9FA`

### Contact Information
Update in `.env.local`:
- `NEXT_PUBLIC_PHONE`
- `NEXT_PUBLIC_WHATSAPP`
- `NEXT_PUBLIC_EMAIL`
- `NEXT_PUBLIC_BUSINESS_NAME`
- `NEXT_PUBLIC_OFFICE_ADDRESS`

## Deployment

### Vercel Deployment
1. Push to GitHub repository
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production
```
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_PHONE=+919811677423
NEXT_PUBLIC_WHATSAPP=919811677423
NEXT_PUBLIC_EMAIL=your_email@domain.com
NEXT_PUBLIC_BUSINESS_NAME=Your Business Name
NEXT_PUBLIC_OFFICE_ADDRESS=Your Office Address
```

## Features Without Supabase

The application works without Supabase configuration:
- Uses static data from `data/properties.js`
- Contact forms show confirmation messages
- Admin panel shows sample data
- All UI functionality remains intact

## Support

For issues or questions:
- Check the console for error messages
- Verify Supabase credentials if using database
- Ensure all environment variables are set correctly

## License

This project is built for Helios Land real estate business.