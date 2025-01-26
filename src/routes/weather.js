const express = require('express');
require('dotenv').config();

const WeatherService = require("../services/weatherService");
const CacheService = require("../services/cacheService");

const { createClient } = require('redis');

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

const weatherService = new WeatherService(process.env.API_KEY, process.env.WEATHER_API_URL);
const cacheService  = new CacheService(client)
const router = express.Router();

router.post('/weather',  async (req, res, next) => {
	await cacheService.setup();
	const { city } = req.body;

	const cachedData = await cacheService.getValue(city); 
	let responseData;
	if( ! cachedData ) {
		responseData = await weatherService.getWeather(city);
		await cacheService.setValue(city, JSON.stringify(responseData))
		
	} else {
		responseData = JSON.parse(cachedData)
	}

	res.send(responseData);
});


module.exports = router