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
import { ImageSelectModal } from './ImagePosting/ImageSelectModal';
import { postAxiosInstance } from '../../utils/axios-utils';


function HomePage() {

  const [posts, setPosts] = useState([])

  const fetchPosts = () => {
    postAxiosInstance.get('get-posts/').then((response) => {
      if (response.status == 200) {
        setPosts(response.data)
      }
    }).catch((err) => console.log(err))
  }

  const [openimagemodal, setOpenImageModal] = React.useState(false);
  const handleImageModal = () => setOpenImageModal(!openimagemodal);

  const navigate = useNavigate()
  const [start, setStart] = useState(false)


  useEffect(() => {
    document.title = "Home"
    fetchPosts()
    const user = getLocal('AuthToken')
    if (!user) {
      toast.warn('User Not Authenticated')
      navigate('/auth/login')
    }
    else {
      const user_decoded = jwtDecode(user).custom
      console.log('decoded user homepage', user_decoded);
      if (!user_decoded.is_profile_completed) { navigate('/auth/complete-profile/') }
      else setStart(true)
    }
  }, [])

  if (start)
    return (
      <>
        <ImageSelectModal fetchPosts={fetchPosts} open={openimagemodal} handleOpen={handleImageModal} />
        <Navbar />
        <div className='mx-auto' >
          <Banner />
        </div>
        <div className='max-w-screen-xl mx-auto' >
          <div className="grid-container">
            <div className="left-section">
              <LeftBar handleImage={handleImageModal} />
            </div>
            <div className="posts-section">
              <div className="grid-posts">
                {
                  posts.map((post) => {
                    return (
                    <Posts profile_img={post.user.profile_img} images={post.images} fullname={post.user.fullname} description={post.description} />
                    )
                  })
                }
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
