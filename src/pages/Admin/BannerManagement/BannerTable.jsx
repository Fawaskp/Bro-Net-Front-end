import { useEffect, useState } from "react";
import { postAxiosInstance, suAxiosInstance } from "../../../utils/axios-utils";
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
  Button,
  CardFooter,
  Switch,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { AddBanner } from "./AddModal";
import { DeleteBanner } from "./DeleteModal";
import { EditBanner } from "./EditModal";
import { paginationPageCount } from "../../../constants/constants";

const TABLE_HEAD = ["Heading", "Content", "View Status", ""];

export function BannerTable() {

  const [banners, setBanners] = useState([])
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
  
  const callSetBanners = (page = 1) => {
    postAxiosInstance.get('banners/?page=' + page).then((res) => {
      console.log('Banner List :: >> ', res.data.results);
      setBanners(res.data.results)
      const pageCount = res.data.count / paginationPageCount
      const newPaginationCount = [];
      for (let i = 1; i <= pageCount; i++) {
        newPaginationCount.push(i);
      }
      setPaginationCount(newPaginationCount);
    }).catch((err) => console.log(err))
  }

  const changeViewStatus = (id, status) => {
    postAxiosInstance.put(`banner-detail/${id}/`, { id, status: status }).then((res) => {
      if (res.status == 200) {
        callSetBanners()
      }
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    suAxiosInstance
    document.title = 'Banners list'
    callSetBanners()
  }, [])

  return (
    <>
      <Button onClick={handleAddModal} color="indigo" className="m-3 float-right" >Add Banner</Button>
      <AddBanner open={addModal} handleOpen={handleAddModal} refresh={callSetBanners} />
      <DeleteBanner open={deleteModal} handleOpen={handleDeleteModal} refresh={callSetBanners} instance={deletingInstance} />
      <EditBanner open={editModal} handleOpen={handleEditModal} refresh={callSetBanners} Editinstance={editingInstance} />

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
            {banners.map(({ id, heading, content, status }, index) => {
              const isLast = index === banners.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={content}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {heading}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3 max-w-md">
                      <Typography variant="small" color="blue-gray" >
                        {content}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Switch defaultChecked={status} onClick={() => changeViewStatus(id, !status)} />
                    </div>
                  </td>
                  <td className={classes}>
                    <IconButton onClick={() => { setEditingInstance({ id, heading, content }), handleEditModal() }} variant="text" color="blue-gray">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                    <IconButton onClick={() => { setDeletingInstance({ id, heading, content }), handleDeleteModal() }} variant="text" color="red">
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              {/* <Button onClick={()=>{callSetBanners(1,nextPage),console.log(nextPage)}} variant="outlined" color="blue-gray" size="sm">
                Previous
              </Button> */}
              <div className="flex items-center gap-2">
                {
                  paginationCount.map((count) => {
                    return (
                      <IconButton onClick={() => { callSetBanners(count), setSelectedPage(count) }} variant="outlined" color={count == selectedPage ? "blue" : "blue-gray"} size="sm">
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
            banners.length < 1 ?
              <h1 className="p-4 font-bold text-indigo-500 text-center" >No Banners to show</h1>
              : ''
          }
        </table>
      </Card>
    </>
  );
}