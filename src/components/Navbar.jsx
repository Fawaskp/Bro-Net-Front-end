import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { getLocal } from "../helpers/auth";
import { defaults } from "autoprefixer";
import { apiUrl, defaultUserImageLink } from "../constants/constants";
import { userAxiosInstance } from "../utils/axios-utils";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link:'/user/profile',
  },
  {
    label: "Profile Settings",
    icon: Cog6ToothIcon,
    link:'/user/profile/settings',
    
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

function ProfileMenu({userImage}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate()
  const signOut = ()=>{
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
            src={userImage?apiUrl+userImage:defaultUserImageLink}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon,link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
            onClick={()=>{navigate(link)}}
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
        <MenuItem onClick={()=>signOut()} key={"Sign Out"}  
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

const getUserImage = async (userId,setUserImage) =>{
  userAxiosInstance.get('/user-profile/'+userId+'/').then((response)=>{
    setUserImage(response.data.profile_image)
  })
}


export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = useState (false);
  const [userImage, setUserImage] = useState(null);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const navigate = useNavigate()

  React.useEffect(() => {
    
    const user = getLocal('AuthToken')
    if (user){
      const user_decoded = jwtDecode(user)
      getUserImage(user_decoded.custom.user_id,setUserImage)
    }

    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <>
      <Navbar className="fixed z-50 mx-auto max-w-full p-2 lg:pl-6">
        <div className="relative max-w-screen-2xl mx-auto flex items-center text-blue-gray-900">
          <Typography onClick={()=>{navigate('/')}}
            as="a"
            className="mr-4 text-xl text-indigo-500 ml-2 cursor-pointer py-1.5 font-semibold"
          >
            Bronet
          </Typography>

          {/* <div className="flex items-center">
          <div className="flex">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              {
                React.createElement(MagnifyingGlassIcon, {
                  className: `h-4 w-4`,
                  strokeWidth: 2,
                })
              }
            </span>
            
            <input
              style={{borderRadius:5}}
              type="text"
              className="block w-70 px-4 mx-2 py-2 bg-indigo-50 bg-opacity-70 text-indigo-700 focus:outline-indigo-100"
              placeholder="Search..."
            />
          </div>
        </div> */}  


          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          <ProfileMenu userImage={userImage} />
        </div>

      </Navbar>
      <div className='pt-14'></div>
    </>
  );
}