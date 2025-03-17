const cron = require('node-cron');
const axios = require('axios');

const PING_URL = 'https://assets-mogul-backend.onrender.com';

// Cron job to ping the website every 10 minutes
cron.schedule('*/10 * * * *', async () => {
    console.log(`[${new Date().toISOString()}] Running cron job to keep website awake...`);

    try {
        const response = await axios.get(PING_URL);
        console.log(`[${new Date().toISOString()}] Website is awake. Status:`, response.status);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error pinging website:`, error.message);
        
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
});

// Export the cron job so we can require it in `server.js`
module.exports = cron;
