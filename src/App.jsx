import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Dashboard from './Dashboard'
import './App.css'
import { ToastContainer } from 'react-toastify'
import Home from './dashboard/Home'
import AddStudent from './dashboard/AddStudent'
import Student from './dashboard/Student'
// import StudentDetails from './dashboard/StudentDetails'
import StudentData from './dashboard/StudentData'

const App = () => {
  return (
    <div>
      {/* <nav>
        <Link to='/login'>login</Link>
        <Link to='/signup'>signup</Link>
        <Link to='/dashboard'>dashboard</Link>
      </nav> */}
      <div className='app-wrapper'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} >
            <Route path='' element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='add-student' element={<AddStudent />} />
            <Route path='student' element={<Student />} />
            {/* <Route path='student/studentDetails' element={<StudentDetails />} /> */}
            <Route path='student/studentData/:id' element={<StudentData/>}/>
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App