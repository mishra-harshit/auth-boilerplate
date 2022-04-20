const express = require('express')

const router = express.Router()

const userControllers = require('../controllers/users-controller')

router.get('/',userControllers.getUsers)
router.post('/signup',userControllers.createUsers)
router.post('/login',userControllers.login)

module.exports = router