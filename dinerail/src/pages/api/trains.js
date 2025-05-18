// pages/api/trains.js
import axios from 'axios';

export default async function handler(req, res) {
    try {
      const response = await axios.get('https://irctc1.p.rapidapi.com/api/v1/trains', {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'irctc1.p.rapidapi.com',
        },
      });
  
      const trains = response.data.data;
      console.log(trains);
      
      const simplified = Array.isArray(trains) ? trains.map(train => ({
        train_number: train.train_number,
        train_name: train.train_name,
        source: train.from_station_code,
        destination: train.to_station_code,
      })) : [];
  
      res.status(200).json(simplified);
    } catch (error) {
      console.error('Error fetching train list:', error.message);
      res.status(500).json({ error: 'Failed to fetch train list' });
    }
  }