const request = require('request');

const forecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=dd5fb1eecc12e1fc4e21235aa769e7b8&query=${encodeURI(address)}&units=m`

    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to access weather services', undefined)
        } else if(response.body.error) {
            callback('We couldnt find the city you provided. Please put another', undefined)
        } else {
            callback(undefined, {
                message: `In ${response.body.location.name} the weather is ${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. There is a ${response.body.current.precip}% chance of rain`,
                location: response.body.location.name
            })
        } 
    })

}
module.exports = forecast;

