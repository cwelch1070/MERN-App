//Imports mongoose
const mongoose = require('mongoose')

//Function to connect to mongoDB
const connectDB = async () => {
    //Tries to connect to mongodb with MONGO_URI that is defined in .env file
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    //If a connection can not be made an error is displayed and logged
    } catch (error) {
        console.log(error) 
            process.exit(1)
    }
}

//Makes file available to program
module.exports = connectDB