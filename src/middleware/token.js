const {
  config,
  errorGenerator
} = require('../lib/utils')
const jwt = require('jsonwebtoken')
const exclusionList = config.exclude_url

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')
  console.debug('verifyToken() token: %s', token)
  if (exclusionList.indexOf(req.path) !== -1) return next()
  if (token) {
    const tokenArray = token.split(' ')
    const mainToken = tokenArray[1]
    const tokenData = jwt.verify(mainToken, config.get('JWT_key'))
    console.debug('Data from JWT verify: %s %j', tokenData, tokenData)
    return next()
  }
  throw res.status(401).send(errorGenerator(
    'Not authorized', 401,
    'Not authorized'))
}

module.exports = {
  verifyToken
}
