-- AI PERSONAS DATABASE SCHEMA
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Personas table
CREATE TABLE IF NOT EXISTS ai_personas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  handle VARCHAR(100),
  platform VARCHAR(50),
  bio TEXT,
  avatar_url TEXT,
  follower_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE ai_personas ENABLE ROW LEVEL SECURITY;

-- Social media posts
CREATE TABLE IF NOT EXISTS ai_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  persona_id UUID REFERENCES ai_personas(id),
  platform VARCHAR(50) NOT NULL,
  content TEXT,
  caption TEXT,
  image_url TEXT,
  video_url TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  post_url TEXT,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE ai_posts ENABLE ROW LEVEL SECURITY;

-- Platform analytics (daily snapshots)
CREATE TABLE IF NOT EXISTS ai_platform_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  persona_id UUID REFERENCES ai_personas(id),
  platform VARCHAR(50),
  followers INTEGER DEFAULT 0,
  following INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  date DATE DEFAULT CURRENT_DATE
);

ALTER TABLE ai_platform_stats ENABLE ROW LEVEL SECURITY;

-- Content themes/templates
CREATE TABLE IF NOT EXISTS ai_content_themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  persona_id UUID REFERENCES ai_personas(id),
  theme VARCHAR(100),
  prompt_template TEXT,
  usage_count INTEGER DEFAULT 0
);

ALTER TABLE ai_content_themes ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON ai_personas FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON ai_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON ai_platform_stats FOR SELECT USING (true);

-- Indexes
CREATE INDEX idx_ai_posts_persona ON ai_posts(persona_id);
CREATE INDEX idx_ai_posts_platform ON ai_posts(platform);
CREATE INDEX idx_ai_posts_date ON ai_posts(posted_at);
CREATE INDEX idx_ai_platform_stats_date ON ai_platform_stats(date);

-- Sample data for Emma
INSERT INTO ai_personas (name, handle, platform, bio, follower_count, status) VALUES
  ('Emma', 'emma.cosmic.pup', 'instagram', 'Coffee lover & puppy enthusiast ☕🐕 Living my best life!', 156, 'active'),
  ('Emma', 'emma.cosmic.pup', 'tiktok', 'Coffee lover & puppy enthusiast ☕🐕 Living my best life!', 89, 'active');

INSERT INTO ai_posts (persona_id, platform, content, caption, likes, posted_at) VALUES
  ((SELECT id FROM ai_personas WHERE handle = 'emma.cosmic.pup' LIMIT 1), 
   'instagram', 
   'Coffee first, adulting later ☕✨ Who else needs caffeine?', 
   'Coffee first, adulting later ☕✨ Who else needs caffeine? #coffee #morningvibes',
   23,
   '2026-02-10T21:16:01Z');