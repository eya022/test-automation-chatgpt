// utils/api_helper.js
const axios = require('axios');

async function callService(url, method = 'GET', data = {}) {
  try {
    const response = await axios({
      url,
      method,
      data
    });
    console.log(`Response from ${url}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error calling ${url}:`, error.message);
    throw error;
  }
}

module.exports = { callService };
