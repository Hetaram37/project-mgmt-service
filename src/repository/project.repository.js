'use strict'

const {
  config
} = require('../lib/utils')
require('../model/projects')
const database = config.get('database')

const findProject = async (query, projection) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const projectDetails = db.model('projects')
    const projects = await projectDetails.find(query, projection).lean().sort('-created_on')
    return projects
  } catch (error) {
    console.error('Error while getting project details: %s %j', error, error)
    throw error
  }
}

const findByIdProject = async (query, projection) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const projectDetails = db.model('projects')
    const projects = await projectDetails.findById(query, projection).lean()
    return projects
  } catch (error) {
    console.error('Error while getting project details: %s %j', error, error)
    throw error
  }
}

const updateProject = async (query, data) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const projectDetails = db.model('projects')
    const projects = await projectDetails.findOneAndUpdate(query, data, { new: true })
    return projects
  } catch (error) {
    console.error('Error while updating project details: %s %j', error, error)
    throw error
  }
}

const saveProject = async (data) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const ProjectDetails = db.model('projects')
    const projects = new ProjectDetails(data)
    return projects.save()
  } catch (error) {
    console.error('Error while saving projects details: %s %j', error, error)
    throw error
  }
}

module.exports = {
  findProject,
  findByIdProject,
  saveProject,
  updateProject
}
