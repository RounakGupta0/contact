import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL


const Student = () => {

  useEffect(() => {
    getStudentList()
  }, []);

  const navigate = useNavigate()

  const [StudentList, setStudentList] = useState([])
  const [loading, setLoading] = useState(false)

  const getStudentList = async () => {
    // console.log('student list ka function call ho gya')
    setLoading(true)
    try {
      const res = await axios.get(`${apiUrl}/contact/get-contact`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      // console.log(res)
      setStudentList(res.data.contacts)
      setLoading(false)
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

  return (
    <div className='studentList-wrapper'>

      <h1>Students List </h1>
      {
        loading ?
          <div className='studentList-loaderBox'>
            <p className='studentList-loader'><i className="fa-solid fa-spinner fa-spin-pulse "></i></p>
          </div>
          :
          <div className='student-List'>
            {
              StudentList.map((data) => (
                // <div onClick={() => { navigate('/dashboard/student/studentDetails', { state: data }) }} className='studentList-box' key={data._id}>
                <div onClick={() => { navigate('/dashboard/student/studentData/'+data._id) }} className='studentList-box' key={data._id}>
                  <img src={data.imageUrl} alt="not found" />
                  <div className='studentList-details'>
                    <h3>{data.fullName}</h3>
                    <p>Email : {data.email}</p>
                  </div>
                </div>
              ))}
          </div>
      }
    </div>
  )

}

export default Student