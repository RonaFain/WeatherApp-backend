const express = require('express')
const { getWeather } = require('./weather.controller')
const router = express.Router()

router.get('/', getWeather)

module.exports = router