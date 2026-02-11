-- DASHBOARD DATABASE SCHEMA
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Daily metrics snapshot (aggregated from all projects)
CREATE TABLE IF NOT EXISTS dashboard_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project VARCHAR(100) NOT NULL,
  metric_name VARCHAR(100) NOT NULL,
  metric_value DECIMAL(15,2),
  metric_type VARCHAR(50) DEFAULT 'count',
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE dashboard_metrics ENABLE ROW LEVEL SECURITY;

-- System health logs
CREATE TABLE IF NOT EXISTS dashboard_system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  container_name VARCHAR(255),
  container_id VARCHAR(100),
  status VARCHAR(50),
  cpu_percent DECIMAL(5,2),
  memory_usage BIGINT,
  error_count INTEGER DEFAULT 0,
  error_message TEXT,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE dashboard_system_logs ENABLE ROW LEVEL SECURITY;

-- API usage tracking
CREATE TABLE IF NOT EXISTS dashboard_api_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  endpoint VARCHAR(255),
  method VARCHAR(10),
  status_code INTEGER,
  response_time_ms INTEGER,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE dashboard_api_usage ENABLE ROW LEVEL SECURITY;

-- Alerts/Notifications
CREATE TABLE IF NOT EXISTS dashboard_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  severity VARCHAR(20) DEFAULT 'info',
  title VARCHAR(255),
  message TEXT,
  project VARCHAR(100),
  acknowledged BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE dashboard_alerts ENABLE ROW LEVEL SECURITY;

-- Revenue aggregation
CREATE TABLE IF NOT EXISTS dashboard_revenue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project VARCHAR(100),
  amount DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'EUR',
  source VARCHAR(100),
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE dashboard_revenue ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON dashboard_metrics FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON dashboard_system_logs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON dashboard_api_usage FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON dashboard_alerts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON dashboard_revenue FOR SELECT USING (true);

-- Indexes
CREATE INDEX idx_dashboard_metrics_project_date ON dashboard_metrics(project, date);
CREATE INDEX idx_dashboard_metrics_name ON dashboard_metrics(metric_name);
CREATE INDEX idx_dashboard_system_logs_container ON dashboard_system_logs(container_name);
CREATE INDEX idx_dashboard_system_logs_date ON dashboard_system_logs(logged_at);
CREATE INDEX idx_dashboard_revenue_date ON dashboard_revenue(date);

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE dashboard_metrics;
ALTER PUBLICATION supabase_realtime ADD TABLE dashboard_alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE dashboard_system_logs;