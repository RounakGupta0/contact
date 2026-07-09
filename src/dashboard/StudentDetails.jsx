// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'

// const StudentDetails = () => {

//     const apiUrl = import.meta.env.VITE_API_URL
//     const [studentData, setStudentData] = useState({})

//     const { state } = useLocation()
//     // console.log(state)

//     useEffect(() => {
//         studentDetail()
//     }, []);

//     const studentDetail = async () => {
//         // console.log(state.fullName)
//         try {
//             console.log('function call hua hai')
//             const res = await axios.get(`${apiUrl}/contact/contactById/` + state._id, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 }
//             })
//             // console.log(res)
//             setStudentData(res.data.contact)
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }


//     return (
//         <div>
//             <h1>Student Details</h1>
//             <div key={studentData._id}>
//                 <img src={studentData.imageUrl} alt="no image" />
//                 <h2>{studentData.fullName}</h2>
//                 <p>{studentData.email}</p>
//                 <p>{studentData.phone}</p>
//                 <p>{studentData.address}</p>
//                 <p>{studentData.gender}</p>
//             </div>
//         </div>
//     )
// }

// export default StudentDetails