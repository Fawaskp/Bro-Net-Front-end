import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    VideoCameraIcon,
    PhotoIcon,
    ChartBarIcon,
    NewspaperIcon,
  } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
   
  export default function LeftBar({handleImage,handleVideo}) {

    const navigate = useNavigate()

    return (
      <Card className="sticky top-24 w-64 border rounded-10 m-2 p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4 w-full">
          <Typography variant="h6" color="blue-gray">
            Create a post
          </Typography>
        </div>
        <List className="text-sm"  >
          <ListItem onClick={(e)=>handleImage()} >
            <ListItemPrefix>
              <PhotoIcon className="h-5 w-5" />
            </ListItemPrefix>
            Picture
          </ListItem>
          <ListItem onClick={(e)=>handleVideo()} >
            <ListItemPrefix>
              <VideoCameraIcon className="h-5 w-5" />
            </ListItemPrefix>
            Video
          </ListItem>
          <ListItem onClick={()=>navigate('/post/new/')} >
            <ListItemPrefix>
              <NewspaperIcon className="h-5 w-5" />
            </ListItemPrefix>
            Article
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Poll
          </ListItem>
        </List>
      </Card>
    );
  }