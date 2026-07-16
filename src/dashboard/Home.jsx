import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL

const Home = () => {

  useEffect(() => {
    homeData()
  }, [])

  const navigate = useNavigate()

  const [dataCount, setdataCount] = useState('')
  const [maleCount, setMaleCount] = useState('')
  const [femaleCount, setFemaleCount] = useState('')
  const [recentList, setRecentList] = useState([])
  const [loader, setLoader] = useState(true)

  const homeData = async () => {
    setLoader(true)
    try {
      const res = await axios.get(`${apiUrl}/contact/dashboard/home`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(res.data.data)
      setdataCount(res.data.data.totalContact)
      setMaleCount(res.data.data.maleCount)
      setFemaleCount(res.data.data.femaleCount)
      setRecentList(res.data.data.recent)
      setLoader(false)
    }
    catch (err) {
      console.log(err)
      setLoader(false)
    }
  }

  return (
    <>
      {
        loader ?
          <div className='home-loader'>
            <p className='studentList-loader'><i className="fa-solid fa-spinner fa-spin-pulse "></i></p>
          </div>
          :
          <div className='home-wrapper'>
            <div className='studentDetails-header'>
              <h1>HOME</h1>
            </div>

            <div className='count-wrapper'>
              <div onClick={()=>navigate('/dashboard/student')} className='count-box total-count'>
                <h2>Total Students</h2>
                <h3>{dataCount}</h3>
              </div>

              <div className='count-box'>
                <h2>Male Students</h2>
                <h3>{maleCount}</h3>
              </div >

              <div className='count-box'>
                <h2>Female Students</h2>
                <h3>{femaleCount}</h3>
              </div>
            </div>

            <div className='analytics-wrapper'>
              <div className='chart-box'>
                pie chart
              </div>

              <div className='recent-wrapper'>
                <div className='recent-tag'>
                  <p>Recent</p>
                </div>
                {
                  recentList.map((data) => (
                    <div onClick={()=>navigate(`/dashboard/student/studentData/${data._id}`)} className='recent-item' key={data._id}>
                      <div className='recentItem-image'>
                        <img src={data.imageUrl} alt="no image" />
                      </div>
                      <div className='recentItem-details'>
                        <h3>{data.fullName}</h3>
                        <p>{data.phone}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Home