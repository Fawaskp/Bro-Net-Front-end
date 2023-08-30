import React, { useEffect, useRef, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MobileNav,
  MenuItem,
  Avatar,
  IconButton,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars2Icon,
  MagnifyingGlassIcon,
  CodeBracketSquareIcon,
  CubeTransparentIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";

import { useNavigate } from 'react-router-dom'
import jwtDecode from "jwt-decode";
import { getLocal } from "../helpers/auth";
import { mediaApiUrl, defaultUserImageLink } from "../constants/constants";
import { userAxiosInstance } from "../utils/axios-utils";
import debounce from '../helpers/debouce'


const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: '/user/profile',
  },
  {
    label: "Profile Settings",
    icon: Cog6ToothIcon,
    link: '/user/profile/settings',

  },
  // {
  //   label: "Inbox",
  //   icon: InboxArrowDownIcon,
  //   link:'',
  // },
  // {
  //   label: "Help",
  //   icon: LifebuoyIcon,
  //   link:'',
  // },
];

function ProfileMenu({ userImage }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate()
  const signOut = () => {
    localStorage.removeItem('AuthToken')
    navigate('/auth/')
  }

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 p-1 pr-2 lg:ml-auto rounded-10"
        >
          <Avatar
            style={{ borderRadius: '50%' }}
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-indigo-500 p-0.5 rounded-full focus:outline-0"
            src={userImage ? mediaApiUrl + userImage : defaultUserImageLink}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              onClick={() => { navigate(link) }}
              key={label}
              className={`flex items-center gap-2 rounded`}
            >
              {React.createElement(icon, {
                className: "h-4 w-4",
                strokeWidth: 2,
              })}

              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="inherit"
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
        <MenuItem onClick={() => signOut()} key={"Sign Out"}
          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
        >
          <PowerIcon className="h-4 w-4" color="red" ></PowerIcon>
          <Typography
            as="span"
            variant="small"
            className="font-normal "
            color="red"
          >
            Sign out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];


function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}


const navListItems = [
  {
    label: "Blocks",
    icon: CubeTransparentIcon,
  },
  {
    label: "Docs",
    icon: CodeBracketSquareIcon,
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

const getUserImage = async (userId, setUserImage) => {
  userAxiosInstance.get('/user-profile/' + userId + '/').then((response) => {
    setUserImage(response.data.profile_image)
  })
}

export default function ComplexNavbar() {

  const [searchresults, setSearchResults] = useState([])
  const [search, setSearch] = useState(false)
  const searchRef = useRef(null);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userImage, setUserImage] = useState(null);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const navigate = useNavigate()


  function performSearch(inputValue) {
    const user = getLocal('AuthToken')
    const user_decoded = jwtDecode(user).custom
    if (inputValue.trim() != '') {
      userAxiosInstance.get(`search/${user_decoded.user_id}/?search=${inputValue}`).then((response) => {
        setSearchResults(response.data)
        if (response.status == 200) {
          setSearch(true)
        }
      })
    }
    else {
      setSearch(false)
    }
  }
  const handleSearch = debounce((inputValue) => performSearch(inputValue));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const user = getLocal('AuthToken')
    if (user) {
      const user_decoded = jwtDecode(user)
      getUserImage(user_decoded.custom.user_id, setUserImage)
    }

    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <>
      <Navbar className="fixed z-50 mx-auto max-w-full p-2 lg:pl-6">
        <div className="relative max-w-screen-2xl mx-auto flex justify-between items-center text-blue-gray-900">
          <div className="flex" >

            <Typography onClick={() => { navigate('/') }}
              as="a"
              className="mr-4 text-xl text-indigo-500 ml-2 cursor-pointer py-1.5 font-semibold"
            >
              Bronet
            </Typography>

            <div className="flex items-center" >
              <div className="relative flex" ref={searchRef} >
                <input
                  maxLength={30}
                  onChange={(e) => handleSearch(e.target.value)}
                  onDoubleClick={() => alert('You Found It')}
                  onKeyPress={(e) => {
                    const allowedRegex = /^[a-z0-9@_ ]+$/i;
                    const key = e.key;
                    if (!allowedRegex.test(key)) {
                      e.preventDefault();
                    }
                  }}
                  style={{ borderRadius: 5, transition: 'all 200ms' }}
                  type="text"
                  className="block w-60 px-12 mx-2 py-2 bg-indigo-50 bg-opacity-70 text-indigo-700 focus:outline-indigo-100 focus-within:w-96"
                  placeholder="Search..."
                />
                {
                  search ?
                    <div className="absolute max-h-96 overflow-y-scroll mt-12 rounded-10 w-96 bg-white p-4 mx-2 shadow-2xl transition-all duration-500" >
                      <div className="flex w-full flex-col" >

                        {
                          searchresults.map((user) => {
                            return (
                              <div key={user.username} onClick={() => { navigate('/'), navigate(`/${user.username}`) }} className="flex items-center gap-4 my-1 rounded-10 p-2 hover:bg-indigo-50 cursor-pointer duration-300">
                                <Avatar size="sm" style={{ borderRadius: '50%' }} src={user.profile?.image ? mediaApiUrl + user.profile?.image : defaultUserImageLink} alt="avatar" />
                                <div>
                                  <p className="font-semibold text-sm" >{user.fullname}</p>
                                  <p className="text-xs text-gray-600" >{user.profile?.batch}</p>
                                </div>
                              </div>
                            )
                          })
                        }
                        {searchresults.length < 1 ?
                          <h1>No Result found</h1>
                          :
                          ''
                        }
                      </div>
                    </div>
                    :
                    ''
                }

                <span onDoubleClick={(e) => alert('You did it!')} className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-4 w-4 text-indigo-700" strokeWidth={2} />
                </span>

              </div>
            </div>
          </div>

          <div className="flex items-center" >
            <IconButton
              size="sm"
              color="blue-gray"
              variant="text"
              onClick={toggleIsNavOpen}
              className="ml-auto mr-2 lg:hidden"
            >
              <Bars2Icon className="h-6 w-6" />
            </IconButton>
            <IconButton onClick={()=>navigate('/user/messaging')} className="mx-4" variant="text" color="gray" >
              <ChatBubbleBottomCenterIcon className="h-6 w-6 text-black" />
            </IconButton>
            <ProfileMenu userImage={userImage} />
          </div>
        </div>
      </Navbar>
      <div className='pt-14'></div>
      {/* <div className='absolute h-max w-screen bg-black opacity-50 z-50'></div>  Its for focusing the input(Like Linkedin) */}
    </>
  );
}