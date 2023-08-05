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
   
  export default function LeftBar() {
    return (
      <Card className="sticky top-24 w-64 border rounded-10 m-2 p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4 w-full">
          <Typography variant="h6" color="blue-gray">
            Create a post
          </Typography>
        </div>
        <List className="text-sm"  >
          <ListItem>
            <ListItemPrefix>
              <PhotoIcon className="h-5 w-5" />
            </ListItemPrefix>
            Picture
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <VideoCameraIcon className="h-5 w-5" />
            </ListItemPrefix>
            Video
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <NewspaperIcon className="h-5 w-5" />
            </ListItemPrefix>
            Article
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
        </List>
      </Card>
    );
  }