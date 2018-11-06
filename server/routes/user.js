const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const _ = require('underscore')
const User = require('../models/user')

app.get('/user', (req, res) => {

    let start = req.query.start || 0
    let limit = req.query.limit || 5

    User.find({})
        .skip(Number(start))
        .limit(Number(limit))
        .exec((error, users) => {
            if(error){
                res.status(400).json({
                    ok:false,
                    error
                })
            }
            User.count({}, (error, count) => {
                res.json({
                    ok:true,
                    count,
                    users
                })
            })
        })
})

app.post('/user', (req, res) => {
    let body = req.body
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })
    user.save((error, userDB) => {
        if(error){
            res.status(400).json({
                ok:false,
                error
            })
        }
        res.json({
            ok: true,
            user: userDB
        })
        
    })
})

app.put('/user/:id', (req, res) => {

    let id = req.params.id 
    let body = _.pick(req.body, ['name', 'email', 'img', 'role'])

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, userDB) => {

        if(error){
            res.status(400).json({
                ok:false,
                error
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    })
})

app.delete('/user', (req, res) => {

    res.json({
        ok: true,
        message: 'delete usuario'
    })

})

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

module.exports = app
