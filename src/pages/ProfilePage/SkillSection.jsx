import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Avatar,
  Card,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import SkillAddModal from "./SkillAddModal";
import { useState } from "react";

export default function SkillSection() {

  const [modalstatus,showModal] = useState(false)

  const handleOpen = () => showModal(!modalstatus)

  return (
    <>
      <SkillAddModal status={modalstatus} handleOpen={handleOpen} ></SkillAddModal>
    <Card className="max-w-6xl mx-auto border-2 border-gray-200 rounded-10">

      <div className='flex flex-row justify-between px-3'  >
        <Typography variant="h4" color="blue-gray" className="p-5" >
          Skills
        </Typography>
        <IconButton variant="text" color="blue-gray" className="flex justify-center" onClick={handleOpen} >
          Add
        </IconButton>
      </div>

      <List>
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="candice" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Tania Andrew
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="alexander" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Alexander
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="emma" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Emma Willever
            </Typography>
          </div>
        </ListItem>
      </List>
    </Card>
    </>
  );
}