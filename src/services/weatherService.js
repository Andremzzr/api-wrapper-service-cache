const axios = require("axios"); 

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



module.exports = WeatherService;
