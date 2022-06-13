//This file handles the Dashboard page only
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import {getGoals} from '../features/goals/goalSlice'
//This had to be imported from authSlice and not goalSlice
//When imported from goalSlice the frontend page would crash hard
import {reset} from '../features/auth/authSlice'


function Dashboard() {
  //Prevents non logged in user from accessing the dashboard
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }

    //Fetches goals from backend and puts in goals
      dispatch(getGoals())
    
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return ( 
  <>
    <section>
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
    </section>

    <GoalForm />

    <section className="content">
      {goals.length > 0 ? (
        <div className="goals">
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (<h3>You have not set any goals</h3>)}
    </section>
  </>
)}

export default Dashboard 