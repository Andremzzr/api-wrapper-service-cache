require('dotenv').config()
const axios = require("axios"); 

async function getWeather(city) {
    const url = `${process.env.BASE_URL}${city}?unitGroup=metric&include=current&key=${process.env.API_KEY}&contentType=json`;

    const response = await axios.get(url);

    return response.data;
}

module.exports = getWeather;
