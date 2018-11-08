// server port
process.env.PORT = process.env.PORT || 3000


// token expires
process.env.TOKEN_EXPIRES = 60 * 60 * 24 * 30
// seed Auth
process.env.SEED = process.env.SEED || 'ancnasgdtweocnasdhgtpcmaiuqe89s87654'
// enviroment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// mongo connection
if (process.env.NODE_ENV === 'dev'){
    urlDB =  'mongodb://localhost:27017/cafe'
}else{
    urlDB = 'mongodb://cafe_user:qwerty.123@ds155263.mlab.com:55263/curso_node_cafe'
}

process.env.URLDB = urlDB
