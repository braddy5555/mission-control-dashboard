#!/usr/bin/env python3
"""
Deploy Supabase schemas using direct HTTP API with service_role JWT
No CLI needed - uses REST API to execute SQL
"""

import urllib.request
import urllib.error
import json
import ssl

# Service Role JWTs (bypasses RLS, full admin access)
COSMIC_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY2FscGxoZHp2dWlvYmx0Y3F1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDgxOTI1NSwiZXhwIjoyMDg2Mzk1MjU1fQ.bgqWahnUDi61EuR2RL1bGsFsIdOap1kVcGcr4d24acI"
TRIBES_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNocmlpZXh5c2xseGx2am5jd29sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDgwOTkwOCwiZXhwIjoyMDg2Mzg1OTA4fQ.aboU7btfC9uXOc0AlkwcpkQLI9zKYlaTyv0gVA2-YpU"

COSMIC_URL = "https://mocalplhdzvuiobltcqu.supabase.co"
TRIBES_URL = "https://shriiexysllxlvjncwol.supabase.co"

# SQL for Cosmic Puppies
COSMIC_SQL = """
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  industry TEXT,
  status TEXT DEFAULT 'new',
  qualified BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON leads;
CREATE POLICY "Allow public read" ON leads FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert" ON leads;
CREATE POLICY "Allow public insert" ON leads FOR INSERT WITH CHECK (true);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  order_number TEXT UNIQUE,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending',
  products JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON orders;
CREATE POLICY "Allow public read" ON orders FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS traffic (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitors INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  bounce_rate NUMERIC(5,2),
  source TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE traffic ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON traffic;
CREATE POLICY "Allow public read" ON traffic FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT,
  inventory_count INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON products;
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);

INSERT INTO leads (source, name, email, company, status, qualified, score) VALUES
  ('linkedin', 'John Doe', 'john@dropship.com', 'Dropship Pro', 'qualified', true, 85),
  ('website', 'Jane Smith', 'jane@shopify.com', 'Shopify Store', 'new', false, 45),
  ('referral', 'Bob Johnson', 'bob@ecom.com', 'Ecom Masters', 'contacted', true, 72)
ON CONFLICT DO NOTHING;

INSERT INTO traffic (visitors, page_views, unique_visitors, bounce_rate, date) VALUES
  (156, 312, 134, 42.5, CURRENT_DATE),
  (203, 456, 189, 38.2, CURRENT_DATE - INTERVAL '1 day')
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, category, inventory_count) VALUES
  ('Puppy Starter Pack', 'Everything for your new puppy', 49.99, 'essentials', 100),
  ('Cosmic Dog Bed', 'Memory foam bed with galaxy design', 89.99, 'beds', 50)
ON CONFLICT DO NOTHING;

ALTER PUBLICATION supabase_realtime ADD TABLE leads;
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE traffic;
"""

# SQL for Tribes
TRIBES_SQL = """
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  category TEXT,
  member_count INTEGER DEFAULT 0,
  max_members INTEGER,
  is_private BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON communities;
CREATE POLICY "Allow public read" ON communities FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  user_id TEXT,
  email TEXT,
  username TEXT,
  role TEXT DEFAULT 'member',
  status TEXT DEFAULT 'active',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON members;
CREATE POLICY "Allow public read" ON members FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id),
  member_id UUID REFERENCES members(id),
  tier TEXT DEFAULT 'free',
  amount NUMERIC,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'active',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON subscriptions;
CREATE POLICY "Allow public read" ON subscriptions FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id),
  member_id UUID REFERENCES members(id),
  action TEXT,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON activities;
CREATE POLICY "Allow public read" ON activities FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id),
  member_id UUID REFERENCES members(id),
  title TEXT,
  content TEXT,
  type TEXT DEFAULT 'text',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON posts;
CREATE POLICY "Allow public read" ON posts FOR SELECT USING (true);

INSERT INTO communities (name, slug, description, category, member_count, status) VALUES
  ('AI Builders', 'ai-builders', 'Community for AI developers', 'technology', 156, 'active'),
  ('Crypto Traders NL', 'crypto-traders-nl', 'Dutch crypto trading community', 'finance', 89, 'active')
ON CONFLICT (slug) DO NOTHING;

ALTER PUBLICATION supabase_realtime ADD TABLE communities;
ALTER PUBLICATION supabase_realtime ADD TABLE members;
ALTER PUBLICATION supabase_realtime ADD TABLE activities;
ALTER PUBLICATION supabase_realtime ADD TABLE posts;
"""

def execute_sql_via_rpc(url, jwt, sql):
    """Try to execute SQL via RPC if exec_sql function exists"""
    data = json.dumps({"query": sql}).encode()
    
    req = urllib.request.Request(
        f"{url}/rest/v1/rpc/exec_sql",
        data=data,
        headers={
            'apikey': jwt,
            'Authorization': f'Bearer {jwt}',
            'Content-Type': 'application/json'
        }
    )
    
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return {"success": True, "status": resp.status}
    except urllib.error.HTTPError as e:
        error = json.loads(e.read().decode())
        return {"error": error.get('message', str(error)), "code": error.get('code')}

def check_table_exists(url, jwt, table):
    """Check if table exists"""
    req = urllib.request.Request(
        f"{url}/rest/v1/{table}?select=*&limit=1",
        headers={
            'apikey': jwt,
            'Authorization': f'Bearer {jwt}'
        }
    )
    
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return True
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return False
        return True

def deploy_database(name, url, jwt, sql):
    """Deploy schema to database"""
    print(f"\n{'='*60}")
    print(f"🚀 Deploying {name}")
    print(f"{'='*60}")
    
    # Check if tables already exist
    test_table = "leads" if "leads" in sql else "communities"
    if check_table_exists(url, jwt, test_table):
        print(f"✓ Tables already exist in {name}")
        return True
    
    # Try RPC method
    print(f"  Attempting SQL execution...")
    result = execute_sql_via_rpc(url, jwt, sql)
    
    if result.get("success"):
        print(f"✓ {name} schema deployed successfully!")
        return True
    else:
        print(f"✗ Failed: {result.get('error', 'Unknown error')}")
        print(f"  Code: {result.get('code', 'N/A')}")
        return False

def main():
    print("="*60)
    print("SUPABASE DIRECT DEPLOYMENT")
    print("="*60)
    
    cosmic_ok = deploy_database("COSMIC PUPPIES", COSMIC_URL, COSMIC_JWT, COSMIC_SQL)
    tribes_ok = deploy_database("TRIBES COMMUNITY", TRIBES_URL, TRIBES_JWT, TRIBES_SQL)
    
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    print(f"Cosmic Puppies: {'✅ OK' if cosmic_ok else '❌ FAILED'}")
    print(f"Tribes Community: {'✅ OK' if tribes_ok else '❌ FAILED'}")
    
    if not cosmic_ok or not tribes_ok:
        print("\n⚠️  SQL execution requires the SQL Editor.")
        print("   Alternative: Use Supabase Management API with proper auth")

if __name__ == '__main__':
    main()
