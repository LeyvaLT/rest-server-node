const jwt = require('jsonwebtoken')

let verifyToken = (req, res, next) => {
   
    let token = req.get('token')

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if(err){
            return res.status(401).json({
                ok: false,
                message: 'token no valido',
                err
            })
        }

        req.user = decoded.user 
        next()
    })
}

let verifyAdminRole = (req, res, next) => {
    
    let user = req.user

    if(user.role === 'ADMIN_ROLE') next()
    else{
        return res.status(401).json({
            ok: false,
            message: 'acceso denegado',
        })
    }
}

module.exports = {
    verifyToken,
    verifyAdminRole
} 
