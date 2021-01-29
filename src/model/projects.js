'use strict'

const mongoose = require('mongoose')
require('mongoose-long')(mongoose)

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  company_name: {
    type: String,
    required: [true, 'Company name is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required']
  },
  cost: {
    type: Number,
    required: [true, 'Cost is required']
  },
  employees: [{
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  }],
  is_deleted: {
    type: Boolean,
    default: false
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
  collection: 'projects'
})

projectSchema.virtual('employee_list', {
  ref: 'user',
  foreignField: '_id',
  localField: 'employees'
})

projectSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ is_deleted: { $eq: false } })
  next()
})

module.exports = mongoose.model('projects', projectSchema)
