//
import axios from 'axios'

const API_URL = '/api/users/'

//Register user function 
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login user function 
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout User function 
const logout = () => {
    localStorage.removeItem('user')
}

//This looks like the main class function and everthing inside are 
//function calls to the other functions in the file
//He refers to this as exporting
const authService = {
    register,
    logout,
    login,
}

export default authService 