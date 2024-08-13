const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Replace with actual Truecaller API details
const TRUECALLER_API_URL = 'https://api.truecaller.com/v1/lookup';
const TRUECALLER_API_KEY = 'your_truecaller_api_key'; // Replace with your actual API key

app.post('/track-location', async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  try {
    const response = await axios.get(`${TRUECALLER_API_URL}?phone=${phoneNumber}`, {
      headers: {
        'Authorization': `Bearer ${TRUECALLER_API_KEY}`
      }
    });

    // Extract necessary information from Truecaller API response
    const locationData = {
      name: response.data.name,
      carrier: response.data.carrier,
      countryCode: response.data.countryCode
    };

    res.json(locationData);
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).send('Failed to fetch location');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
