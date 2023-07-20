import React, { useEffect, useState } from 'react'
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
  const [start,setStart] = useState(false)


useEffect(()=>{
    document.title = "Home"
    const user = getLocal('AuthToken')
      if (!user) {
        toast.warn('User Not Authenticated')
        navigate('/auth/login')
      }
      else{
        const user_decoded = jwtDecode(user).custom
        console.log('decoded user',user_decoded);
        if(!user_decoded.is_profile_completed) {navigate('/auth/complete-profile/');console.log('me also');}
        else setStart(true)
      }
  },[])

  if(start)
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
