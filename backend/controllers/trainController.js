// backend/controllers/trainController.js
const axios = require('axios');

exports.getLiveStatus = async (req, res) => {
  const { train } = req.query;
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const date = `${dd}-${mm}-${yyyy}`;

  try {
    const response = await axios.get("https://indianrailwayapi.p.rapidapi.com/liveTrainStatus", {
      params: { trainNo: train, date },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "indianrailwayapi.p.rapidapi.com",
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch train status", details: err.message });
  }
};
