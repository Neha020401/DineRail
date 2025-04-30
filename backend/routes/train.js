// backend/routes/train.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { getLiveStatus } = require('../controllers/trainController');

router.get('/live-status', getLiveStatus);


// GET /api/train/list
router.get('/list', async (req, res) => {
    try {
      const response = await axios.get('https://irctc1.p.rapidapi.com/api/v1/trains', {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'irctc1.p.rapidapi.com',
        },
      });
  
      const trains = response.data.data;
  
      const simplified = trains.map(train => ({
        train_number: train.train_number,
        train_name: train.train_name,
        source: train.from_station_code,
        destination: train.to_station_code,
      }));
  
      res.json(simplified);
    } catch (error) {
      console.error('Error fetching train list:', error.message);
      res.status(500).json({ error: 'Failed to fetch train list' });
    }
  });
  

// router.get("/live-status", async (req, res) => {
//   const { train } = req.query;
//   const date = new Date();
//   const dd = String(date.getDate()).padStart(2, '0');
//   const mm = String(date.getMonth() + 1).padStart(2, '0');
//   const yyyy = date.getFullYear();
//   const fullDate = `${dd}-${mm}-${yyyy}`;

//   try {
//     const response = await axios.get("https://indianrailwayapi.p.rapidapi.com/liveTrainStatus", {
//       params: { trainNo: train, date: fullDate },
//       headers: {
//         "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
//         "X-RapidAPI-Host": "indianrailwayapi.p.rapidapi.com",
//       },
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch live status" });
//   }
// });

module.exports = router;
