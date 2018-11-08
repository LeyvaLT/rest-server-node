require('./config/config')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method, token' );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next()
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//params, body, header, query

// MongoDB Connect
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.URLDB,{ useNewUrlParser: true } , (error, response)=> {
    if(error) throw error
    console.log('BD Online')
})

// Routes
app.use(require('./routes/index'))

app.listen(process.env.PORT, () => {
    console.log(`escuchando por el puerto: ${process.env.PORT}`)
})

// Comments //
// res.status(code).json({mesagge})
