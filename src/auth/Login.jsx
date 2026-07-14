import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmpassword] = useState('')
  const [loading, setLoading] = useState(false)

  const apiUrl = import.meta.env.VITE_API_URL

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const newuser = {
        email: email,
        password: password
      }
      // console.log(newuser)
      const res = await axios.post(`${apiUrl}/user/login`, newuser)
      // console.log(res.data)
      setLoading(false)
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('fullName',res.data.fullName)
      await toast.success('Login Successful', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate('/dashboard')
    }
    catch (err) {
      console.log(err.err)
      toast.error('Something went wrong', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false)

    }
  }

  return (
    <div className='auth-wrapper'>
      <div className='login-box'>
        <div className='authForm-header'>
          <h2>Account Login</h2>
        </div>

        <form onSubmit={submitHandler} className='auth-form' style={{paddingBottom:'10px'}}>
          <input required value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='📧 Email' />
          <input required value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='🔒 Password' />
          <button className='submit-btn' type='submit'>{loading && <span><i className="fa-solid fa-spinner fa-spin-pulse"></i></span>} Login</button>
        </form>
        <div className='signup-redirecter'>
          <p>Don't have an Account ?</p>
          <Link to='/signup' className='signup-link'>Create Account</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup