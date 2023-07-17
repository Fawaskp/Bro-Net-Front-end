import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Banner from './Banner';
import LeftBar from './LeftBar';
import Posts from './Posts';
import './HomePage.css'
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function HomePage() {

  const navigate = useNavigate()

  useEffect(()=>{
    const user = getLocal('AuthToken')
      if (!user) {
        toast.warn('User Not Authenticated')
        navigate('/auth/')
      }
      else{
        const user_decoded = jwtDecode(user)
      }
  })

  return (
    <>
      <Navbar />
      <div className='mx-auto' >
        <Banner />
      </div>
      <div className='max-w-screen-xl mx-auto' >
        <div className="grid-container">
          <div className="left-section">
            <LeftBar />
          </div>
          <div className="posts-section">
            <div className="grid-posts">
              <Posts />
              <Posts />
              <Posts />
              <Posts />
            </div>
          </div>
          <div className="right-section">
          <LeftBar />
        </div>
        </div>
      </div>


    </>
  )
}

export default HomePage
