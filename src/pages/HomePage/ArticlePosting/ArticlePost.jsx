import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  CardFooter,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { apiUrl, defaultUserImageLink } from "../../../constants/constants";
import { HandThumbUpIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as FilledUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAxiosInstance } from "../../../utils/axios-utils";
import { PostDetailModal } from "./PostDetailModal";
import 'react-quill/dist/quill.snow.css'
import './article-style.css'


export default function ArticlePost({ loggeduser, post }) {

  const { like_count, user, comments_count, description } = post
  const article = post.post

  const navigate = useNavigate()

  const articleDivRef = useRef(null);
  const [liked, setLiked] = useState(post.is_liked)
  const [likecount, setLikeCount] = useState(like_count)
  const [commentscount, setCommentsCount] = useState(comments_count)
  const [comments, setComments] = useState([])
  const [readmore, setReadMore] = useState(false)

  const [postdetailmodal, setPostDetailModal] = useState(false);
  const handlePostDetailModal = () => setPostDetailModal(!postdetailmodal);

  const callSetComments = () => {
    postAxiosInstance.get(`/comments/${post.id}/`).then((response) => {
      setComments(response.data)
    })
  }

  const handle_press = () => {
    if (liked == true) {
      postAxiosInstance.post(`un-like-post/`, { user: loggeduser, post: post.id }).then((response) => {
        if (response.status == 204) {
          setLikeCount((prevcount) => {
            return prevcount -= 1
          })
          setLiked(false)
        }
      })
    }
    else if (liked == false) {
      postAxiosInstance.post('like-post/', { user: loggeduser, post: post.id }).then((response) => {
        if (response.status == 201) {
          setLikeCount((prevcount) => {
            return prevcount += 1
          })
          setLiked(true)
        }
      })
    }
  }

  useEffect(() => {
    if (articleDivRef.current) {
      const divHeight = articleDivRef.current.clientHeight;
      if(divHeight>= 480){
        setReadMore(true)
      }
    }
  }, [])


  return (
    <>
      <PostDetailModal liked={liked} handle_press={handle_press} commentscount={commentscount} setCommentsCount={setCommentsCount} comments={comments} refreshComments={callSetComments} post={post} open={postdetailmodal} handleOpen={handlePostDetailModal} />
      <Card className="w-full border shadow-none my-3">
        <CardHeader shadow={false} floated={false} className="border-b m-0 p-3 rounded-0" >
          <Avatar
            onClick={(e) => navigate(`/${user.username}`)}
            src={user.profile_image ? apiUrl + user.profile_image : defaultUserImageLink}
            alt="avatar"
            className="cursor-pointer"
          />
          <span className="text-base px-4 font-semibold cursor-pointer" onClick={(e) => navigate(`/${user.username}`)} >{user.fullname}</span>
        </CardHeader>
        <CardBody className="relative"  >
          {
            article &&
            <>
              <div className="flex min-h-96 max-h-[30rem] align-middle ql-snow overflow-hidden">
                <div ref={articleDivRef} className="ql-editor max-w-md max-h-[30rem] overflow-hidden" dangerouslySetInnerHTML={{ __html: article }} />
              </div>
              {
                readmore ?
                  <div className="absolute min-h-96 max-h-[30rem] empty-div-gradient" >
                    <div className="flex justify-center items-end h-full" >
                      <Button
                        onClick={() => { handlePostDetailModal(), callSetComments() }}
                        color="indigo"
                        className="mb-10"
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                :
                ''
             }
            </>
          }

        </CardBody>
        <CardFooter className="pt-0 border-t text-center">
          <div className="flex ">
            <div className="flex flex-col justify-center me-2 py-2">
              <IconButton variant='text' color="indigo" onClick={handle_press}>
                {
                  liked ?
                    <FilledUpIcon className="w-5 text-indigo" />
                    :
                    <HandThumbUpIcon className="w-5 text-black" />
                }
              </IconButton>
              <p className="text-xs" >{likecount} Likes</p>
            </div>
            <div className="flex flex-col justify-center mx-2">
              <IconButton onClick={() => { handlePostDetailModal(), callSetComments() }} variant='text' color="indigo">
                <ChatBubbleBottomCenterTextIcon className="w-5 text-black" />
              </IconButton>
              <p className="text-xs" >{comments_count} Comments</p>
            </div>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal text-left text-black text-base pt-2 opacity-75"
          >
            <span className="font-semibold text-black text-base" >{user.username}</span> {description}
          </Typography>
        </CardFooter>
      </Card>
    </>
  );
}