const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const wsbase = "http://api.weatherstack.com/current?";

const wskey = "access_key=a1ec0685988070923a59ab59a299bea0";

const wsquery = "&query=Singapore";

const wsurl = wsbase+wskey+wsquery;



// request({url:mburl, json:true}, (err,res)=>{
//     if(error) {
//         console.log('Unable to connect to weather service!');
//     } else if (res.body.error){
//         console.log('Unable to find location');
//     } else{
//         const lattitude = res.body.features[0].center[0];
//         const longitude = res.body.features[0].center[1];
//         console.log(lattitude, longitude);
//     }
    
// });

// request({url:wsurl, json:true}, (error, res)=>{
//     if(error) {
//         console.log('Unable to connect to weather service!');
//     } else if (res.body.error){
//         console.log('Unable to find location');
//     } else{
//         const data = res.body;
//         console.log(`It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out.`);
//     }
// });

let loc = process.argv[2];

let info = {};

info = geocode(loc, (error, {lattitude, longitude})=> {
    if(error) console.log(error);
    else{
        forecast(lattitude, longitude, (error, {temperature, location, feelslike, humidity})=>{
            if(error) console.log('Error', error);
            else console.log(`It is ${temperature} degrees Celcius out in ${location}. It feels like ${feelslike} degrees and the humidtity is ${humidity}%.`)
        });
    }
    
});












