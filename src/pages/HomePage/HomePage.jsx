import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Banner from './Banner';
import LeftBar from './LeftBar';
import ImagePost from './ImagePosting/ImagePost';
import './HomePage.css'
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ImageSelectModal } from './ImagePosting/ImageSelectModal';
import { postAxiosInstance } from '../../utils/axios-utils';
import { VideoSelectModal } from './VideoPosting/VideoSelectModal';
import VideoPost from './VideoPosting/VideoPost';

import {
  CardBody,
  CardHeader,
  Card,
  Avatar,
} from "@material-tailwind/react";
import { HandThumbUpIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import PollPost from './PollPosting/PollPost';
import { PollPostModal } from './PollPosting/PollPostModal';

function HomePage() {

  const [posts, setPosts] = useState([])
  const [loggeduser, setLoggedUer] = useState('')
  const fetchPosts = (user = loggeduser) => {
    postAxiosInstance.get(`get-posts/${user}/`).then((response) => {
      if (response.status == 200) {
        setPosts(response.data)
      }
    }).catch((err) => console.log(err))
  }

  const [openimagemodal, setOpenImageModal] = useState(false);
  const handleImageModal = () => setOpenImageModal(!openimagemodal);

  const [openvideomodal, setOpenVideoModal] = useState(false);
  const handleVideoModal = () => setOpenVideoModal(!openvideomodal);

  const [openpollmodal, setOpenPollModal] = useState(false);
  const handlePollModal = () => setOpenPollModal(!openpollmodal);

  const navigate = useNavigate()
  const [start, setStart] = useState(false)


  useEffect(() => {
    document.title = "Home"
    const user = getLocal('AuthToken')
    if (!user) {
      toast.warn('User Not Authenticated')
      navigate('/auth/login')
    }
    else {
      const user_decoded = jwtDecode(user).custom
      setLoggedUer(user_decoded.user_id)
      fetchPosts(user_decoded.user_id)
      if (!user_decoded.is_profile_completed) { navigate('/auth/complete-profile/') }
      else setStart(true)
    }
  }, [])

  if (start)
    return (
      <>
        <ImageSelectModal fetchPosts={fetchPosts} open={openimagemodal} handleOpen={handleImageModal} />
        <VideoSelectModal fetchPosts={fetchPosts} open={openvideomodal} handleOpen={handleVideoModal} />
        <PollPostModal open={openpollmodal} handleOpen={handlePollModal} />
        <Navbar />
        <div className='mx-auto' >
          <Banner />
        </div>
        <div className='max-w-screen-xl mx-auto' >
          <div className="grid-container">
            <div className="left-section">
              <LeftBar handlePoll={handlePollModal} handleImage={handleImageModal} handleVideo={handleVideoModal} />
            </div>
            <div className="posts-section">
              <div className="grid-posts">
                {
                  posts.map((post, idx) => {
                    if (post.type == 'image' && post.post) {
                      return (
                        <ImagePost post={post} />
                      )
                    }
                    else if (post.type == 'video' && post.post) {
                      return (
                        <VideoPost post={post} />
                      )
                    }
                    else if (post.type == 'poll' && post.post) {
                      return (
                        <PollPost post={post} />
                      )
                    }
                  })
                }
                {
                  posts.length < 1 &&
                  <h1 className='font-bold text-xl mx-auto py-14 ' >Sorry No posts to show</h1>
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
