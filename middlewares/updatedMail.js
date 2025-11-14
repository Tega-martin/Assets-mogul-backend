const axios = require('axios');
require('dotenv').config();

const sendEmail = async (options) => {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    
    if (!apiKey) {
      throw new Error('Brevo API key is missing. Check your .env file.');
    }


    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: process.env.FROM_NAMEE || 'Asset Mogul',
          email: process.env.SENDER_EMAIL || 'info@assetsmogulpro.com',
        },
        to: [
          {
            email: options.email,
            
          },
        ],
        subject: options.subject,
        htmlContent: options.html,
        tags: ['app-email'],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
      }
    );
    

    console.log('✅ Email sent via Brevo:', response.data.messageId || response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error sending email via Brevo:', error.message);
    throw error;
  }
};

module.exports = sendEmail;

