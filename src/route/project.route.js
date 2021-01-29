'use strict'

const router = require('express').Router()
const {
  addNewProject,
  updateSpecificProject,
  getAllProject,
  getSpecificProject,
  assignProjectToEmployee,
  deleteAProject
} = require('../controller/project.controller')

router.post('/', addNewProject)
router.put('/:id', updateSpecificProject)
router.get('/', getAllProject)
router.get('/:id', getSpecificProject)
router.post('/assign/project/:id', assignProjectToEmployee)
router.delete('/:id', deleteAProject)

module.exports = router
