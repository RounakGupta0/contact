import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import defaultIcon from '../assets/default image.webp'
import { Link, useNavigate } from 'react-router-dom'

const AddStudent = () => {

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('Male')
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const apiUrl = import.meta.env.VITE_API_URL

  const submitHandler = async (e) => {
    e.preventDefault()

    try {

      setLoading(true)

      console.log(localStorage.getItem('token'))
      console.log(fullName, email, phone, gender, address, image)

      const newContact = new FormData()
      newContact.append('fullName', fullName)
      newContact.append('email', email)
      newContact.append('phone', phone)
      newContact.append('address', address)
      newContact.append('gender', gender)
      if (image) {
        newContact.append('photo', image)
      }

      console.log(newContact)

      const res = await axios.post(`${apiUrl}/contact/add-contact`, newContact, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      setLoading(false)

      toast.success('Student Added Successfully 🎉', {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // onClose:()=> navigate('/dashboard/student')
      });
      clearForm()
      console.log(res)

    }
    catch (err) {
      console.log(err)
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

  const clearForm = (e) => {
    setFullName('')
    setEmail('')
    setAddress('')
    setPhone('')
    setGender('Male')
    setImage(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl('')
    }
    document.getElementById('contactForm').reset()
  }


  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    if (selected) {
      setImage(selected)
      setPreviewUrl(URL.createObjectURL(selected))
    } else {
      setImage(null)
      setPreviewUrl('')
    }
  }

  return (

    <div className='add-student'>
      <div className='add-studentHeader'>
        <h2>Add Student</h2>
      </div>
      <form className='add-StudentForm' id='contactForm' onSubmit={submitHandler}>
        <div className='add-studentSection'>
          <div className='add-Form-part'>
            <div className='add-formInput-box'>
              <p>Full Name</p>
              <input className='add-FormInput' onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" placeholder='👤 Full Name' />
            </div >
            <div className='add-formInput-box'>
              <p>Email</p>
              <input className='add-FormInput' onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder='📧 Email' />
            </div>
            <div className='add-formInput-box'>
              <p>Phone</p>
              <input className='add-FormInput' onChange={(e) => setPhone(e.target.value)} value={phone} type="text" placeholder='📞 Phone' />
            </div>
          </div>
          <div className='add-Form-part'>
            <div className='add-formInput-box'>
              <p>Address</p>
              <input className='add-FormInput' onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder='📍 Address' />
            </div>
            <div className='add-formInput-box'>
              <p>Gender</p>
              <select className='add-FormInput' value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Male">👦 Male</option>
                <option value="Female">👧 Female</option>
              </select>
            </div>
            <div className='add-formInput-box'>
              <p>Profile Pic</p>
              <input required className='add-FormInput' onChange={handleFileChange} type="file" placeholder='Image' />
            </div>
          </div>
        </div>
        {
          previewUrl ?
            <div className='preview-addStudentForm'>
              <p>Preview Image</p>
              <img src={previewUrl} alt="no image" />
            </div>
            :
            <div className='preview-addStudentForm'>
              <p>Preview Image <span><i className="fa-solid fa-arrow-right-long"></i></span></p>
              <img src={defaultIcon} alt="no image" />
            </div>
        }
        <div className='addStudent-btnwrapper'>
          <button className='addStudent-btn' type='submit' >{loading && <span ><i className='loader' className="fa-solid fa-spinner fa-spin-pulse"></i></span>}{loading ? ' Adding Contact' : ' Add Student'}</button>
        </div>
      </form>
    </div>
  )
}

export default AddStudent