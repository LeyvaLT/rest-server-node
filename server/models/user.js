const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let rol = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE}, no es un rol valido'
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombres es un campo obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es un campo obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rol
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

userSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser unico'})

module.exports = mongoose.model('user', userSchema)
