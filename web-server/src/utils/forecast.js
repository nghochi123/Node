//For this function, the lattitude and longitude will be given, and callback 
//function to return the weather forecast at that location will be given.

const request = require("request");



const forecast = (lat, long, callback) => {
    const base = "http://api.weatherstack.com/current?access_key=a1ec0685988070923a59ab59a299bea0&query="; 
    const units = "&units=m"
    const requrl= `${base}${lat},${long}${units}`
    request({url:requrl, json:true}, (err, res) =>{
        if(err){
            callback('Unable to connect', undefined);
        } else if (res.body.error) {
            callback('Unable to get weather forecast for this location. Try another search', undefined);
        } else {
            callback(undefined, {
                temperature: res.body.current.temperature,
                feelslike: res.body.current.feelslike,
                humidity: res.body.current.humidity,
                location: `${res.body.location.country}, ${res.body.location.name}`
            });
        }
    })
}

module.exports = forecast;