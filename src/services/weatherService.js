const axios = require("axios"); 
require('dotenv').config();

class WeatherService  {
    apiKey = undefined;
    baseUrl = undefined;
    
    constructor (apiKey, baseUrl)  {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async getWeather(city) {
        const url = `${this.baseUrl}${city}?unitGroup=metric&include=current&key=${this.apiKey}&contentType=json`;
    
        const response = await axios.get(url);
    
        return response.data;
    }

}

const weatherService = new WeatherService(process.env.API_KEY, process.env.WEATHER_API_URL)
module.exports = weatherService;
