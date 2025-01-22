const express = require('express')
const getWeather = require("../services/weatherApi")
const router = express.Router();

router.post('/weather',  async (req, res, next) => {
	const { city } = req.body;
	
	const cityWeather = await getWeather(city);
	
	res.send(cityWeather);
})


module.exports = router