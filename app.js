import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS
app.set('view engine', 'ejs');

//configure css
app.use(express.static('public'));

// Homepage
app.get('/', (req, res) => {
    const systemInfo = {
        application: 'AWS DevOps Monitoring',
        environment: process.env.NODE_ENV,
        status: 'Operational',
        runtime: process.version,
        uptime: process.uptime().toFixed(2),
        timestamp: new Date().toISOString()
    };

    res.render('dashboard', {
        title: systemInfo.application,
        environment: systemInfo.environment,
        systemInfo
    });
});

//metrics
app.get('/api/metrics', (req, res) => {
    res.json({
        application: 'AWS DevOps Monitoring',
        status: 'Running',
        environment: process.env.NODE_ENV || 'development',
        runtime: process.version,
        uptime: process.uptime().toFixed(2),
        timestamp: new Date().toISOString()
    });
});


//the health endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        service: 'aws-devops-monitoring',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});