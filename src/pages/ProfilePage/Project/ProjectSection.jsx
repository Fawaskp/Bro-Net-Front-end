import {
  List,
  ListItem,
  ListItemPrefix,
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";

import ProjectAddModal from "./ProjectAddModal";
import { useEffect, useState } from "react";
import { getLocal } from "../../../helpers/auth";
import jwtDecode from "jwt-decode";
import { userAxiosInstance } from "../../../utils/axios-utils";
import { defaultUserImageLink } from "../../../constants/constants";
import { getSingleSkill } from ".././api";

export default function ProjectSection() {

  const [userProjects, setUserProjects] = useState([])
  const [showAll, setShowAll] = useState(false);
  const projectsToShow = showAll ? userProjects : userProjects.slice(0, 3);

  const handleShowAllClick = () => {
    setShowAll(true);
  };


  const [modalstatus, showModal] = useState(false)
  const handleOpen = () => showModal(!modalstatus)

  document.title = "Your Profile"
  const user = getLocal('AuthToken')
  const user_decoded = jwtDecode(user)
  const userId = user_decoded.custom.user_id

  const callSetUserProjects = () => {
    userAxiosInstance.get(`/project/${userId}/`).then((response) => {
      setUserProjects(response.data)
    })
  }

  useEffect(() => {
    callSetUserProjects()
    getSingleSkill(1)
  }, [])

  return (
    <>
      <ProjectAddModal open={modalstatus} handleOpen={handleOpen} refresh={callSetUserProjects}  ></ProjectAddModal>
      <Card className="max-w-6xl mx-auto border-2 border-gray-200 rounded-10 py-3">
        <div className='flex flex-row justify-between px-3'  >
          <Typography variant="h4" color="blue-gray" className="p-3" >
            Projects
          </Typography>
          <Button onClick={handleOpen} size="sm" color="indigo" className="h-8" >
            Add
          </Button>
        </div>
        {
          projectsToShow.map((project, index) => {
            return (
              <>
                <div key={project.name} className="border-t py-6 px-4" >
                  <div className="flex align-middle justify-between px-3" >
                    <div className="w-1/2 flex py-4" >
                      <img className="w-1/12 rounded-10" src={project.logo ? project.logo : defaultUserImageLink} alt="" />
                      <Typography variant="h5" color="blue-gray" className="p-2" >
                        {project.name}
                      </Typography>
                    </div>
                    <div className="w-1/2 h-1/2 flex justify-end" >
                      <div className="flex align-middle text-sm font-semibold" >
                        <img className="w-7 h-7 rounded-10 mx-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" alt="" />
                        <span className="flex justify-center align-middle" >
                          <a target="_blank" href={project.repository_link} >{project.name}</a>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between" >
                    <div className="w-4/6 h-full px-2" >
                      <div>
                        <div>
                          <p className="text-gray-500 text-sm" >
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/6 h-full flex justify-end" >
                      <List>
                        {
                          project.skills_used.map((skill) => {
                            return (
                              <ListItem style={{ width: '60%', padding: '7px 7px' }} key={skill.name} >
                                <ListItemPrefix>
                                  <img className="w-7 rounded-10" src={skill.icon} alt="" />
                                </ListItemPrefix>
                                <div className="hidden md:block">
                                  <Typography color="blue-gray">
                                    {skill.name}
                                  </Typography>
                                </div>
                              </ListItem>
                            )
                          })
                        }
                      </List>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }
        {userProjects.length < 1 ? <h1 className="font-semibold p-5">No Projects found!</h1> : ''}
        {!showAll && userProjects.length > 3 && (
          <div className="flex justify-center border-t pt-7 my-2">
            <button
              onClick={handleShowAllClick}
              className="bg-indigo-600 px-4 py-2 rounded-md
             text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none"
            >
              Show All Projects
            </button>
          </div>
        )}
      </Card>
    </>
  );
}