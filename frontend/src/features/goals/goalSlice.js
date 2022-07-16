//Something to do with create goals
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create new Goal
//This function actually creates the goal for the user when the type in the text
//To represent the goal they want to create
export const createGoal = createAsyncThunk('goals/create', async(goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData, token)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get user goals
//This function get the goal the user created with the above function 
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token) 
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Deletes the users goals
export const deleteGoal = createAsyncThunk('goals/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Not sure how this differentiates between each type of CRUD request
//but this section of code handles the state of the redux dev tools  
export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message =  action.payload
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message =  action.payload
            }) 
            .addCase(deleteGoal.pending, (state) => {
                console.log("Entered deleteGoal pending")
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                console.log("Entered deleteGoal fullfilled")
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => { 
                console.log("Entered deleteGoal Rejected")
                state.isLoading = false
                state.isError = true 
                state.message =  action.payload
            }) 
    },
}) 

export const {reset} = goalSlice.actions
export default goalSlice.reducer
