const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const User = require('../models/user')
const {verifyToken, verifyAdminRole} = require('../middlewares/auth')

const app = express()

app.get('/user',verifyToken, (req, res) => {

    let start = req.query.start || 0
    let limit = req.query.limit || 5

    User.find({ status: true }, 'name email role status google img')
        .skip(Number(start))
        .limit(Number(limit))
        .exec((error, users) => {
            if(error){
                return res.status(400).json({
                    ok:false,
                    error
                })
            }
            User.count({ status: true }, (error, count) => {
                return res.json({
                    ok:true,
                    count,
                    users
                })
            })
        })
})

app.post('/user', [verifyToken, verifyAdminRole], (req, res) => {
    
    let body = req.body
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })
    user.save((error, userDB) => {
        if(error){
            return res.status(400).json({
                ok:false,
                error
            })
        }
        return res.json({
            ok: true,
            user: userDB
        })
        
    })
})

app.put('/user/:id', [verifyToken, verifyAdminRole], (req, res) => {

    let id = req.params.id 
    let body = _.pick(req.body, ['name', 'email', 'img', 'role'])

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, userDB) => {

        if(error){
            return res.status(400).json({
                ok:false,
                error
            })
        }

        return res.json({
            ok: true,
            user: userDB
        })
    })
})

app.delete('/user/:id', [verifyToken, verifyAdminRole], (req, res) => {

    let id = req.params.id 
    let body = _.pick(req.body, ['name', 'email', 'img', 'role'])

    User.findByIdAndUpdate(id, {$set: {"status": false } }, { new: true, runValidators: true }, (error, userDB) => {

        if(error){
            return res.status(400).json({
                ok:false,
                error
            })
        }

        return res.json({
            ok: true,
            user: userDB
        })
    })
})

module.exports = app
