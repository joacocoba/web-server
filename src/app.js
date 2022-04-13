const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, 'templates/views')
const partialsPath = path.join(__dirname, 'templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Joaquin Caubarrere'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Joaquin Caubarrere'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'To communicate with me in order to make an appointment, I suggest you to write me an email to the e-mail provided in the footer.',
        name: 'Joaquin Caubarrere'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.json({
            error: "Please provide an address"
        })
    }
    forecast(req.query.address, (error, {message, location} = {}) => {
        if(error){
            return res.json({
                error: error
            })
        }
        res.json({
            forecast: message,
            location: location,
            address: req.query.address
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page 404',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page 404',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})