import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { suAxiosInstance } from "../../../utils/axios-utils";
import { apiUrl, defaultUserImageLink } from "../../../constants/constants";
import { AddSocialMediaModal } from "./AddModal";
import { DeleteSocialMediaModal } from "./DeleteModal";
import { EditSocialMediaModal } from "./EditModal";

const TABLE_HEAD = ['icon', ''];


export function SocialMediaTable() {

  const [addModal, setAddModal] = useState(false);
  const handleAddModal = () => setAddModal(!addModal);

  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteModal = () => setDeleteModal(!deleteModal);

  const [editModal, setEditModal] = useState(false);
  const handleEditModal = () => setEditModal(!editModal);

  const [deletingInstance,setDeletingInstance] = useState()
  const [editingInstance,setEditingInstance] = useState('')

  const [social_media, setSocialMedia] = useState([])
  
  const getSocialMedia = () => {
    suAxiosInstance.get('/social-media/').then((res) => {
      setSocialMedia(res.data)
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    document.title = 'Social Media list'
    getSocialMedia()
  }, [])

  
  return (
    <>
      <AddSocialMediaModal open={addModal} handleOpen={handleAddModal} refresh={getSocialMedia} />
      <DeleteSocialMediaModal open={deleteModal} handleOpen={handleDeleteModal} refresh={getSocialMedia} instance={deletingInstance} /> 
      <EditSocialMediaModal open={editModal} handleOpen={handleEditModal} refresh={getSocialMedia} Editinstance={editingInstance} />
      
      <Button onClick={handleAddModal} color="indigo" className="m-3 float-right" >Add Social Media</Button>
      <Card className="h-full w-full">
        <CardBody className="p-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {social_media.map(
                ({ id, icon, name }, index) => {
                  const isLast = index === social_media.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={icon ? icon : defaultUserImageLink}
                            alt={name}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content={`Edit ${name}`}>
                          <IconButton onClick={()=>{setEditingInstance({id,name,icon}),handleEditModal()}} variant="text" color="blue-gray">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content={`Delete ${name}`}>
                          <IconButton onClick={() => {setDeletingInstance({id,name}),handleDeleteModal()} } variant="text" color="red">
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              )}
              {/* {social_media.length<1?<h1 className="p-4 font-semibold" >Nothing to show </h1>:''} */}
            </tbody>
            {
            social_media.length < 1 ?
              <h1 className="p-4 font-bold text-indigo-500 text-center" >No Social Media to show</h1>
              : ''
          }
          </table>
        </CardBody>
      </Card>
    </>
  );
}