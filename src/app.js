const express = require('express');
const weatherRoutes = require("./routes/weather");
require('dotenv').config()

//APP CONFIG
const app = express();
app.use(express.json());
express.urlencoded({ extended: true })
app.use(weatherRoutes)


const port = process.env.PORT;

app.listen(port || 5000, () => {
    console.log( `Server listening at http://locahost:${port}`)
});