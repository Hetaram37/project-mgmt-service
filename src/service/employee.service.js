'use strict'

const { errorGenerator } = require('../lib/utils')
const {
  saveUser,
  findUser,
  findByIdUser,
  updateUser
} = require('../repository/user.repository')
const { findProject } = require('../repository/project.repository')
const Joi = require('@hapi/joi')
const SERVICE_CON = 'PMS_E_S_'
const {
  PARTIAL_CONTENT
} = require('http-status-codes')

const addUser = async (user) => {
  console.log('addUser() user: %j', user)
  await validateUserInput(user)
  const newUser = await saveUser(user)
  if (newUser && newUser.password) {
    delete newUser.password
  }
  console.log('Newly added user: %j', newUser)
  return newUser
}

async function validateUserInput (body) {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(25)
      .required(),
    email: Joi.string()
      .min(2)
      .max(250)
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(16)
      .required(),
    contact: Joi.string()
      .required(),
    technologies: Joi.array().items(Joi.object({
      display: Joi.string().required(),
      value: Joi.string().required()
    }))
  })

  try {
    const validation = await schema.validateAsync(body)
    return validation
  } catch (error) {
    throw errorGenerator(error, SERVICE_CON + PARTIAL_CONTENT,
      'Partial content', null)
  }
}

async function validateUpdateUserInput (body) {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(25)
      .required(),
    email: Joi.string()
      .min(2)
      .max(250)
      .email()
      .required(),
    contact: Joi.string()
      .required(),
    technologies: Joi.array().items(Joi.object({
      _id: Joi.string().allow(null),
      display: Joi.string().required(),
      value: Joi.string().required()
    }))
  })

  try {
    const validation = await schema.validateAsync(body)
    return validation
  } catch (error) {
    throw errorGenerator(error, SERVICE_CON + PARTIAL_CONTENT,
      'Partial content', null)
  }
}

const updateSingleUser = async (user, id) => {
  console.log('updateUser() user: %j, id: %s', user, id)
  await validateUpdateUserInput(user)
  const updatedData = await updateUser({ _id: id }, user)
  console.log('Data after updating user: %j', updatedData)
  return updatedData
}

const getUsers = async () => {
  console.log('getUsers()')
  const users = await findUser({
    is_deleted: false,
    type: 'Emp'
  }, userProjection())
  return users
}

function userProjection () {
  const userion = {}
  userion.name = true
  userion.contact = true
  userion.email = true
  userion.technologies = true
  return userion
}

const getSingleUser = async (id) => {
  console.log('getSingleUser() id: %s', id)
  const users = await findByIdUser(id, userProjection())
  return users
}

const getProjectList = async (id) => {
  console.log('getProjectList() id: %s', id)
  const projects = await findProject(
    queryProject(id),
    projectionProject()
  )
  console.log('Projects list: %j', projects)
  return projects
}

function queryProject (id) {
  return {
    employees: id,
    is_deleted: false
  }
}

function projectionProject () {
  return {
    title: true,
    company_name: true
  }
}

const deleteUser = async (id) => {
  console.log('deleteUser() id: %s', id)
  const updatedData = await updateUser(id, { is_deleted: true })
  console.log('Data after deleting user: %j', updatedData)
  return updatedData
}

module.exports = {
  addUser,
  updateSingleUser,
  getUsers,
  getSingleUser,
  getProjectList,
  deleteUser
}
