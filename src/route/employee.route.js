'use strict'

const router = require('express').Router()
const {
  addNewUser,
  updateSpecificUser,
  getAllUser,
  getSpecificUser,
  getEmpProjectList,
  removeUser
} = require('../controller/employee.controller')

router.post('/', addNewUser)
router.put('/:id', updateSpecificUser)
router.get('/', getAllUser)
router.get('/:id', getSpecificUser)
router.get('/myproject/:id', getEmpProjectList)
router.delete('/:id', removeUser)

module.exports = router
