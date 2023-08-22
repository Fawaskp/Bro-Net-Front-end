import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Progress,
} from "@material-tailwind/react";
import './poll.css'
import { postAxiosInstance } from "../../../utils/axios-utils";
import { apiUrl } from "../../../constants/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PollPost({ loggeduser, post }) {

  const navigate = useNavigate()

  const [options, setOptions] = useState(post.post)
  const sumResponseCount = options.reduce((sum, item) => sum + item.respond_count, 0);
  const [selectedid, setSelectedId] = useState(post.poll_selected_option)
  const { user } = post

  const selectOption = (id) => {
    postAxiosInstance.post('poll-post-respond/', { user: loggeduser, post_poll: id }).then((response) => {
      if (response.status == 200) {
        console.log('Custom Data ::>> ', response);
        setOptions(response.data)
        setSelectedId(id)
      }
    })
  }

  return (
    <Card className="w-full border shadow-none my-3">
      <CardHeader shadow={false} floated={false} className="border-b rounded-b-none m-0 p-3" >
        <Avatar
          onClick={(e) => navigate(`/${user.username}`)}
          src={user.profile_image ? apiUrl + user.profile_image : defaultUserImageLink}
          alt="avatar"
          className="cursor-pointer"
        />
        <span className="text-base px-4 font-semibold cursor-pointer" onClick={(e) => navigate(`/${user.username}`)} >{user.fullname}</span>
      </CardHeader>
      <CardBody className="p-0" >
        <div className="flex flex-col p-6">
          <div>
            <p className='font-bold text-lg' >
              {post.poll_subject}
            </p>
          </div>
          <div>
            {
              options.map((option) => {
                if (option.id == selectedid) {
                  return (
                    <div className='w-full bg-indigo-800 border text-light-blue-50 p-3 rounded-10 my-3 mx-auto cursor-pointer transition-transform duration-300' >
                      <div className="flex justify-between" >
                        <span className="" >{option.option}</span>
                        <span className="">
                          {option.respond_count != 0 ? Math.round((option.respond_count / sumResponseCount) * 100) : 0}%
                        </span>
                      </div>
                      <Progress className="parent-of-progress-bar progress-white-bar" style={{backgroundColor:'darkgray'}} value={(option.respond_count / sumResponseCount) * 100} variant="filled"  size="sm" />
                    </div>
                  )
                }
                else {
                  return (
                    <div onClick={() => selectOption(option.id)} className='w-full bg-gray-100 p-3 rounded-10 my-3 mx-auto cursor-pointer hover:scale-105 transition-transform duration-300' >
                      <div className="flex justify-between" >
                        <span className="" >{option.option}</span>
                        <span className="">
                          {option.respond_count != 0 ? Math.round((option.respond_count / sumResponseCount) * 100) : 0}%
                        </span>
                      </div>
                      <Progress className="parent-of-progress-bar" value={Math.round((option.respond_count / sumResponseCount) * 100)} variant="gradient" color="indigo" size="sm" />
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
      </CardBody>
    </Card>
  );
}