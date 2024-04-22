const express = require("express")
const route = express.Router()
const {usersignup} = require('../controller/usercontroller')

 route.post('/signup', usersignup)
module.exports = route 