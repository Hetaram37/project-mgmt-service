'use strict'

const {
  config
} = require('../lib/utils')
require('../model/user')
const database = config.get('database')

const findUser = async (query, userion) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const userDetails = db.model('user')
    const users = await userDetails.find(query, userion).lean().sort('-created_on')
    return users
  } catch (error) {
    console.error('Error while getting user details: %s %j', error, error)
    throw error
  }
}

const findOneUser = async (query, userion) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const userDetails = db.model('user')
    const users = await userDetails.findOne(query, userion).lean().sort('-created_on')
    return users
  } catch (error) {
    console.error('Error while getting user details: %s %j', error, error)
    throw error
  }
}

const findByIdUser = async (query, userion) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const userDetails = db.model('user')
    const user = await userDetails.findById(query, userion).lean()
    return user
  } catch (error) {
    console.error('Error while getting user details: %s %j', error, error)
    throw error
  }
}

const updateUser = async (query, data) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const userDetails = db.model('user')
    const user = await userDetails.updateOne(query, data, { new: true })
    return user
  } catch (error) {
    console.error('Error while updating user details: %s %j', error, error)
    throw error
  }
}

const saveUser = async (data) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const UserDetails = db.model('user')
    const user = new UserDetails(data)
    return user.save()
  } catch (error) {
    console.error('Error while saving users details: %s %j', error, error)
    throw error
  }
}

module.exports = {
  findUser,
  findByIdUser,
  saveUser,
  updateUser,
  findOneUser
}
