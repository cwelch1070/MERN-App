//includes express framework
const express = require('express')
//Includes dotenv for enviroment variables
const dotenv = require('dotenv').config()
//Error handler from errorMiddleware.js
const {errorHandler} = require('./middleware/errorMiddleware')

/*
    Defines the port the server will run on
    Port is defined in the .env file so it can easily be changed 
    and used anywhere in the program
    if the port defined in the .env does not work the server will try to run on 5000
*/
const port = process.env.PORT || 5000

//Intializes express with variable called app
const app = express()

//This is middleware
//This section of code allows the program to handle the text data being sent by postman
//though a post request
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

//Directs to goalRoutes.js file
app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

//listen takes in the port number and prints to the command line the messages bellow
app.listen(port, () => console.log(`Server started on port ${port}`))