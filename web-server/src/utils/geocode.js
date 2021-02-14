const request = require('request');


const geocode = (location, callback) => {
    const mburl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoibmdob2NoaTEzIiwiYSI6ImNra3hyZ2lnZzJpZDIycG55ZjNlMXpteTIifQ.XoNnJ2IL1DjbqJO-3lgC4g&limit=1`;
    request({url: mburl, json: true}, (err, res)=>{
        if(err){
            callback('Unable to connect', undefined);
        } else if(res.body.features.length === 0){
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined,{
                longitude: res.body.features[0].center[0],
                lattitude: res.body.features[0].center[1],
                location: res.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;