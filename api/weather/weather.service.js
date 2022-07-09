const axios = require('axios')

module.exports = {
    query
}

async function query(filterBy) {
    try {
        if(!process.env.API_KEY) throw new Error('You need to get API key from the website: https://api.weatherapi.com/')
        const { city } = filterBy
        const queryStr = city.replace(/ /g,'%20')
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${queryStr}&days=1&aqi=no&alerts=no`
        const { data } = await axios.get(url)
        return _getWeather(data)
    } catch (err) {
        console.log('cannot find weather', err)
        throw err
    }
}


function _getWeather(data) {
    return {
        city: data.location.name,
        country: data.location.country,
        lastUpdate: data.current.last_updated_epoch,
        lat: data.location.lat,
        lng: data.location.lon,
        tempC: data.current.temp_c,
        description: data.current.condition.text,
        conditions: [
            {
                type: 'precipitation',
                value: data.current.precip_mm,
                unit: 'mm'
            },
            {
                type: 'humidity',
                value: data.current.humidity,
                unit: '%'
            },
            {
                type: 'wind',
                value: data.current.wind_kph,
                unit: 'km/h'
            }
        ],
        hours: [
            {
                time: data.forecast.forecastday[0].hour[14].time_epoch,
                tempC: data.forecast.forecastday[0].hour[14].temp_c
            },
            {
                time: data.forecast.forecastday[0].hour[15].time_epoch,
                tempC: data.forecast.forecastday[0].hour[15].temp_c
            },
            {
                time: data.forecast.forecastday[0].hour[16].time_epoch,
                tempC: data.forecast.forecastday[0].hour[16].temp_c
            },
            {
                time: data.forecast.forecastday[0].hour[17].time_epoch,
                tempC: data.forecast.forecastday[0].hour[17].temp_c
            },
            {
                time: data.forecast.forecastday[0].hour[18].time_epoch,
                tempC: data.forecast.forecastday[0].hour[18].temp_c
            }
        ]
    }
}