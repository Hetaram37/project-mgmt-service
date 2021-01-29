'use strict'

const {
  config
} = require('../lib/utils')
const jwt = require('jsonwebtoken')

const generateToken = async (userId, userType, expireOn) => {
  console.debug('generateToken() userId: %s, expireOn: %s', userId, expireOn)
  const expireAt = getExpiryTime(expireOn)
  const token = jwt.sign({ id: userId, role: userType }, config.get('JWT_key'), { expiresIn: expireAt })
  return { token, expire_on: expireAt }
}

function getExpiryTime (expiryTime) {
  const timeStamp = getTimeStamp()
  if (!expiryTime) {
    expiryTime = config.get('expiry_time')
  }
  const tokenExpireAt = timeStamp + (expiryTime * 60 * 60)
  return tokenExpireAt
}

function getTimeStamp () {
  const currentDate = new Date().getTime()
  const timeStamp = Math.ceil(currentDate / 1000)
  return timeStamp
}

module.exports = {
  generateToken
}
