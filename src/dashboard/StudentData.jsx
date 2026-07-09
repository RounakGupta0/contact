import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert2'

const apiUrl = import.meta.env.VITE_API_URL

const StudentData = () => {

    const [studentData, setStudentData] = useState({})
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const navigate = useNavigate()

    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        StudentDetails()
    }, [])

    const StudentDetails = async () => {
        setLoading(true)
        console.log('function call ho rha')
        try {
            const res = await axios.get(`${apiUrl}/contact/contactById/` + id, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res)
            setStudentData(res.data.contact)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const deleteStudent = async () => {
        console.log('delete api call hua')
        setDeleting(true)
        try {
            await axios.delete(`${apiUrl}/contact/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log('deleted that contact')
            console.log(id)
            setDeleting(false)
            navigate('/dashboard/student')
        }
        catch (err) {
            console.log(err)
            setDeleting(false)
        }
    }

    const deleteConfirmation = async () => {
        const result = await swal.fire({
            title: "Delete Student?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",

            // cancelButtonColor:'#3339f2',
            confirmButtonColor:'#d33'
        });

        if (result.isConfirmed) {
            deleteStudent()
        }
    }

    return (
        <div className='studentDetails-wrapper'>
            <div className='studentDetails-header'>
                <h1>Student Details</h1>
            </div>
            {
                loading ?
                    <div className='studentList-loaderBox'>
                        <p className='studentList-loader'><i className="fa-solid fa-spinner fa-spin-pulse "></i></p>
                    </div> :
                    <div className='studentDetails-box' key={studentData._id}>
                        <img src={studentData.imageUrl} alt="no image" />
                        <div className='studentDetails-data'>
                            <p><span className='studentData-label' >Name</span>     <span className='studentData-colon' >:</span> {studentData.fullName}</p>
                            <p><span className='studentData-label' >Email</span>    <span className='studentData-colon' >:</span> {studentData.email}</p>
                            <p><span className='studentData-label' >Phone</span>    <span className='studentData-colon' >:</span> {studentData.phone}</p>
                            <p><span className='studentData-label' >Address</span>  <span className='studentData-colon' >:</span> {studentData.address}</p>
                            <p><span className='studentData-label' >Gender</span>   <span className='studentData-colon' >:</span> {studentData.gender}</p>
                        </div>
                    </div>
            }
            {
                !loading &&
                <div className='studentDetails-btn'>
                    <button className='edit-btn' type='button'><span><i className="fa-solid fa-pen-to-square"></i></span>Edit</button>
                    <button onClick={deleteConfirmation} className='delete-btn' type='button'>
                        {
                            deleting && <span><i className="fa-solid fa-spinner fa-spin-pulse "></i> Deleting</span>
                        }
                        {
                            !deleting && <span><i className="fa-solid fa-trash-can"></i> Delete</span>
                        }
                    </button>
                </div>
            }
            {
                !loading &&
                <div className='studentDetails-btn'>
                    <button onClick={() => navigate('/dashboard/student')} className='studentDetails-cancel-btn'>Cancel</button>
                </div>
            }
        </div>
    )
}

export default StudentData