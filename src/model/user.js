'use strict'

const mongoose = require('mongoose')
require('mongoose-long')(mongoose)
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  technologies: [
    {
      display: String,
      value: String
    }
  ],
  contact: String,
  type: {
    type: String,
    default: 'Emp',
    select: false
  },
  is_deleted: {
    type: Boolean,
    default: false,
    select: false
  },
  created_by: {
    type: String,
    default: 'SYSTEM'
  },
  updated_by: {
    type: String,
    default: 'SYSTEM'
  }
}, {
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  },
  collection: 'user'
})

userSchema.pre('save', async function (next) {
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 6)

  // Delete passwordConfirm field
  this.passwordConfirm = undefined
  next()
})

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ is_deleted: { $eq: false } })
  next()
})

module.exports = mongoose.model('user', userSchema)
