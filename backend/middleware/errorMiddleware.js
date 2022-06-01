//Middleware are function that execute during the request response cycle
const errorHandler = (err, req, res, next) => {
    //If their is a status code set in server.js then use it if not then set
    //status to 500 which is a server error
    const statusCode = res.statusCode ? res.statusCode : 500

    //Pass in status code that is set above
    res.status(statusCode)

    //Sends a json message
    res.json({
        message: err.message,
        //The production portion is defined in the .env file.
        //The NODE_ENV is currently set to development which allows
        //this statement to return a stack error when the NODE_ENV is set
        //to production it will return a null value for stack
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}