const axios = require("axios"); 
require('dotenv').config();

class WeatherService  {
    apiKey = undefined;
    baseUrl = undefined;
    includeParams = ["current", "alerts", "events"];

    constructor (apiKey, baseUrl)  {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async getWeather(city, include = []) {
        const includes = this.getIncludeParams(include);
        console.log(includes)
        const url = `${this.baseUrl}${city}?unitGroup=metric&key=${this.apiKey}&contentType=json${includes}`;
        console.log(url)
        const response = await axios.get(url);
    
        return response.data;
    }

    getIncludeParams(include) { 
        const validParams = include.filter(param => {if(this.includeParams.includes(param)) {return true}});
        
        if( validParams.length > 0 ) {
            return `&include=${encodeURI(validParams.join(','))}`
        }

        return ''
    }

}

const weatherService = new WeatherService(process.env.API_KEY, process.env.WEATHER_API_URL)
module.exports = weatherService;
