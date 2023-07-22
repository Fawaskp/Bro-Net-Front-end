import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  CardHeader,
  IconButton,
} from "@material-tailwind/react";
import ProjectAddModal from "./ProjectAddModal";
import { useState } from "react";

export default function ProjectSection() {

  const [modalstatus,showModal] = useState(false)

  const handleOpen = () => showModal(!modalstatus)

  return (
    <>
    <ProjectAddModal status={modalstatus} handleOpen={handleOpen}  ></ProjectAddModal>
    <Card className="max-w-6xl mx-auto border-2 border-gray-200 rounded-10">
      <div className='flex flex-row justify-between px-3'  >
        <Typography variant="h4" color="blue-gray" className="p-5" >
          Projects
        </Typography>
        <IconButton onClick={handleOpen} variant="text" color="indigo" className="flex justify-center" >
          Add
        </IconButton>
      </div>
      <div className="flex align-middle justify-between px-3" >
        <div className="w-1/2 flex py-4" >
          <img className="w-1/6 h-20 rounded-10" src="https://i.pinimg.com/736x/e3/46/35/e34635d7e861c21b9b9c8513ea0780c1.jpg" alt="" />
          <Typography variant="h4" color="blue-gray" className="p-2" >
            Beatandbase
          </Typography>
        </div>
        <div className="w-1/2 h-1/2 flex justify-end" >
          <img className="w-7 h-7 rounded-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" alt="" />
          <Typography variant="h6" color="blue-gray" className="p-2" >
            <a href="">githublinkofproject/</a>
          </Typography>
        </div>
      </div>
      <div className="flex justify-between" >
        <div className="w-4/6 h-full px-2" >
          <div>
            <div>
              <p className="text-gray-500" >
                This project was completed through a lot of hard work and dedication, often involving long hours into the night and sometimes going without sleep. It was a challenging journey that helped me gain a lot of
              </p>
            </div>
          </div>
        </div>
        <div className="w-2/6 h-full flex justify-end" >
          <List>
            <ListItem style={{ width: '80%', padding: 0 }}>
              <ListItemPrefix>
                <img className="w-4/6 h-12 rounded-10" src="https://i.pinimg.com/736x/e3/46/35/e34635d7e861c21b9b9c8513ea0780c1.jpg" alt="" />
              </ListItemPrefix>
              <div className="hidden md:block">
                <Typography variant="h6" color="blue-gray">
                  Tania Andrew
                </Typography>
              </div>
            </ListItem>

            <ListItem style={{ width: '80%', padding: 0 }} >
              <ListItemPrefix>
                <img className="w-4/6 h-12 rounded-10" src="https://i.pinimg.com/736x/e3/46/35/e34635d7e861c21b9b9c8513ea0780c1.jpg" alt="" />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  Alexander
                </Typography>
              </div>
            </ListItem>
            <ListItem style={{ width: '80%', padding: 0 }} >
              <ListItemPrefix>
                <img className="w-4/6 h-12 rounded-10" src="https://i.pinimg.com/736x/e3/46/35/e34635d7e861c21b9b9c8513ea0780c1.jpg" alt="" />
              </ListItemPrefix>
              <div>
                <Typography color="blue-gray">
                  Emma Willever
                </Typography>
              </div>
            </ListItem>
          </List>
        </div>
      </div>

    </Card>
    </>
  );
}