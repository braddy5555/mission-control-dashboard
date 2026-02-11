-- TRIBES SUPABASE PROJECT
-- Create new project at https://app.supabase.com
-- Name it: "tribes-community"

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- COMMUNITIES/TRIBES
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  category VARCHAR(100),
  member_count INTEGER DEFAULT 0,
  max_members INTEGER,
  is_private BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'active',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON communities FOR SELECT USING (true);

-- MEMBERS
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  user_id VARCHAR(255),
  email VARCHAR(255),
  username VARCHAR(100),
  role VARCHAR(50) DEFAULT 'member',
  status VARCHAR(50) DEFAULT 'active',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON members FOR SELECT USING (true);

-- SUBSCRIPTIONS/REVENUE
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id),
  member_id UUID REFERENCES members(id),
  tier VARCHAR(50) DEFAULT 'free',
  amount DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'EUR',
  status VARCHAR(50) DEFAULT 'active',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON subscriptions FOR SELECT USING (true);

-- ENGAGEMENT/ACTIVITY
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id),
  member_id UUID REFERENCES members(id),
  action VARCHAR(100),
  entity_type VARCHAR(50),
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON activities FOR SELECT USING (true);

-- CONTENT/POSTS
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id),
  member_id UUID REFERENCES members(id),
  title VARCHAR(500),
  content TEXT,
  type VARCHAR(50) DEFAULT 'text',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON posts FOR SELECT USING (true);

-- EVENTS
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  community_id UUID REFERENCES communities(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50),
  starts_at TIMESTAMP WITH TIME ZONE,
  ends_at TIMESTAMP WITH TIME ZONE,
  max_attendees INTEGER,
  attendee_count INTEGER DEFAULT 0,
  is_online BOOLEAN DEFAULT true,
  meeting_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON events FOR SELECT USING (true);

-- INDEXES
CREATE INDEX idx_communities_status ON communities(status);
CREATE INDEX idx_communities_category ON communities(category);
CREATE INDEX idx_members_community ON members(community_id);
CREATE INDEX idx_members_role ON members(role);
CREATE INDEX idx_activities_community ON activities(community_id);
CREATE INDEX idx_activities_created ON activities(created_at);
CREATE INDEX idx_posts_community ON posts(community_id);
CREATE INDEX idx_posts_created ON posts(created_at);
CREATE INDEX idx_subscriptions_community ON subscriptions(community_id);

-- FUNCTIONS
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_communities_updated_at
  BEFORE UPDATE ON communities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- SAMPLE DATA
INSERT INTO communities (name, slug, description, category, member_count, status) VALUES
  ('AI Builders', 'ai-builders', 'Community for AI developers and enthusiasts', 'technology', 156, 'active'),
  ('Crypto Traders NL', 'crypto-traders-nl', 'Dutch crypto trading community', 'finance', 89, 'active'),
  ('SaaS Founders', 'saas-founders', 'Building profitable software businesses', 'business', 97, 'active');

INSERT INTO members (community_id, user_id, email, username, role, status) VALUES
  ((SELECT id FROM communities WHERE slug = 'ai-builders'), 'user1', 'admin@aibuilders.com', 'admin', 'admin', 'active'),
  ((SELECT id FROM communities WHERE slug = 'ai-builders'), 'user2', 'member1@aibuilders.com', 'member1', 'member', 'active'),
  ((SELECT id FROM communities WHERE slug = 'crypto-traders-nl'), 'user3', 'admin@crypto.nl', 'admin', 'admin', 'active');

INSERT INTO subscriptions (community_id, member_id, tier, amount, status) VALUES
  ((SELECT id FROM communities WHERE slug = 'ai-builders'), (SELECT id FROM members WHERE username = 'admin'), 'premium', 29.99, 'active'),
  ((SELECT id FROM communities WHERE slug = 'ai-builders'), (SELECT id FROM members WHERE username = 'member1'), 'free', 0, 'active');

-- VIEWS
CREATE VIEW community_stats AS
SELECT 
  c.id,
  c.name,
  c.slug,
  c.member_count,
  COUNT(DISTINCT m.id) FILTER (WHERE m.role = 'admin') as admin_count,
  COUNT(DISTINCT s.id) FILTER (WHERE s.tier != 'free' AND s.status = 'active') as paying_members,
  COALESCE(SUM(s.amount) FILTER (WHERE s.status = 'active'), 0) as monthly_revenue
FROM communities c
LEFT JOIN members m ON m.community_id = c.id
LEFT JOIN subscriptions s ON s.community_id = c.id
GROUP BY c.id, c.name, c.slug, c.member_count;

-- ENABLE REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE communities;
ALTER PUBLICATION supabase_realtime ADD TABLE members;
ALTER PUBLICATION supabase_realtime ADD TABLE activities;
ALTER PUBLICATION supabase_realtime ADD TABLE posts;