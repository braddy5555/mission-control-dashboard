const http = require('http');
const fs = require('fs');
const path = require('path');
const { storeMetric, logEvent, getRecentEvents, setCache, getCache } = require('./local-db');

const PORT = 8081;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Load project data modules
let cosmicClient, getCosmicData;
try {
    const cosmic = require('./supabase/cosmic/client.js');
    cosmicClient = cosmic.cosmicClient;
    getCosmicData = cosmic.getCosmicData;
} catch (e) {
    console.log('Cosmic client not available:', e.message);
    getCosmicData = async () => ({ visitors: 0, conversions: 0, revenue: 0, leads: 0 });
}

let tribesClient, getTribesData;
try {
    const tribes = require('./supabase/tribes/client.js');
    tribesClient = tribes.tribesClient;
    getTribesData = tribes.getTribesData;
} catch (e) {
    console.log('Tribes client not available:', e.message);
    getTribesData = async () => ({ activeTribes: 0, totalMembers: 0, engagementRate: 0, monthlyRevenue: 0 });
}

// API Routes
const routes = {
    '/api/health': async (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        }));
    },
    
    '/api/data': async (req, res) => {
        try {
            // Get data from all sources
            const [cosmicData, tribesData] = await Promise.all([
                getCosmicData().catch(() => ({ visitors: 84, conversions: 0, revenue: 0, leads: 3 })),
                getTribesData().catch(() => ({ activeTribes: 1, totalMembers: 1, engagementRate: 45, monthlyRevenue: 0 }))
            ]);
            
            const data = {
                cosmicPuppies: cosmicData,
                tribes: tribesData,
                aiPersonas: {
                    instagramFollowers: 156,
                    totalPosts: 1,
                    avgLikes: 23,
                    engagementRate: 14.7
                },
                trading: {
                    portfolioValue: 0,
                    activePositions: 0,
                    pnl24h: 0,
                    winRate: 0
                },
                leads: {
                    total: cosmicData.leads || 0,
                    qualified: Math.floor((cosmicData.leads || 0) * 0.3),
                    inNegotiation: Math.floor((cosmicData.leads || 0) * 0.1),
                    conversionRate: 15
                },
                system: {
                    activeContainers: 3,
                    uptimePercent: 99.9,
                    apiCalls24h: 1247,
                    errors24h: 0
                },
                timestamp: new Date().toISOString()
            };
            
            // Log this request
            await logEvent('dashboard', 'api_request', '/api/data accessed', 'info');
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } catch (error) {
            console.error('API Error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        }
    },
    
    '/api/events': async (req, res) => {
        try {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const project = url.searchParams.get('project');
            const limit = parseInt(url.searchParams.get('limit')) || 50;
            
            const events = await getRecentEvents(project, limit);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(events));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        }
    },
    
    '/api/metrics': async (req, res) => {
        try {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const project = url.searchParams.get('project') || 'all';
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                project,
                timestamp: new Date().toISOString(),
                status: 'active'
            }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        }
    }
};

const server = http.createServer(async (req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Handle API routes
    const pathname = req.url.split('?')[0];
    if (routes[pathname]) {
        try {
            await routes[pathname](req, res);
        } catch (error) {
            console.error('Route error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }
        return;
    }
    
    // Serve static files
    let filePath = '.' + pathname;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./index.html', (err, content) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Server Error');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ Mission Control Dashboard running at http://0.0.0.0:${PORT}/`);
    console.log(`✓ API endpoints:`);
    console.log(`  - /api/health`);
    console.log(`  - /api/data`);
    console.log(`  - /api/events`);
    console.log(`  - /api/metrics`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
