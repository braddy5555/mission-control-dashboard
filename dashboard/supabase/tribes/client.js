// Tribes Supabase Client
const { createClient } = require('@supabase/supabase-js');

// Tribes Community Supabase Project
const TRIBES_URL = process.env.TRIBES_SUPABASE_URL || 'https://shriiexysllxlvjncwol.supabase.co';
const TRIBES_KEY = process.env.TRIBES_SUPABASE_KEY || 'sb_publishable_eF2FO6BTKf2QX3cDDxWYQQ_6LZGBI66';

const tribesClient = createClient(TRIBES_URL, TRIBES_KEY);

async function getTribesData() {
  try {
    // Get active communities
    const { data: communities, error: commError } = await tribesClient
      .from('communities')
      .select('*')
      .eq('status', 'active');
    
    if (commError) throw commError;

    // Get total members
    const { count: memberCount, error: memberError } = await tribesClient
      .from('members')
      .select('*', { count: 'exact', head: true });
    
    if (memberError) throw memberError;

    // Get monthly revenue
    const { data: subscriptions, error: subError } = await tribesClient
      .from('subscriptions')
      .select('amount')
      .eq('status', 'active');
    
    if (subError) throw subError;
    
    const monthlyRevenue = subscriptions?.reduce((sum, s) => sum + (s.amount || 0), 0) || 0;

    // Get recent activities for engagement calculation
    const { data: activities, error: actError } = await tribesClient
      .from('activities')
      .select('*')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
    
    if (actError) throw actError;

    // Calculate engagement rate (simplified)
    const engagementRate = memberCount > 0 
      ? Math.min(100, Math.round((activities?.length || 0) / memberCount * 100))
      : 0;

    return {
      activeTribes: communities?.length || 0,
      totalMembers: memberCount || 0,
      engagementRate: engagementRate,
      monthlyRevenue: monthlyRevenue,
      communities: communities || []
    };
  } catch (e) {
    console.error('Tribes DB error:', e.message);
    return getTribesDataLocal();
  }
}

function getTribesDataLocal() {
  return {
    activeTribes: 1,
    totalMembers: 1,
    engagementRate: 45,
    monthlyRevenue: 0,
    communities: []
  };
}

module.exports = { tribesClient, getTribesData };