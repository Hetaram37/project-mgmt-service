'use strict'

const router = require('express').Router()
const {
  userAuthentication
} = require('../controller/auth.controller')

router.post('/login', userAuthentication)

module.exports = router
