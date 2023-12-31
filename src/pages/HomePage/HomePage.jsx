import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Banner from './Banner';
import LeftBar from './LeftBar';
import ImagePost from './ImagePosting/ImagePost';
import { getLocal } from '../../helpers/auth';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ImageSelectModal } from './ImagePosting/ImageSelectModal';
import { postAxiosInstance } from '../../utils/axios-utils';
import { VideoSelectModal } from './VideoPosting/VideoSelectModal';
import VideoPost from './VideoPosting/VideoPost';
import PollPost from './PollPosting/PollPost';
import { PollPostModal } from './PollPosting/PollPostModal';
import AdminMessages from './AdminMessages';
import ArticlePost from './ArticlePosting/ArticlePost';
import './HomePage.css'
import InfiniteScroll from 'react-infinite-scroll-component';

function HomePage() {

  const [posts, setPosts] = useState([])
  const [totalpostcount, setTotalPostCount] = useState([])
  const [pagenumber, setPageNumber] = useState(1)
  const [hasmore, setHasMore] = useState(true)
  const [loggeduser, setLoggedUer] = useState('')
  const fetchPosts = (user = loggeduser, is_first_load = false) => {
    postAxiosInstance.get(`get-posts/${user}/`).then((response) => {
      if (response.status == 200) {
        setPosts(response.data.results)
        if (is_first_load == true) {
          setTotalPostCount(response.data.count)
          console.log("Total Count :: ", totalpostcount);
        }
      }
    }).catch((err) => console.log(err))
  }
  const fetchNextPosts = (user = loggeduser) => {
    setTimeout(() => {
      console.log('requesting ::>> ', `get-posts/${user}/?page=${pagenumber}`);
      postAxiosInstance.get(`get-posts/${user}/?page=${pagenumber}`).then((response) => {
        if (response.status == 200) {
          setPageNumber(pagenumber + 1)
          setPosts([...posts, ...response.data.results])
          if(posts.length == totalpostcount){
            setHasMore(false)
          }
        }
      }).catch((err) => console.log(err))
    }, 1)
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
      fetchPosts(user_decoded.user_id, true)
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
            <div className="left-section mt-3">
              <LeftBar refreshPosts={fetchPosts} handlePoll={handlePollModal} handleImage={handleImageModal} handleVideo={handleVideoModal} />
            </div>
            <div className="posts-section">
              <div>
                <InfiniteScroll
                  dataLength={posts.length}
                  loader={<h1>Loading...</h1>}
                  endMessage={<h1 className='font-bold text-2xl' > You CatechUp all!! </h1>}
                  hasMore={hasmore}
                  next={fetchNextPosts}
                >
                  {
                    posts.map((post, idx) => {
                      if (post.type == 'image' && post.post) {
                        return (
                          <ImagePost loggeduser={loggeduser} post={post} />
                        )
                      }
                      else if (post.type == 'video' && post.post) {
                        return (
                          <VideoPost loggeduser={loggeduser} post={post} />
                        )
                      }
                      else if (post.type == 'poll' && post.post) {
                        return (
                          <PollPost loggeduser={loggeduser} post={post} />
                        )
                      }
                      else if (post.type == 'article' && post.post) {
                        return (
                          <ArticlePost loggeduser={loggeduser} post={post} />
                        )
                      }
                    })
                  }
                </InfiniteScroll>
                {
                  posts.length < 1 &&
                  <h1 className='font-bold text-xl mx-auto py-14 ' >Sorry No posts to show</h1>
                }
              </div>
            </div>
            <div className="right-section mt-3">
              <AdminMessages />
            </div>
          </div>
        </div>
      </>
    )
}

export default HomePage
