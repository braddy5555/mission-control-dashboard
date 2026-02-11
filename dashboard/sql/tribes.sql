-- TRIBES DATABASE SCHEMA
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Communities/Tribes table
CREATE TABLE IF NOT EXISTS tribes_communities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  member_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE tribes_communities ENABLE ROW LEVEL SECURITY;

-- Members table
CREATE TABLE IF NOT EXISTS tribes_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES tribes_communities(id),
  email VARCHAR(255),
  role VARCHAR(50) DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE tribes_members ENABLE ROW LEVEL SECURITY;

-- Revenue table
CREATE TABLE IF NOT EXISTS tribes_revenue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES tribes_communities(id),
  amount DECIMAL(10,2) NOT NULL,
  type VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE tribes_revenue ENABLE ROW LEVEL SECURITY;

-- Activity/Engagement log
CREATE TABLE IF NOT EXISTS tribes_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES tribes_communities(id),
  member_id UUID REFERENCES tribes_members(id),
  action VARCHAR(100),
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE tribes_activity ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON tribes_communities FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON tribes_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON tribes_revenue FOR SELECT USING (true);

-- Indexes
CREATE INDEX idx_tribes_communities_status ON tribes_communities(status);
CREATE INDEX idx_tribes_members_community ON tribes_members(community_id);
CREATE INDEX idx_tribes_revenue_date ON tribes_revenue(created_at);

-- Sample data
INSERT INTO tribes_communities (name, description, member_count, status) VALUES
  ('AI Builders', 'Community for AI developers and enthusiasts', 156, 'active'),
  ('Crypto Traders', 'Trading signals and strategies', 89, 'active'),
  ('SaaS Founders', 'Building profitable software businesses', 97, 'active');