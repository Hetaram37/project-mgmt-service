'use strict'

const { errorGenerator } = require('../lib/utils')
const {
  saveProject,
  findProject,
  findByIdProject,
  updateProject
} = require('../repository/project.repository')
const Joi = require('@hapi/joi')
const SERVICE_CON = 'PMS_P_S_'
const {
  PARTIAL_CONTENT
} = require('http-status-codes')

const addProject = async (project) => {
  console.log('addProject() project: %j', project)
  await validateProjectInput(project)
  const newProject = await saveProject(project)
  console.log('Newly added project: %j', newProject)
  return newProject
}

async function validateProjectInput (body) {
  const schema = Joi.object({
    title: Joi.string()
      .min(2)
      .max(25)
      .required(),
    description: Joi.string()
      .min(2)
      .max(250)
      .required(),
    company_name: Joi.string()
      .min(2)
      .max(100)
      .required(),
    duration: Joi.number().strict()
      .required(),
    cost: Joi.number().strict()
      .required()
  })

  try {
    const validation = await schema.validateAsync(body)
    return validation
  } catch (error) {
    throw errorGenerator(error, SERVICE_CON + PARTIAL_CONTENT,
      'Partial content', null)
  }
}
const updateSingleProject = async (project, id) => {
  console.log('updateProject() project: %j, id: %s', project, id)
  await validateProjectInput(project)
  const updatedData = await updateProject(id, project)
  console.log('Data after updating project: %j', updatedData)
  return updatedData
}

const assignProject = async (employees, id) => {
  console.log('assignProject() employees: %j, id: %s', employees, id)
  const updatedData = await updateProject(id, assignEmployeeList(employees))
  console.log('Data after updating project: %j', updatedData)
  return updatedData
}

function assignEmployeeList (employeeList) {
  const updateData = {}
  updateData.$push = {}
  updateData.$push.employees = {}
  updateData.$push.employees.$each = employeeList
  return updateData
}

const getProjects = async () => {
  console.log('getProjects()')
  const projects = await findProject({
    is_deleted: false
  }, ProjectsProjection())
  return projects
}

function ProjectsProjection () {
  const projection = {}
  projection.title = true
  projection.cost = true
  projection.duration = true
  projection.company_name = true
  return projection
}

const getSingleProject = async (id) => {
  console.log('getSingleProject() id: %s', id)
  const projects = await findByIdProject(id, singleProjectProjection())
  return projects
}

function singleProjectProjection () {
  const projection = {}
  projection.title = true
  projection.cost = true
  projection.description = true
  projection.employee = true
  projection.duration = true
  projection.company_name = true
  return projection
}

const deleteProject = async (id) => {
  console.log('deleteProject() id: %s', id)
  const updatedData = await updateProject(id, { is_deleted: true })
  console.log('Data after deleting project: %j', updatedData)
  return updatedData
}

module.exports = {
  addProject,
  updateSingleProject,
  getProjects,
  getSingleProject,
  assignProject,
  deleteProject
}
