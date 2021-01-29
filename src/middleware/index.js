'use strict'

const express = require('express')
const config = require('config')
const cors = require('cors')
const httpContext = require('express-http-context')
const helmet = require('helmet')

module.exports = function (app) {
  app.options('*', cors(config.cors))
  app.use(express.json())
  app.use(express.urlencoded({
    extended: true
  }))
  app.use(httpContext.middleware)
  app.use(express.static('ROOT'))
  app.use(helmet())
}
