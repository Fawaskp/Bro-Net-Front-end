import { useEffect, useState } from "react";
import { suAxiosInstance } from "../../../utils/axios-utils";
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { AddHub } from "./AddModal";
import { DeleteHub } from "./DeleteModal";
import { Edithub } from "./EditModal";
import { paginationPageCount } from "../../../constants/constants";

const TABLE_HEAD = ["Batch", "Code",""];

export function HubTable() {

  const [hubs, setHubs] = useState([])
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

  const callSetHubs = (page=1) => {
    suAxiosInstance.get('hubs/?page='+page).then((res) => {
      console.log('Hub List :: >> ',res.data.results);
      setHubs(res.data.results)
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
    document.title = 'Hubs list'
    callSetHubs()
  }, [])

  return (
    <>
      <Button onClick={handleAddModal} color="indigo" className="m-3 float-right" >Add Hub</Button>
      <AddHub open={addModal} handleOpen={handleAddModal} refresh={callSetHubs} />
      <DeleteHub open={deleteModal} handleOpen={handleDeleteModal} refresh={callSetHubs} instance={deletingInstance} />
      <Edithub open={editModal} handleOpen={handleEditModal} refresh={callSetHubs} Editinstance={editingInstance} />

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
            {hubs.map(({ id,location,code}, index) => {
              const isLast = index === hubs.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={code}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {location}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {code}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Tooltip content={`Edit Hub ${code}`}>
                      <IconButton onClick={() => { setEditingInstance({ id, location, code }), handleEditModal() }} variant="text" color="blue-gray">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content={`Delete ${code}`}>
                      <IconButton onClick={() => { setDeletingInstance({ id, location, code }), handleDeleteModal() }} variant="text" color="red">
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              {/* <Button onClick={()=>{callSetHubs(1,nextPage),console.log(nextPage)}} variant="outlined" color="blue-gray" size="sm">
                Previous
              </Button> */}
              <div className="flex items-center gap-2">
                {
                  paginationCount.map((count) => {
                    return (
                      <IconButton onClick={() => {callSetHubs(count),setSelectedPage(count)}} variant="outlined" color={count==selectedPage?"blue":"blue-gray"} size="sm">
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
            hubs.length < 1 ?
              <h1 className="p-4 font-bold text-indigo-500 text-center" >No Hubs to show</h1>
              : ''
          }
        </table>
      </Card>
    </>
  );
}