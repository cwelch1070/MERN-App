import {useDispatch} from 'react-redux'
import {deleteGoal} from '../features/goals/goalSlice'

//This file displays the data and the goal that the user created on the goals page
function GoalItem({goal}) {
    const dispatch = useDispatch()

  return (
    <div className="goal">
        <div>
            {new Date(goal.createdAt).toLocaleString
            ('en-US')}
        </div>
        <h2>{goal.text}</h2>
        <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">X</button>
    </div>
  )
}

export default GoalItem