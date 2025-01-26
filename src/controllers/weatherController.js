const cacheService = require('../services/cacheService'); // Adjust path as needed
const weatherService = require('../services/weatherService'); // Adjust path as needed

// Controller for weather endpoint
async function getWeatherData(req, res, next) {
    try {
        const { city } = req.body;

        if (!city) {
            return res.status(400).json({ error: "City is required" });
        }

        // Check cache
        const cachedData = await cacheService.getValue(city);

        let responseData;
        if (!cachedData) {
            // Fetch from weather service if not cached
            responseData = await weatherService.getWeather(city);
            await cacheService.setValue(city, JSON.stringify(responseData));
        } else {
            // Use cached data
            responseData = JSON.parse(cachedData);
        }

        res.json(responseData);
    } catch (error) {
        next(error);
    }
}


module.exports = { getWeatherData };
