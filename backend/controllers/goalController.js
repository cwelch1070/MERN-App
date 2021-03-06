const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc Get goal
// @route GET /api/goals
// @access Private
const getGoal = asyncHandler(async(req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

// @desc Set goal
// @route SET /api/goals
// @access Private
const setGoal = asyncHandler (async(req, res) => {
    //This is taking in data from postman through a post request as text but
    //the program is not currently able to handle that information and logs it as undefined
    //the console.log() funtion logs the data sent by post man to the console 
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler (async(req, res) => {
    //Find the Goal
    const goal = await Goal.findById(req.params.id)

    //Checks if the goal exists
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    

    //Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Makes sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    //This updates the goal
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(updatedGoal)
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    //Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    //Does not need to be assigned a variable because it is being deleted
    await goal.deleteOne()

    res.status(200).json({ id: req.params.id }) 
})

module.exports = {
    getGoal, 
    setGoal,
    updateGoal,
    deleteGoal,
}