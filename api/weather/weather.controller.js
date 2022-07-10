const weatherService = require('./weather.service')

module.exports = {
    getWeather
}

async function getWeather(req, res) {
    try {
        const weather = await weatherService.query(req.query)
        res.send(weather)
    } catch (err) {
        res.status(500).send({ err: 'Failed to find the weather for this city' })
    }
}