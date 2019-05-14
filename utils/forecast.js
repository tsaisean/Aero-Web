const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/' + process.env.DARKSKY_KEY + '/' + lat + ',' + long

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body.currently)
        }
    })

}

module.exports = forecast