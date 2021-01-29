'use strict'

module.exports = {
  config: require('config'),
  responseGenerators: (data, statusCode, statusMsg, errors) => {
    const responseJson = {}
    responseJson.data = data
    responseJson.status_code = statusCode
    responseJson.status_message = statusMsg

    if (errors === undefined) {
      responseJson.response_error = []
    } else {
      responseJson.response_error = errors
    }
    return responseJson
  },

  errorGenerator: (error, code, msg, data) => {
    const responseJson = {}
    if (typeof error !== 'undefined' || error.length > 0) {
      responseJson.errors = String(error)
    } else {
      responseJson.errors = []
    }

    if (typeof code === 'undefined') {
      responseJson.status_code = '500'
    } else {
      responseJson.status_code = code
    }

    if (typeof msg === 'undefined') {
      responseJson.status_message = 'server error'
    } else {
      responseJson.status_message = msg
    }

    if (typeof data === 'undefined') {
      responseJson.data = {}
    } else {
      responseJson.data = data
    }
    return responseJson
  },

  getStatusCode: function getStatusCode (statusCode) {
    if (statusCode === undefined) {
      statusCode = 'DF_ER_500'
    }
    const status = statusCode.split('_')
    return status[status.length - 1]
  },

  encode: (plainText) => {
    // Create buffer object, specifying utf8 as encoding
    const bufferObj = Buffer.from(plainText, 'utf8')
    // Encode the Buffer as a base64 string
    return bufferObj.toString('base64')
  },

  decode: (encodedText) => {
    // Create a buffer from the string
    const bufferObj = Buffer.from(encodedText, 'base64')
    // Encode the Buffer as a utf8 string
    return bufferObj.toString('utf8')
  },

  arrayWithElement: (data) => {
    let isValid = false
    if (data && Array.isArray(data) && data.length > 0) {
      isValid = true
    }
    return isValid
  }
}
