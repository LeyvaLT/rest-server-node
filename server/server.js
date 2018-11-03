require('./config/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method' );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next()
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//params, body, header, query

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

app.get('/usuario', (req, res) => {

    res.json({
        ok: true,
        message: 'get usuario'
    })

})

app.post('/usuario', (req, res) => {
    let body = req.body
    res.json({
        ok: true,
        usuario: body.nombre,
        id: body.id,
        message: 'post usuario'
    })

})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id 
    res.json({
        ok: true,
        message: 'put usuario',
        id
    })

})

app.delete('/usuario', (req, res) => {

    res.json({
        ok: true,
        message: 'delete usuario'
    })

})

// res.status(code).json({mesagge})

app.listen(process.env.PORT, () => {
    console.log(`escuchando por el puerto: ${process.env.PORT}`)
})


