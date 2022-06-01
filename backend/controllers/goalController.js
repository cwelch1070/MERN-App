const asyncHandler = require('express-async-handler')

// @desc Get goal
// @route GET /api/goals
// @access Private
const getGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'Get Goals'})
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

    res.status(200).json({message: 'Set Goals'})
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler (async(req, res) => {
    res.status(200).json({message: `Update Goals ${req.params.id}`})
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler (async(req, res) => {
    res.status(200).json({message: `Delete Goals ${req.params.id}`})
})

module.exports = {
    getGoal, 
    setGoal,
    updateGoal,
    deleteGoal,
}