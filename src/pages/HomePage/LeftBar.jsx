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
    ArrowPathIcon,
  } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

   
  export default function LeftBar({refreshPosts,handlePoll,handleImage,handleVideo}) {

    const navigate = useNavigate()
    const [loadspinning, setLoadSpinning] = useState(false);

    return (
      <Card className="sticky top-24 border rounded-10 p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4 w-full flex justify-between">
          <Typography variant="h6" color="blue-gray">
            Create a post
          </Typography>
          <ArrowPathIcon
          title="Get New Posts"
          className={`w-5 cursor-pointer hover:text-indigo-800 transition-all duration-200 ${loadspinning ? 'animate-spin' : ''}`}
          onClick={() => {
            refreshPosts()
            setLoadSpinning(true);
            setTimeout(() => {
              setLoadSpinning(false);
            }, 500)
          }} 
        />
        </div>
        <List className="text-sm"  >
          <ListItem onClick={()=>handleImage()} >
            <ListItemPrefix>
              <PhotoIcon className="h-5 w-5" />
            </ListItemPrefix>
            Picture
          </ListItem>
          <ListItem onClick={()=>handleVideo()} >
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
          <ListItem onClick={()=>handlePoll()} >
            <ListItemPrefix>
              <ChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Poll
          </ListItem>
        </List>
      </Card>
    );
  }