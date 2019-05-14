const express = require('express')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')
const path = require('path')
const hbs = require('hbs')


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.send('Hello World!')
})

geocode('New York', (error, data) => {

    if (error) {
       return console.log(error)
    }

    forcast(data.latitude, data.longitude, (error, forcastData) => {

        if (error) {
            return console.log(error)
         }

        console.log(data.location)
        console.log(forcastData)
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

