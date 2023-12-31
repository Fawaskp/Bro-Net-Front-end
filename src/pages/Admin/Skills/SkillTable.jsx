import { useEffect, useState } from "react";
import { suAxiosInstance } from "../../../utils/axios-utils";
import {
  Card,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { AddSkill } from "./AddModal";
import { DeleteSkill } from "./DeleteModal";
import { EditSkill } from "./EditModal";
import { paginationPageCount } from "../../../constants/constants";

const TABLE_HEAD = ["Icon", ""];

export function SkillTable() {

  const [skills, setSkills] = useState([])
  const [paginationCount, setPaginationCount] = useState([])
  const [selectedPage, setSelectedPage] = useState(1)

  // const [nextPage,setNextPage] = useState(null)
  // const [prevPage,setPrevPage] = useState(null)

  const [addModal, setAddModal] = useState(false);
  const handleAddModal = () => setAddModal(!addModal);

  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteModal = () => setDeleteModal(!deleteModal);

  const [editModal, setEditModal] = useState(false);
  const handleEditModal = () => setEditModal(!editModal);

  const [deletingInstance, setDeletingInstance] = useState()
  const [editingInstance, setEditingInstance] = useState('')

  const callSetSkills = (page=1) => {
    suAxiosInstance.get('skills/?page='+page).then((res) => {
      setSkills(res.data.results)
      // setNextPage(res.data.next)
      // setPrevPage(res.data.pervious)
      const pageCount = res.data.count /paginationPageCount
      const newPaginationCount = [];
      for (let i = 1; i <= pageCount; i++) {
        newPaginationCount.push(i);
      }
      setPaginationCount(newPaginationCount);
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    document.title = 'Skill list'
    callSetSkills()
  }, [])

  return (
    <>
      <Button onClick={handleAddModal} color="indigo" className="m-3 float-right" >Add Skill</Button>
      <AddSkill open={addModal} handleOpen={handleAddModal} refresh={callSetSkills} />
      <DeleteSkill open={deleteModal} handleOpen={handleDeleteModal} refresh={callSetSkills} instance={deletingInstance} />
      <EditSkill open={editModal} handleOpen={handleEditModal} refresh={callSetSkills} Editinstance={editingInstance} />

      <Card className="w-full h-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
            {skills.map(({ id, icon, name }, index) => {
              const isLast = index === skills.length - 1;
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
                      <IconButton onClick={() => { setEditingInstance({ id, name, icon }), handleEditModal() }} variant="text" color="blue-gray">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content={`Delete ${name}`}>
                      <IconButton onClick={() => { setDeletingInstance({ id, name }), handleDeleteModal() }} variant="text" color="red">
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              {/* <Button onClick={()=>{callSetSkills(1,nextPage),console.log(nextPage)}} variant="outlined" color="blue-gray" size="sm">
                Previous
              </Button> */}
              <div className="flex items-center gap-2">
                {
                  paginationCount.map((count) => {
                    return (
                      <IconButton onClick={() => {callSetSkills(count),setSelectedPage(count)}} variant="outlined" color={count==selectedPage?"blue":"blue-gray"} size="sm">
                        {count}
                      </IconButton>
                    )
                  })
                }
              </div>
              {/* <Button variant="outlined" color="blue-gray" size="sm">
                Next
              </Button> */}
            </CardFooter>
          </tbody>
          {
            skills.length < 1 ?
              <h1 className="p-4 font-bold text-indigo-500 text-center" >No Skills to show</h1>
              : ''
          }
        </table>
      </Card>
    </>
  );
}