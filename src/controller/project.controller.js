'use strict'

const {
  responseGenerators,
  getStatusCode,
  errorGenerator
} = require('../lib/utils')
const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST
} = require('http-status-codes')
const {
  addProject,
  updateSingleProject,
  getProjects,
  getSingleProject,
  assignProject,
  deleteProject
} = require('../service/project.service')
const CONTROLLER_CONS = 'PMS_P_C_'

const addNewProject = async (req, res) => {
  try {
    console.debug('addNewProject()')
    const response = await addProject(req.body)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
  } catch (error) {
    console.error('Error while adding new projects: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

const updateSpecificProject = async (req, res) => {
  try {
    console.debug('updateSpecificProject()')
    const id = req.params.id
    const response = await updateSingleProject(req.body, id)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
  } catch (error) {
    console.error('Error while updating specific project: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

const getAllProject = async (req, res) => {
  try {
    console.debug('getAllProject()')
    const response = await getProjects()
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
  } catch (error) {
    console.error('Error while getting all project: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

const getSpecificProject = async (req, res, next) => {
  try {
    console.debug('getSpecificProject()')
    const id = req.params.id
    const response = await getSingleProject(id)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
  } catch (error) {
    console.error('Error while getting specific project: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

const assignProjectToEmployee = async (req, res) => {
  try {
    console.debug('assignProjectToEmployee()')
    const id = req.params.id
    const response = await assignProject(req.body, id)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
  } catch (error) {
    console.error('Error while assigning project: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

const deleteAProject = async (req, res) => {
  try {
    console.debug('deleteAProject()')
    const id = req.params.id
    const response = await deleteProject(id)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
  } catch (error) {
    console.error('Error while deleting project: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

module.exports = {
  addNewProject,
  updateSpecificProject,
  getAllProject,
  getSpecificProject,
  assignProjectToEmployee,
  deleteAProject
}
