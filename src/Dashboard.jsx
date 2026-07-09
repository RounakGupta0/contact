import React from 'react'
import photoIcon from './assets/profile photo.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate()

  const Logout =()=>{
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className='dashboard-wrapper'>
      <div className='dashboard-box'>
        <div className='sideNav'>
          <div className='sideNav-header'>
            <img src={photoIcon} alt="icon" />
            <h2>{localStorage.getItem('fullName')}</h2>
          </div>
          <div className='sideNavLink-wrapper'>
            <Link className='sideNav-Link' to='/dashboard/home'><i className="fa-solid fa-house"></i> Home</Link>
            <Link className='sideNav-Link' to='/dashboard/add-student'><i className="fa-solid fa-plus"></i> Add Student</Link>
            <Link className='sideNav-Link' to='/dashboard/student'><i className="fa-solid fa-address-book"></i> Student List</Link>
            {/* <Link className='sideNav-Link' to='/signup'><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</Link> */}
          </div>
          <div className='Logoutbtn-wrapper'>
            <button className='logout-btn' onClick={Logout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
          </div>
        </div>
        <div className='dashboard-content'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard