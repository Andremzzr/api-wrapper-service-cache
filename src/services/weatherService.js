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

    async getWeather(searchHash) {
        const city = this.getCity(searchHash);
        const includes = this.getIncludesParams(searchHash);
        const url = `${this.baseUrl}${city}?unitGroup=metric&key=${this.apiKey}&contentType=json${includes}`;
        console.log(url)
        const response = await axios.get(url);
    
        return response.data;
    }

    getCity(searchHash) {
        if (searchHash.includes('_i=')) {
            return searchHash.split('_i=')[0]
        }

        return searchHash
    }

    getIncludesParams(searchHash) { 
        let includes = '&include='
        if (searchHash.includes('_i=')) {
            const paramsIncluded = []
            const params = searchHash.split('_i=')[1].split('_');
            params.forEach(param => {
                if(this.includeParams.includes(param)) {
                    paramsIncluded.push(param)
                    if (paramsIncluded.length > 1) {
                        includes+=`%2C${param}`;
                        return
                    }

                    includes+=param
                }
            })

            return includes
        }

        return ''
    }

}

const weatherService = new WeatherService(process.env.API_KEY, process.env.WEATHER_API_URL)
module.exports = weatherService;
