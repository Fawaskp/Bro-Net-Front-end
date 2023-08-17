import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Progress,
} from "@material-tailwind/react";
import './poll.css'

export default function PollPost({ post }) {

  const options = post.post

  return (
    <Card className="w-full border shadow-none">
      <CardHeader shadow={false} floated={false} className="border-b m-0 p-3 rounded-0" >
        <Avatar
          src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
          alt="avatar"
          className="cursor-pointer"
        />
        <span className="text-base px-4 font-semibold cursor-pointer">THe user fullname</span>
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
                return (
                  <div className='w-full bg-gray-100 p-3 rounded-10 my-3 mx-auto cursor-pointer' >
                    <span className="" >{option}</span>
                    <Progress className="parent-of-progress-bar" value={80} variant="gradient" color="indigo" size="sm" />
                  </div>
                )
              })
            }
            {/* <div className='w-full bg-indigo-800 border text-white border-indigo-800 p-3 rounded-10 my-3 mx-auto cursor-pointer' >
              <span className="" >this one</span>
              <Progress className="parent-of-progress-bar" value={80} variant="gradient" color="customColor" size="sm" />
            </div> */}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}