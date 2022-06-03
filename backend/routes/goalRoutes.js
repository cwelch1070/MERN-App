//This is common js sytax which is why it does not use the 
//Keyword import but does the same as import
//imort is also used in js but is part of ejs 2015 which will be used for the frontend
//Imports express and express router
const express = require('express')
const router = express.Router()
const { 
    getGoal, 
    setGoal, 
    updateGoal, 
    deleteGoal 
} = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware')

/*
    Defines the route that is taken to reach the server
    Makes get request and then responds with get goals

    Routes for all CRUD operations. Currently, they only display the message
    that each of them contain. More functionality will be add in the controller
    file.
*/

//The type of request that is made is defined in this file.
//The first line bellow does a GET and POST and the second does a PUT and DELETE
//The protect keyword will require a token is being imported above throught cosnt {protect}
router.route('/').get(protect, getGoal).post(protect, setGoal)

//If the ":id" portion is missing the PUT and DELETE requests will not work
//Simple fix that took way to long
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

module.exports = router