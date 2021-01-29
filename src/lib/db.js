const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const {
  config
} = require('../lib/utils')
const { auditLog } = require('mongoose-audit-log').plugin
const { autoIncrement } = require('mongoose-plugin-autoinc')
const _ = require('lodash')

const connections = {}

module.exports = (opts) => {
  this.opts = _.cloneDeep(opts)
  this.opts.host = this.opts.host || 'localhost:27017'

  const connect = async (dbName) => {
    if (!this.opts) {
      this.opts = config.database
    }

    dbName = dbName || this.opts.default_db_name
    if (connections[dbName]) {
      console.debug('connect() connection exists')
      return connections[dbName]
    }

    connections[dbName] = await createNewConnection(this.opts, dbName)
    connections[dbName].once('open', function callback () {
      console.debug('connect() MongoDB connected successfully')
    })
    return connections[dbName]
  }
  return { connect, autoIncrement, auditLog }
}

async function createNewConnection (opts, dbName) {
  let url = `mongodb://${opts.host}/${dbName}`

  if (opts.replica_set) {
    url = url + `?replicaSet=${opts.replica_set}`
  }

  const mongoOptions = opts.mongo_options

  if (opts.authentication) {
    mongoOptions.user = opts.user || config.database.user
    mongoOptions.pass = opts.pass || config.database.pass
    mongoOptions.authSource = opts.auth_source
  }
  return mongoose.createConnection(url, mongoOptions)
}
