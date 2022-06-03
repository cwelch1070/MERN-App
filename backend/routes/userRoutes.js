const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

//Route paths for user and defines what types of requests can be made
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router