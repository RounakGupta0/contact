import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import defaultIcon from '../assets/default image.webp'
import { Link, useNavigate, useParams } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL

const EditStudent = () => {

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('Male')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    StudentDetails()
  }, [])

  const StudentDetails = async () => {
    setLoading(true)
    console.log('function call ho rha')
    try {
      setLoading(true)
      const res = await axios.get(`${apiUrl}/contact/contactById/` + id, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      // console.log(res.data.contact)
      setFullName(res.data.contact.fullName)
      setEmail(res.data.contact.email)
      setAddress(res.data.contact.address)
      setGender(res.data.contact.gender)
      setPhone(res.data.contact.phone)
      setImage(res.data.contact.imageUrl)
      setLoading(false)
    }
    catch (err) {
      console.log(err)
      await toast.error('Something is wrong', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setLoading(false)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {

      setEditing(true)

      const editedContact = new FormData()
      editedContact.append('fullName', fullName)
      editedContact.append('email', email)
      editedContact.append('phone', phone)
      editedContact.append('address', address)
      editedContact.append('gender', gender)
      if (image) {
        editedContact.append('photo', image)
      }

      console.log(editedContact)

      const res = await axios.put(`${apiUrl}/contact/update/${id}`, editedContact, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      toast.success('Edited Successfully 🎉', {
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
      setEditing(false)
      navigate(`/dashboard/student/studentData/${id}`)
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
        onClose: () => navigate(`/dashboard/studentData/${id}`)
      });
      setEditing(false)
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
      setImage(image)
      setPreviewUrl('')
    }
  }

  return (

    <div className='add-student'>
      <div className='add-studentHeader'>
        <h2>Edit Student</h2>
      </div>
      {
        loading ?
          <div className='studentList-loaderBox'>
            <p className='studentList-loader'><i className="fa-solid fa-spinner fa-spin-pulse "></i></p>
          </div>
          :
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
                  <input className='add-FormInput' onChange={handleFileChange} type="file" placeholder='Image' />
                </div>
              </div>
            </div>
            {
              previewUrl ?
                <div className='preview-addStudentForm'>
                  <p>New Image preview</p>
                  <img src={previewUrl} alt="no image" />
                </div>
                :
                <div className='preview-addStudentForm'>
                  <p>Previous Image <span><i className="fa-solid fa-arrow-right-long"></i></span></p>
                  <img src={image} alt="previous image" />
                </div>
            }
            <div className='addStudent-btnwrapper'>
              <button className='addStudent-btn' type='submit' >{editing && <span ><i className='loader' className="fa-solid fa-spinner fa-spin-pulse"></i></span>}{editing ? 'Editing Contact' : 'Edit Student'}</button>
            </div>
          </form>
      }
    </div>
  )
}

export default EditStudent