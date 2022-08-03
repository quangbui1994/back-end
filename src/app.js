require('./schema/auth')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose
    .connect('mongodb://mongo:27017')
    .then(() => console.log('Connected to DB'))
    .catch(() => console.log('Connected Failed'))

const authRoute = require('./controllers/auth')

const app = express()

app.use(bodyParser.json())
app.use('/auth', authRoute)

app.get('/', (req, res) => {
    res.send('hiii')
})

const PORT = 4000 || process.env.PORT

app.listen(PORT, () => console.log('Running on 4000'))
