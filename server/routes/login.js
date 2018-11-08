const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {verifyToken} = require('../middlewares/auth')

const app = express()

app.post('/login', verifyToken, (req, res) => {
    
    body = req.body
    
    User.findOne({email: body.email},(err, userDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if(!userDB){
            return res.status(500).json({
                ok: false,
                error: {
                    message: 'Usuario o contraseña incorrectos'
                }
            })
        }

        if(!bcrypt.compareSync(body.password, userDB.password)){
            return res.status(500).json({
                ok: false,
                error: {
                    message: 'Usuario o contraseña incorrectos'
                }
            })
        }

        let token = jwt.sign({
            user:userDB
          }, process.env.SEED , { expiresIn: process.env.TOKEN_EXPIRES })

        return res.json({
            ok: true,
            user: userDB,
            token
        })

    })
})

module.exports = app
