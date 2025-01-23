const express = require('express');
const WeatherService = require("../services/weatherService");
require('dotenv').config();

const weatherService = new WeatherService(process.env.API_KEY, process.env.WEATHER_API_URL)
const router = express.Router();

router.post('/weather',  async (req, res, next) => {
	const { city } = req.body;

	const cityWeather = await weatherService.getWeather(city);
	res.send(cityWeather);
})


module.exports = router