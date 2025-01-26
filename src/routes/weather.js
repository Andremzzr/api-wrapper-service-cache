const express = require('express');
const router = express.Router();
const { initializeCache } = require("../middleware/cacheMiddleware")
const { getWeatherData } = require("../controllers/weatherController");


router.post('/weather', initializeCache, getWeatherData );


module.exports = router