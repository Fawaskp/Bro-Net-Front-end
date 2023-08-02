import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Button,
  Card,
  Typography,
} from "@material-tailwind/react";
import SkillAddModal from "./SkillAddModal";
import { useEffect, useState } from "react";
import { getLocal } from "../../../helpers/auth";
import jwtDecode from "jwt-decode";
import { userAxiosInstance } from "../../../utils/axios-utils";
import { apiUrl } from "../../../constants/constants";
import { TrashIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@material-tailwind/react'
import { DeleteUserSkill } from "./DeleteModal";

export default function SkillSection() {

  const [userSkills, setUserSkills] = useState([])

  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteModal = () => setDeleteModal(!deleteModal);

  const [deletingInstance, setDeletingInstance] = useState()
  const [editingInstance, setEditingInstance] = useState('')

  const [modalstatus, showModal] = useState(false)
  const handleOpen = () => showModal(!modalstatus)

  const callSetUserSkills = () => {
    const user = getLocal('AuthToken')
    const user_decoded = jwtDecode(user)
    const userId = user_decoded.custom.user_id
    userAxiosInstance.get('/user-profile/' + userId + '/').then((response) => {
      setUserSkills(response.data.skills)
    })
  }

  useEffect(() => {
    document.title = "Your Profile"
    callSetUserSkills()
  }, [])

  return (
    <>
      <DeleteUserSkill open={deleteModal} handleOpen={handleDeleteModal} refresh={callSetUserSkills} instance={deletingInstance} />
      <SkillAddModal status={modalstatus} handleOpen={handleOpen} setUserSkills={callSetUserSkills} ></SkillAddModal>
      <Card className="max-w-6xl mx-auto border-2 border-gray-200 rounded-10 py-3">

        <div className='flex flex-row justify-between px-3 border-b'  >
          <Typography variant="h4" color="blue-gray" className="p-3" >
            Skills
          </Typography>
          <Button onClick={handleOpen} size="sm" color="indigo" className="h-8" >
            Add
          </Button>
        </div>

        <List>
          {
            userSkills.map((skill) => {
              return (
                <ListItem key={skill.name} style={{ background: 'white' }}>
                  <ListItemPrefix>
                    <Avatar size="sm" variant="circular" alt="candice" src={apiUrl + skill.icon} />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {skill.name}
                    </Typography>
                  </div>
                  <div className="w-full flex justify-end " >
                    <IconButton onClick={() => { setDeletingInstance({ id: skill.id, name: skill.name }), handleDeleteModal() }} className='rounded-10' size='sm' variant="text" color="red">
                      <TrashIcon className='w-5' />
                    </IconButton>
                  </div>
                </ListItem>
              )
            })
          }
          {userSkills.length < 1 ? <h1 className="py-2 px-2" >Not added any skills</h1> : ''}
        </List>
      </Card>
    </>
  );
}