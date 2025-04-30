// pages/api/stations/suggestions.js
import axios from 'axios';

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const response = await axios.get('https://indianrailways.p.rapidapi.com/findstations.php', {
      params: { station: query },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'indianrailways.p.rapidapi.com',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching station suggestions' });
  }
}
