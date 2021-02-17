const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const dir = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));



app.use(express.static(dir));

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Hello'
    });
})

app.get('/weather', (req,res)=>{
        if(req.query.address){
            const loc = req.query.address;
            geocode(loc, (err, {longitude, lattitude} = {})=>{
                if(err) res.send({error: err});
                else {
                    forecast(lattitude, longitude, (err, {temperature, feelslike, humidity, location})=>{
                        if(err) res.send({error: err});
                        else {
                            res.send({
                                location,
                                temperature,
                                feelslike,
                                humidity
                            });
                        }
                    })
                }
            });
        }
    else{
        res.send({
            error: "Address must be provided"
        })
    }
    
});

app.get('/products', (req, res)=>{
    console.log(req.query);
    res.send({
        products: []
    })
})

app.listen(port, ()=>{
    console.log('Server has started properly.');
});