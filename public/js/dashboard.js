
async function updateDashboard() {
    const connectionDot = document.getElementById('connectionDot');
    const connectionText = document.getElementById('connectionText');

    try {
        const response = await fetch('/api/metrics', {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Unable to retrieve application metrics');
        }

        const data = await response.json();

        // Update dashboard metrics.
        document.getElementById('appStatus').textContent = data.status;
        document.getElementById('nodeRuntime').textContent = data.runtime;
        document.getElementById('appUptime').textContent =
            `${Number(data.uptime).toFixed(2)}s`;
        document.getElementById('appEnvironment').textContent =
            data.environment;

        // Update connection status.
        connectionDot.classList.add('connected');
        connectionText.textContent = 'Live connection';

        // Update the last refreshed time.
        document.getElementById('lastUpdated').textContent =
            new Date().toLocaleTimeString();

    } catch (error) {
        console.error('Dashboard update failed:', error);

        document.getElementById('appStatus').textContent = 'Unavailable';

        // Update connection status when the request fails.
        connectionDot.classList.remove('connected');
        connectionText.textContent = 'Connection unavailable';
    }
}

// Get the latest metrics when the page loads.
updateDashboard();

// Refresh metrics every 5 seconds.
setInterval(updateDashboard, 5000);
