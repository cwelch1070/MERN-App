//This file handles the Register page only
//Stopped at 
import { useState, useEffect } from 'react'
//useSelector selects from the state
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch]) 

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2) {
      toast.error('Passwords do not match')
    }else {
      const userData = {
        name, 
        email,
        password,
      }

      //Dispatches Register user function in authSlice.js
      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner />
  }

  return <>
  <section className="heading">
    <h1>
      <FaUser/> Register
    </h1>
    <p>Please create an account</p>
  </section>
  
  <section className='form'>
    <form onSubmit={onSubmit}>
      {/* 
        For name input from user
      */}
      <div className="form-group">
        <input 
          type="text" 
          className='form-control' 
          id='name' 
          name='name' 
          value={name} 
          placeholder='Enter your name' 
          onChange={onChange}/>
      </div>
      {/* 
        For email input from user
      */}
      <div className="form-group">
        <input 
          type="email" 
          className='form-control' 
          id='email' 
          name='email' 
          value={email} 
          placeholder='Enter your email' 
          onChange={onChange}/>
      </div>
      {/* 
        For password input from user
      */}
      <div className="form-group">
        <input 
          type="password" 
          className='form-control' 
          id='password' 
          name='password' 
          value={password} 
          placeholder='Enter your password' 
          onChange={onChange}/>
      </div>
      {/* 
        Have user reinput password to confirm
      */}
      <div className="form-group">
        <input 
          type="password" 
          className='form-control' 
          id='password2' 
          name='password2' 
          value={password2} 
          placeholder='Confirm password' 
          onChange={onChange}/>
      </div>
      {/* 
        Submit button
      */}
      <div className="form-group">
        <button type='submit' className='btn btn-block'>Submit</button>
      </div>
    </form>
  </section>
  </>
}

export default Register