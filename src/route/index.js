'use strict'

const authRoute = require('./auth.route')
const employeeRoute = require('./employee.route')
const projectRoute = require('./project.route')
const cors = require('cors')

module.exports = (app) => {
  app.use('/api/auth/v1', cors(), authRoute)
  app.use('/api/employee/v1', cors(), employeeRoute)
  app.use('/api/project/v1', cors(), projectRoute)
}
