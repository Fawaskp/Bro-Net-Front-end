import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { EyeIcon, NoSymbolIcon, UserPlusIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  CardFooter,
} from "@material-tailwind/react";
import { suAxiosInstance } from "../../../utils/axios-utils";
import { useEffect, useState } from "react";
import { defaultUserImageLink, paginationPageCount } from "../../../constants/constants";
import { AddUserModal } from "./addUser";
import debounce from "../../../helpers/debouce";
import { UserBlockUnBlockModal } from "./BlockUnblockModal";

const TABS = [
  {
    label: "Students",
    value: "students",
  },
  {
    label: "Councellors",
    value: "councellors",
  },
  {
    label: "Admins",
    value: "admins",
  },
  {
    label: "Advisor",
    value: "co-ordinator"
  }
];

const COMMON_TABLE_HEAD = ["", "Username"]
const STUDENT_TABLE_HEAD = [...COMMON_TABLE_HEAD, "Profile Completed", ""]
const COUNCELLOR_TABLE_HEAD = [...COMMON_TABLE_HEAD, ""];
const ADMIN_TABLE_HEAD = [...COMMON_TABLE_HEAD, ""];
const COORDINATOR_TABLE_HEAD = [...COMMON_TABLE_HEAD, ""];



export function UserManageTable() {

  const renderButton = (tab, label) => {
    return (
      <Button onClick={() => handleUserAddModal()} className="flex items-center gap-3 rounded-10" color="blue" size="sm">
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> {label}
      </Button>
    );
  };

  const [paginationCount, setPaginationCount] = useState([])

  const [users, setUsers] = useState([]);
  const [tablehead, setTableHead] = useState(STUDENT_TABLE_HEAD)
  const [selectedTab, setTab] = useState('students')
  const [sortby, setSortBy] = useState('id')
  const [selectedPage, setSelectedPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  
  const [addModal, setAddModal] = useState(false);
  const [blockunblockmodal, setBlockUnblockModal] = useState(false);
  const [blockunblockinstance, setBlockUnblockInstance] = useState({});
  const [blockorunblock, setBlockOrUnBlock] = useState('');

  const handleUserAddModal = () => setAddModal(!addModal);
  const handleBlockUnblockModal = () => setBlockUnblockModal(!blockunblockmodal);

  const handleSelectTab = (value = selectedTab, page = selectedPage, sortBy = sortby, search = searchValue) => {
    // console.log(suBaseUrl + `${value}/?page=${page}&ordering=${sortBy}&search=${search}`);
    suAxiosInstance.get(`/${value}/?page=${page}&ordering=${sortBy}&search=${search}`).then((response) => {
      if (response.data) {
        setUsers(response.data.results)
        const pageCount = response.data.count / paginationPageCount
        const newPaginationCount = [];
        for (let i = 1; i <= pageCount + 1; i++) {
          newPaginationCount.push(i);
        }
        setPaginationCount(newPaginationCount)
      }
      setTab(value)
      if (value === 'students') setTableHead(STUDENT_TABLE_HEAD)
      else if (value === 'co-ordinator') setTableHead(COORDINATOR_TABLE_HEAD)
      else if (value === 'admins') setTableHead(ADMIN_TABLE_HEAD)
      else if (value === 'councellors') setTableHead(COUNCELLOR_TABLE_HEAD)
    })
  }

  function saveInput(inputValue) {
    // console.log('Saving data: ', inputValue);
    setSearchValue(inputValue.trim())
    if (!inputValue.trim() == '' || inputValue == '') {
      handleSelectTab(selectedTab, 1, sortby, inputValue.trim())
      setSelectedPage(1)
    }
  }
  const processChange = debounce((inputValue) => saveInput(inputValue));

  useEffect(() => {
    handleSelectTab()
  }, [])

  return (
    <>
    <UserBlockUnBlockModal  open={blockunblockmodal} handleOpen={handleBlockUnblockModal} purpose={blockorunblock} instance={blockunblockinstance} refresh={handleSelectTab} />
      <Card className="h-full w-full">
        <AddUserModal role={selectedTab} open={addModal} handleOpen={handleUserAddModal} />
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                User list
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {selectedTab === 'students' && <Button className="flex items-center gap-3 rounded-10 opacity-0" size="sm"><UserPlusIcon className="h-4 w-4" /></Button>}
              {selectedTab === 'co-ordinator' && renderButton('coordinator', 'Add Coordinator')}
              {selectedTab === 'admins' && renderButton('admin', 'Add Admin')}
              {selectedTab === 'councellors' && renderButton('councilor', 'Add Councilor')}
            </div>
          </div>
          <div className="flex flex-col items-center lg:justify-between gap-4 md:flex-row">
            <Tabs value='students' className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab onClick={(e) => { handleSelectTab(value) }} key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input onKeyUp={(e) => processChange(e.target.value)} label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
              {
                searchValue.trim() != '' ?
                  <h1 className="font-bold text-xl p-3" >Searching for <span className="text-indigo-400" >{`"${searchValue}"`}</span></h1>
                  :
                  ''
              }
            </div>
          </div>
          <select onChange={(e) => { setSortBy(e.target.value), handleSelectTab(selectedTab, selectedPage, e.target.value, '') }} name="sort" id="">
            <option value="">Sort by</option>
            <option value="id">User Id ASC</option>
            <option value="username">Username ASC</option>
            <option value="dob">dob ASC</option>
            <option value="-id">User Id dSC</option>
            <option value="-username">Username dSC</option>
            <option value="-dob">dob dSC</option>
          </select>
        </CardHeader>
        <CardBody className="px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {tablehead.map((head, index) => (
                  <th key={index} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
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
              {users.map((user, index) => {
                const isLast = index === users.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={defaultUserImageLink} alt={user.name} size="md" />
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {user.fullname}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {user.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.username}
                      </Typography>
                    </td>
                    {
                      selectedTab == "students" &&
                      <td className={classes}>
                        <div className="max-w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={user.is_profile_completed ? "completed" : "not completed"}
                            color={user.is_profile_completed ? "green" : "red"}
                          />
                        </div>
                      </td>
                    }
                    <td className={classes}>
                      <Tooltip content={user.is_active ? "Block User" : "Un-Block User"} >
                        {
                          user.is_active ?
                            <IconButton onClick={() => {setBlockOrUnBlock('block'),setBlockUnblockInstance({id:user.id,name:user.fullname}), handleBlockUnblockModal()}} variant="text" color="red">
                              <NoSymbolIcon className="h-4 w-4" />
                            </IconButton>
                            :
                            <IconButton onClick={() => {setBlockOrUnBlock('unblock'),setBlockUnblockInstance({id:user.id,name:user.fullname}), handleBlockUnblockModal()}} variant="text" color="red">
                              <LockOpenIcon className="h-4 w-4" />
                            </IconButton>
                        }
                      </Tooltip>

                      {/* <Tooltip content={`view ${selectedTab.slice(0, -1)}`} >
                      <IconButton variant="text" color="indigo">
                      <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        {
          users.length < 1 ?
            <h1 className="text-center text-xl font-bold" >Data not found</h1>
            : ''
        }
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          {/* <Button onClick={()=>{callSetSkills(1,nextPage),console.log(nextPage)}} variant="outlined" color="blue-gray" size="sm">
                Previous
              </Button> */}
          <div className="flex items-center gap-2">
            {
              paginationCount.length > 1 ?
                paginationCount.map((count) => {
                  return (
                    <IconButton key={count} onClick={() => { handleSelectTab(selectedTab, count), setSelectedPage(count) }} color={count == selectedPage ? "blue" : "blue-gray"} variant="outlined" size="sm">
                      {count}
                    </IconButton>
                  )
                })
                :
                ''
            }
          </div>
          {/* <Button variant="outlined" color="blue-gray" size="sm">
                Next
              </Button> */}
        </CardFooter>
      </Card>
    </>
  );
}
