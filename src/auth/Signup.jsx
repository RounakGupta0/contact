import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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

        if (password !== confirmPassword) {
            return  (toast.error('password match failed', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }),
        setLoading(false))
        }
        console.log('function still running')

        try {
            const newuser = {
                fullName: fullName,
                email: email,
                phone: phone,
                password: password
            }
            console.log(newuser)
            const res = await axios.post(`${apiUrl}/user/signup`, newuser)
            console.log(res)
            setLoading(false)
            await toast.success('Account Created', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/login')
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
            <div className='auth-box'>
                <div className='authForm-header'>
                    <h2>Account Signup</h2>
                </div>

                <form onSubmit={submitHandler} className='auth-form'>
                    <input required value={fullName} onChange={(e) => { setFullName(e.target.value) }} type="text" placeholder='👤 Full Name' />
                    <input required value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='📧 Email' />
                    <input required value={phone} onChange={(e) => { setPhone(e.target.value) }} type="text" placeholder='📞 Phone' />
                    <input required value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='🔒 Password' />
                    <input required value={confirmPassword} onChange={(e) => { setConfirmpassword(e.target.value) }} type="password" placeholder='🔒 Confirm Password' />
                    {
                        confirmPassword !== password && <p className='password-Nomatch'>*password didnt mathched</p>
                    }
                    <button className='submit-btn' type='submit'>{loading && <span><i className="fa-solid fa-spinner fa-spin-pulse"></i></span>} {loading ? 'Creating Account' : 'Create Account'}</button>
                </form>
                <div className='signup-redirecter'>
                    <p>Already have an Account ?</p>
                    <Link to='/login' className='signup-link'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup