import axios from 'axios'

const API_URL = '/api/goals'

//Create new goal
const createGoal = async (goalData, token) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, goalData, config)

    return response.data
}

//Get user goals
const getGoals = async (token) => {
    const config = {
        headers: {  
            Authorization: `Bearer ${token}`,  
        }, 
    }

    //Error with getAll request being rejected originated from here
    //When Create function above was copied down the response request
    //was not changed to "get" as a result in the goalSlice extraReducers section  
    //The state would continue to reject getAll requests for users.
    //Also some commas were missing in the above code that were most likely also
    //causing issues
    const response = await axios.get(API_URL, config) 

    return response.data
}

//Delete user goal 
const deleteGoal = async (goalId, token) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
        },
    }

    //This was the issue with the delete request and UI items not being deleted the entire time '/' needed to be added
    //Without it goals is concatinated to the goalId resulting in a 404 which makes sense 
    //because http://localhost:3000/api/goal62a694063449e800a070392a is not a legitimate path
    //for the HTTP request to follow as a result a 404 is thrown 
    //I realized the code was working properly when I tested the HTTP delete request on port 3000 with postman and
    //It functioned properly which led me to believe the code itself was working as it should.
    const response = await axios.delete(API_URL + '/' + goalId, config)

    return response.data
}


const goalService = {
    createGoal, 
    getGoals,
    deleteGoal,
}

export default goalService