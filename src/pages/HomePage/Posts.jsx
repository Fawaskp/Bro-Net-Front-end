import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  CardFooter,
  Carousel,
  IconButton,
} from "@material-tailwind/react";
import { apiUrl } from "../../constants/constants";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/outline";

export default function Posts({ fullname, images, description, profile_img }) {
  return (
    <Card className="w-96 border shadow-none">
      <CardHeader shadow={false} floated={false} className="border-b m-0 p-3 rounded-0" >
        <Avatar
          src={apiUrl + profile_img}
          alt="avatar"
        />
        <span className="text-base px-4 font-semibold" >{fullname}</span>
      </CardHeader>
      <CardBody>
        <Carousel>
          {
            images.map((imageurl) => {
              return (
                <div className="flex justify-center align-middle" >
                  <img
                    src={apiUrl + imageurl}
                    alt='Post Image'
                    className="mx-auto h-max"
                  />
                </div>
              )
            })
          }
        </Carousel>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 border-t">
        <div className="flex flex-row align-middle" >
          <IconButton variant='text' >
            <HandThumbUpIcon className="w-6 text-black" />
          </IconButton>
          <IconButton variant='text' >
            <HandThumbDownIcon className="w-6 text-black" />
          </IconButton>
        </div>
      </CardFooter>
    </Card>
  );
}