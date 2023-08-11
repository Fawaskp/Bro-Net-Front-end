import React, { useEffect, useRef, useState } from 'react'
import { getLocal } from '../../helpers/auth'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { apiUrl, defaultUserImageLink } from '../../constants/constants'
import { userAxiosInstance } from '../../utils/axios-utils'
import { Switch, Button, Input, Textarea } from "@material-tailwind/react";
import { DpConfirmModal } from './DpConfirmModal'
import { updateBasicUserData, updateUserProfile } from '../ProfileCompletion/api'

const setUserBasicDetails = async (userId, setUserName, setFullName, setEmail, setDob) => {
    userAxiosInstance.get('/user/' + userId + '/').then((response) => {
        setUserName(response.data.username)
        setFullName(response.data.fullname)
        setDob(response.data.dob)
        setEmail(response.data.email)
    })
}

const setUserProfileDetails = async (userId, setUserImage, setAbout) => {
    userAxiosInstance.get('/user-profile/' + userId + '/').then((response) => {
        setUserImage(response.data.profile_image)
        setAbout(response.data.about)
    })
}


function PersonalSection() {

    const navigate = useNavigate()

    const [editmode, setEditMode] = useState(false)
    const handleEditMode = () => setEditMode(!editmode)

    const [dpconfirmmodal, setDpConfirmModal] = useState(false);
    const handleDpConfirmModal = () => setDpConfirmModal(!dpconfirmmodal);

    const [userImage, setUserImage] = useState('')
    const [selectedimage, setSelectedImage] = useState('')
    const [username, setUserName] = useState('')
    const [fullname, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [about, setAbout] = useState('')

    const fileInputRef = React.createRef();
    const usernameRef = useRef(null);
    const fullnameRef = useRef(null);
    const emailRef = useRef(null);
    const dobRef = useRef(null);

    const handleFormSubmition = () => {
        const usernameValue = usernameRef.current.value
        const fullnameValue = fullnameRef.current.value
        const emailValue = emailRef.current.value
        const dobValue = dobRef.current.value
        console.log('Dob Value ::>> ',dobValue);
        const stateData = [
            usernameValue,
            fullnameValue,
            emailValue,
            dobValue,
            about,
        ]

        stateData.map((data) => {
            if (data.trim() == '') {
                toast.error('fields cannot be empty')
                return;
            }
        })

        const usernameRegex = /^(?=.{5,})[A-Za-z0-9_]+$/;
        if (!usernameValue.match(usernameRegex)) {
            toast.error('Username should only contain letters, numbers, and underscores (_) and must be at least 5 characters long');
            return;
        }

        const fullnameRegex = /^[A-Za-z\s]+$/;
        if (!fullnameValue.match(fullnameRegex)) {
            toast.error('Full name should only contain letters');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue.match(emailRegex)) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (about.length > 500) {
            toast.error('About should be less than 500 characters');
            return;
        }

        const formData = {
            email: emailValue,
            about,
        };
        
        const basicData = {
            username: usernameValue,
            fullname: fullnameValue,
            dob: dobValue,
        };

        const user = getLocal('AuthToken')
        const user_decoded = jwtDecode(user).custom

        updateBasicUserData(basicData, user_decoded.user_id)
        updateUserProfile(formData, user_decoded.user_id).then((result) => {
            if (result) {
                toast.success('User profile successfully updated')
                handleEditMode()
                setUserProfileDetails(user_decoded.user_id, setUserImage, setAbout)
                setUserBasicDetails(user_decoded.user_id, setUserName, setFullName, setEmail, setDob)
            }
        })
    }

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        const user = getLocal('AuthToken')
        const user_decoded = jwtDecode(user)
        if (user_decoded.custom.is_profile_completed) {
            setUserProfileDetails(user_decoded.custom.user_id, setUserImage, setAbout)
            setUserBasicDetails(user_decoded.custom.user_id, setUserName, setFullName, setEmail, setDob)
        }
        else navigate('/auth/login')
    }, [])

    return (
        <>
            <DpConfirmModal open={dpconfirmmodal} handleOpen={handleDpConfirmModal} setImage={setUserImage} image1={userImage} image2={selectedimage} ></DpConfirmModal>
            <div className='w-full bg-gray-900 h-96'>
                <div className='mx-auto h-2/3 md:w-3/6 flex flex-col items-center'>
                    <div onClick={handleImageClick} className="block mx-auto mt-10 bg-gray-200 cursor-pointer rounded-10 relative group">
                        <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => {
                            if (e.target.value[0] != null)
                                setSelectedImage(e.target.files[0]);
                                console.log(e.target.files[0]);
                            handleDpConfirmModal();
                        }} />
                        <img
                            alt="User-Dp"
                            src={userImage ? apiUrl + userImage : defaultUserImageLink}
                            className="rounded-10 w-28 lg:w-28 h-28 lg:h-28 object-cover ring-4 ring-gray-50 transition-all duration-500 ease-out group-hover:opacity-50"
                        />
                        <span className="text-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-2 px-4 duration-500 ease-out font-semibold text-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {userImage ? 'Change' : 'Add'} 
                        </span>
                    </div>

                    <div className='mt-3'>
                        <h3 className='text-gray-50 text-xl font-semibold'>{username}</h3>
                    </div>
                </div>
            </div>


            <main className="-mt-56 w-full">
                <div className="container flex justify-center mx-auto px-4">
                    <div className="relative shadow-xl border flex flex-col min-w-0 break-words bg-white w-4/6 mb-6 rounded-10 -mt- ">
                        <div className='p-4 font-bold flex justify-between' >
                            <h1>Personal Info</h1>
                            <div className='flex' >
                                <h4 className='mx-4 font-normal' >Edit</h4>
                                <Switch color='indigo' checked={editmode} readOnly onClick={handleEditMode} />
                            </div>
                        </div>
                        <div className="px-6">
                            <form action="" onSubmit={(e) => { e.preventDefault(), handleFormSubmition() }} >

                                <div className="my-2 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                    <h4>Full name</h4>
                                    <div className='flex' >
                                        {
                                            editmode ?
                                                <Input inputRef={fullnameRef} type='text' defaultValue={fullname} />
                                                :
                                                <p className='mx-10' >{fullname}</p>
                                        }
                                    </div>
                                </div>
                                <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                    <h4>Username</h4>
                                    <div className='flex' >
                                        {
                                            editmode ?
                                                <Input inputRef={usernameRef} type='text' defaultValue={username} />
                                                :
                                                <p className='mx-10' >{username}</p>
                                        }
                                    </div>
                                </div>
                                <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                    <h4>E-mail</h4>
                                    <div className='flex' >
                                        {
                                            editmode ?
                                                <Input disabled inputRef={emailRef} type='email' defaultValue={email} />
                                                :
                                                <p className='mx-10' >{email}</p>
                                        }
                                    </div>
                                </div>
                                <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                    <h4>DOB</h4>
                                    <div className='flex' >
                                        {
                                            editmode ?
                                                <Input inputRef={dobRef} type='date' defaultValue={dob} />
                                                :
                                                <p className='mx-10' >{dob}</p>
                                        }
                                    </div>
                                </div>
                                <div className="my-6 py-3 border-blueGray-200 text-gray-700 text-left flex justify-between">
                                    <h4>About</h4>
                                    <div className='flex' >
                                        {
                                            editmode ?
                                                <Textarea onChange={(e) => setAbout(e.target.value)} defaultValue={about} id="" cols="50" />
                                                :
                                                <p className='mx-10' >{about}</p>
                                        }
                                    </div>
                                </div>
                                {
                                    editmode &&
                                    <div className='p-3 flex justify-end' >
                                        <Button onClick={handleEditMode} className='mx-3 rounded-10 h-9' color='red' >cancel</Button>
                                        <Button type='submit' className="rounded-10 h-9" color='indigo' >update</Button>
                                    </div>
                                }
                            </form>
                            {/* <div className='p-4 font-bold' >
                                <h1>Brocamp Info</h1>
                            </div>
                            <div className="px-6">
                                <div className="my-2 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                    <h4>Full name</h4>
                                    <h4>Muhammed Fawas kp</h4>
                                    <h4 className='text-indigo-600' >Edit</h4>
                                </div>
                                <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                    <h4>Full name</h4>
                                    <h4>Muhammed Fawas kp</h4>
                                    <h4 className='text-indigo-600' >Edit</h4>
                                </div>
                                <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                    <h4>Full name</h4>
                                    <h4>Muhammed Fawas kp</h4>
                                    <h4 className='text-indigo-600' >Edit</h4>
                                </div>
                                <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                    <h4>Full name</h4>
                                    <h4>Muhammed Fawas kp</h4>
                                    <h4 className='text-indigo-600' >Edit</h4>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default PersonalSection

