const express = require('express')
const route = express.Router()
const userroute = require('./user')
const account = require('./accounts')

route.use('/user',userroute)
route.use('/accounts',account)

module.exports = route