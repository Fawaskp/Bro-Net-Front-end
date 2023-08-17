import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  CardFooter,
  Carousel,
  IconButton,
} from "@material-tailwind/react";
import { apiUrl, defaultUserImageLink } from "../../../constants/constants";
import { HandThumbUpIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as FilledUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAxiosInstance } from "../../../utils/axios-utils";
import { PostDetailModal } from "./PostDetailModal";

export default function ImagePost({ post }) {

  const { like_count, user, comments_count, description } = post
  const images = post.post

  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [likecount, setLikeCount] = useState(like_count)
  const [commentscount, setCommentsCount] = useState(comments_count)
  const [comments, setComments] = useState([])

  const [postdetailmodal, setPostDetailModal] = useState(false);
  const handlePostDetailModal = () => setPostDetailModal(!postdetailmodal);

  const callSetComments = () => {
    postAxiosInstance.get(`/comments/${post.id}/`).then((response) => {
      setComments(response.data)
    })
  }

  const like_post = () => {
    postAxiosInstance.put('like-post/' + post.id + '/').then((response) => {
      if (response.status == 200) {
        setLikeCount((prevcount) => {
          return prevcount += 1
        })
        setLiked(true)
      }

    })
  }

  return (
    <>
      <PostDetailModal commentscount={commentscount} setCommentsCount={setCommentsCount} comments={comments} refreshComments={callSetComments} post={post} open={postdetailmodal} handleOpen={handlePostDetailModal} />
      <Card className="w-full border shadow-none">
        <CardHeader shadow={false} floated={false} className="border-b m-0 p-3 rounded-0" >
          <Avatar
            onClick={(e) => navigate(`/${user.username}`)}
            src={user.profile_image ? apiUrl + user.profile_image : defaultUserImageLink}
            alt="avatar"
            className="cursor-pointer"
          />
          <span className="text-base px-4 font-semibold cursor-pointer" onClick={(e) => navigate(`/${user.username}`)} >{user.fullname}</span>
        </CardHeader>
        <CardBody className="p-0" >
          {
            images?.length > 1 ?
              <Carousel>
                {
                  images.map((imageurl, idx) => {
                    return (
                      <div key={idx} className="flex justify-center align-middle" >
                        <img
                          onDoubleClick={like_post}
                          src={apiUrl + imageurl}
                          alt='Post Image'
                          className="mx-auto"
                        />
                      </div>
                    )
                  })
                }
              </Carousel>
              :
              <div className="flex justify-center items-center min-h-96">
                <img
                  onDoubleClick={like_post}
                  src={apiUrl + images}
                  alt='Post Image'
                  className="mx-auto h-max"
                />
              </div>
          }

        </CardBody>
        <CardFooter className="pt-0 border-t text-center">
          <div className="flex ">
            <div className="flex flex-col justify-center me-2 py-2">
              <IconButton variant='text' color="indigo" onClick={() => setLiked(!liked)}  >
                {
                  liked ?
                    <FilledUpIcon className="w-5 text-indigo" />
                    :
                    <HandThumbUpIcon onClick={like_post} className="w-5 text-black" />
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