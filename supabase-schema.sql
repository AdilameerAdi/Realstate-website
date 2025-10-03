-- Supabase Database Schema for Helios Land Real Estate

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  location VARCHAR(255) NOT NULL,
  price VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('commercial', 'residential', 'sco')),
  image TEXT DEFAULT '/images/placeholder.svg',
  external_link TEXT,
  featured BOOLEAN DEFAULT false,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area VARCHAR(100),
  description TEXT,
  specifications TEXT,
  special_offer VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  property_type VARCHAR(50),
  message TEXT,
  status VARCHAR(20) DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to properties
CREATE POLICY "Enable read access for all users" ON properties
  FOR SELECT USING (true);

-- Create policies for admin operations (using anon key for admin panel)
CREATE POLICY "Enable insert for anon users" ON properties
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for anon users" ON properties
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for anon users" ON properties
  FOR DELETE USING (true);

-- Create policies for inquiries
CREATE POLICY "Enable insert for all users" ON inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for anon users" ON inquiries
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for anon users" ON inquiries
  FOR DELETE USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating updated_at column
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert comprehensive sample data for admin testing
INSERT INTO properties (title, slug, location, price, type, image, external_link, featured, bedrooms, bathrooms, area, description, specifications, special_offer) VALUES
-- Featured SCO Projects
('M3M MARKET-84', 'm3m-market-84', 'Sector 84, Gurgaon', '₹2,25,00,000', 'sco', '/images/placeholder.svg', 'https://www.scoplots.co.in/m3m-market-84/', true, NULL, NULL, '70-127 SQYD', 'Premium SCO plots in M3M Market 84 with excellent connectivity and modern infrastructure.', 'Size Range: 70-127 SQYD, B+G+4+Terrace, Commercial Zone', 'Limited Time Offer - Book Now'),

('BIRLA ESTATE SEC-71', 'birla-estate-sec-71', 'Sector 71, Gurgaon', '₹2,70,00,000', 'sco', '/images/placeholder.svg', 'https://birlanewlaunch-gurgaon.com/sector-71/', true, NULL, NULL, '80-150 SQYD', 'Standalone Iconic Tower with premium facilities and world-class amenities.', 'Stilt + 42 Floors with Double-Heighted Lobby, Premium Location', 'Early Bird Discount Available'),

('BESTECH SCO-88A', 'bestech-sco-88a', 'Sector 88A, Gurgaon', '₹5,25,00,000', 'sco', '/images/placeholder.svg', 'https://www.scoplots.co.in/signature-global-sco-88a/', true, NULL, NULL, '100-200 SQYD', 'Premium commercial space in prime location with excellent connectivity.', 'High-end commercial development with modern amenities', NULL),

-- Commercial Properties
('WHITELAND WESTIN RESIDENCES-103', 'whiteland-westin-residences-103', 'Sector 103, Gurgaon', '₹1,85,00,000', 'commercial', '/images/placeholder.svg', 'https://yhataw.in/whiteland-westin-residences-sector-103-gurugram/', false, NULL, NULL, '2500-5000 sq ft', 'Premium commercial spaces with luxury amenities and modern infrastructure.', 'Grade A commercial space with 24/7 security', 'Special Launch Price'),

('DLF CYBER CITY PHASE-3', 'dlf-cyber-city-phase-3', 'Cyber City, Gurgaon', '₹3,50,00,000', 'commercial', '/images/placeholder.svg', 'https://example.com/dlf-cyber-city', false, NULL, NULL, '1500-3000 sq ft', 'World-class office spaces in the heart of Cyber City with premium facilities.', 'Premium office spaces with modern amenities', NULL),

('M3M URBANA BUSINESS PARK', 'm3m-urbana-business-park', 'Sector 67, Gurgaon', '₹2,75,00,000', 'commercial', '/images/placeholder.svg', 'https://example.com/m3m-urbana', false, NULL, NULL, '800-2000 sq ft', 'Modern business park with state-of-the-art facilities and excellent connectivity.', 'Business park with retail and office spaces', 'Flexible Payment Plans'),

-- Residential Properties
('KRISUMI WATERFALL-36', 'krisumi-waterfall-36', 'Sector 36, Gurgaon', '₹1,45,00,000', 'residential', '/images/placeholder.svg', 'https://krisumi.com/project/waterfall-residences/', false, 3, 3, '2800 sq ft', 'Luxury residential project with waterfall views and Japanese-inspired architecture.', '3 BHK premium apartments with modern amenities', 'Limited Period Offer'),

('GODREJ ARISTOCRAT', 'godrej-aristocrat', 'Sector 49, Gurgaon', '₹2,15,00,000', 'residential', '/images/placeholder.svg', 'https://example.com/godrej-aristocrat', false, 4, 4, '3200 sq ft', 'Ultra-luxury residential project with world-class amenities and premium location.', '4 BHK luxury apartments with club facilities', NULL),

('EMAAR PALM HILLS', 'emaar-palm-hills', 'Sector 77, Gurgaon', '₹1,95,00,000', 'residential', '/images/placeholder.svg', 'https://example.com/emaar-palm-hills', false, 3, 2, '2650 sq ft', 'Premium residential project with golf course views and luxury amenities.', '3 BHK apartments with golf course view', 'Festive Season Discount'),

('PARAS QUARTIER', 'paras-quartier', 'Sector 2, Gurgaon', '₹4,50,00,000', 'residential', '/images/placeholder.svg', 'https://example.com/paras-quartier', true, 4, 5, '4500 sq ft', 'Ultra-luxury condominium with iconic tower design and premium amenities.', '4 BHK ultra-luxury apartments with panoramic views', 'Exclusive Launch Offer');

-- Insert comprehensive sample inquiries for admin testing
INSERT INTO inquiries (name, phone, email, property_type, message, status) VALUES
('John Doe', '+91 9876543210', 'john.doe@example.com', 'sco', 'Interested in SCO plots in Sector 84. Please call me for more details. Looking for investment opportunity with good returns.', 'New'),
('Jane Smith', '+91 9876543211', 'jane.smith@example.com', 'commercial', 'Looking for office space in Cyber City area for my IT company. Need 2000-3000 sq ft space.', 'Contacted'),
('Raj Kumar', '+91 9876543212', 'raj.kumar@example.com', 'residential', 'Need 3 BHK apartment in Gurgaon for my family. Budget around 1.5-2 crores.', 'Closed'),
('Priya Sharma', '+91 9876543213', 'priya.sharma@example.com', 'sco', 'Want to invest in SCO plots. Please share best available options with payment plans.', 'New'),
('Amit Gupta', '+91 9876543214', 'amit.gupta@example.com', 'commercial', 'Looking for retail space for my restaurant business. Prefer ground floor location.', 'New'),
('Sunita Verma', '+91 9876543215', 'sunita.verma@example.com', 'residential', 'Searching for 4 BHK luxury apartment with modern amenities. Ready to buy immediately.', 'Contacted'),
('Vikash Singh', '+91 9876543216', 'vikash.singh@example.com', 'commercial', 'Need office space for my startup. Looking for flexible lease terms.', 'Contacted'),
('Neha Agarwal', '+91 9876543217', 'neha.agarwal@example.com', 'residential', 'Interested in luxury apartments with golf course view. Please share brochures.', 'New');

-- Enable realtime for admin dashboard (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE properties;
ALTER PUBLICATION supabase_realtime ADD TABLE inquiries;

-- Create storage bucket for property images (run this in Supabase dashboard if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);

-- Storage policies (uncomment if using Supabase storage)
-- CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
-- CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');

-- Grant necessary permissions for admin functionality
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Additional helper functions for admin panel
CREATE OR REPLACE FUNCTION get_property_stats()
RETURNS JSON AS $$
BEGIN
  RETURN json_build_object(
    'total', (SELECT COUNT(*) FROM properties),
    'commercial', (SELECT COUNT(*) FROM properties WHERE type = 'commercial'),
    'residential', (SELECT COUNT(*) FROM properties WHERE type = 'residential'),
    'sco', (SELECT COUNT(*) FROM properties WHERE type = 'sco'),
    'featured', (SELECT COUNT(*) FROM properties WHERE featured = true)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_inquiry_stats()
RETURNS JSON AS $$
BEGIN
  RETURN json_build_object(
    'total', (SELECT COUNT(*) FROM inquiries),
    'new', (SELECT COUNT(*) FROM inquiries WHERE status = 'New'),
    'contacted', (SELECT COUNT(*) FROM inquiries WHERE status = 'Contacted'),
    'closed', (SELECT COUNT(*) FROM inquiries WHERE status = 'Closed')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;