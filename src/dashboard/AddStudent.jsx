import axios from 'axios'
import React, { useState } from 'react'

const AddStudent = () => {

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('Male')
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')

  const apiUrl = import.meta.env.VITE_API_URL

  const submitHandler = async (e) => {
    e.preventDefault()

    try {

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
      clearForm()
      console.log(res)

    }
    catch (err) {
      console.log(err)
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
              <input className='add-FormInput' onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" placeholder='Full Name' />
            </div >
            <div className='add-formInput-box'>
              <p>Email</p>
              <input className='add-FormInput' onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder='Email' />
            </div>
            <div className='add-formInput-box'>
              <p>Phone</p>
              <input className='add-FormInput' onChange={(e) => setPhone(e.target.value)} value={phone} type="text" placeholder='Phone' />
            </div>
          </div>
          <div className='add-Form-part'>
            <div className='add-formInput-box'>
              <p>Address</p>
              <input className='add-FormInput' onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder='Address' />
            </div>
            <div className='add-formInput-box'>
              <p>Gender</p>
              <select className='add-FormInput' value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className='add-formInput-box'>
              <p>Profile Pic</p>
              <input className='add-FormInput' onChange={handleFileChange} type="file" placeholder='Image' />
            </div>
          </div>
        </div>
        {
          previewUrl &&
          <div className='preview-addStudentForm'>
            <img src={previewUrl} alt="no image" />
          </div>
        }
        <div className='addStudent-btnwrapper'>
          <button className='addStudent-btn' type='submit' >Add Student</button>
        </div>
      </form>
    </div>
  )
}

export default AddStudent