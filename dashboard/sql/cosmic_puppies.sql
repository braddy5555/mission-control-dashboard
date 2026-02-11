-- COSMIC PUPPIES DATABASE SCHEMA
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads table
CREATE TABLE IF NOT EXISTS cosmic_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source VARCHAR(255),
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  company VARCHAR(255),
  status VARCHAR(50) DEFAULT 'new',
  qualified BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE cosmic_leads ENABLE ROW LEVEL SECURITY;

-- Orders/Revenue table
CREATE TABLE IF NOT EXISTS cosmic_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES cosmic_leads(id),
  amount DECIMAL(10,2),
  status VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE cosmic_orders ENABLE ROW LEVEL SECURITY;

-- Website traffic metrics
CREATE TABLE IF NOT EXISTS cosmic_traffic (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitors INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE cosmic_traffic ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed)
CREATE POLICY "Allow public read access" ON cosmic_leads FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON cosmic_orders FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON cosmic_traffic FOR SELECT USING (true);

-- Create indexes
CREATE INDEX idx_cosmic_leads_status ON cosmic_leads(status);
CREATE INDEX idx_cosmic_leads_created ON cosmic_leads(created_at);
CREATE INDEX idx_cosmic_orders_date ON cosmic_orders(created_at);
CREATE INDEX idx_cosmic_traffic_date ON cosmic_traffic(date);

-- Insert sample data (remove in production)
INSERT INTO cosmic_leads (source, name, email, company, status, qualified) VALUES
  ('linkedin', 'John Doe', 'john@example.com', 'ABC Corp', 'qualified', true),
  ('website', 'Jane Smith', 'jane@example.com', 'XYZ Inc', 'new', false),
  ('referral', 'Bob Johnson', 'bob@example.com', '123 LLC', 'contacted', true);

INSERT INTO cosmic_traffic (visitors, page_views, date) VALUES
  (84, 156, CURRENT_DATE),
  (120, 240, CURRENT_DATE - INTERVAL '1 day');