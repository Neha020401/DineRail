//backend/routes/trainRoutes
const express = require('express');
const router = express.Router();
const trainController = require('../controller/trainController');

router.post('/', trainController.searchTrains);
router.get('/:trainId/availability', trainController.getAvailability);
router.post('/add-trains', trainController.addMultipleTrains);
router.delete('/delete-train/:number', trainController.deleteTrainByNumber);
router.get('/:trainId', trainController.getTrainById);

module.exports = router;