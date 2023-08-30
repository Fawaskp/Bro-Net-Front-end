import React, { useEffect, useState } from 'react'
import { getLocal } from '../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { apiUrl,mediaApiUrl,defaultUserImageLink } from '../../constants/constants'
import { userAxiosInstance } from '../../utils/axios-utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { getUserSocialMediaAccounts } from './api'
import { Alert, Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

const setUserBasicDetails = async (userId, setUserName) => {
    userAxiosInstance.get('/user/' + userId + '/').then((response) => {
        setUserName(response.data.fullname)
    })
}

const setUserProfileDetails = async (userId, setUserImage, setFollowers, setFollowings, setHub, setBatch, setAbout, setStackImage) => {
    userAxiosInstance.get('/user-profile/' + userId + '/').then((response) => {
        console.log('User Profile :> ', response.data);
        setUserImage(response.data.profile_image)
        setFollowers(response.data.followers_count)
        setFollowings(response.data.following_count)
        setHub(response.data.hub.location)
        setBatch(response.data.batch.batch_name)
        setAbout(response.data.about)
        setStackImage(response.data.stack.icon)
        console.log('UserProfileDetails: ', response.data);
    })
}

function Profile() {

    const navigate = useNavigate('')

    const [userImage, setUserImage] = useState('')
    const [userName, setUserName] = useState('')
    const [followers, setFollowers] = useState('')
    const [followings, setFollowings] = useState('')
    const [hub, setHub] = useState('')
    const [batch, setBatch] = useState('')
    const [about, setAbout] = useState('')
    const [stackimage, setStackImage] = useState('')
    const [socialaccounts, setSocialAccounts] = useState([])

    useEffect(() => {
        const user = getLocal('AuthToken')
        const user_decoded = jwtDecode(user)
        if (user_decoded.custom.is_profile_completed) {
            setUserProfileDetails(
                user_decoded.custom.user_id,
                setUserImage,
                setFollowers,
                setFollowings,
                setHub,
                setBatch,
                setAbout,
                setStackImage,
            )
            setUserBasicDetails(user_decoded.custom.user_id, setUserName)
            getUserSocialMediaAccounts(user_decoded.custom.user_id).then((accounts) => {
                setSocialAccounts(accounts)
            })
        }
        else navigate('/auth/login')
    }, [])

    return (
        <>
            <div className='absolute w-full bg-gray-900 h-32 md:h-50 lg: sm:h-96' >
            </div>
            <main className="mt-72 w-full">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded-lg -mt-64 border-2 border-gray-200">
                        <div className="px-6">
                            <div className="flex justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative w-40 h-40">
                                        <img
                                            alt="User-Dp"
                                            src={userImage ? mediaApiUrl + userImage : defaultUserImageLink}
                                            style={{ borderRadius: '50%' }}
                                            className="w-full h-full align-middle ring-8 ring-gray-900 object-cover bg-white absolute -mt-16"
                                        />
                                    </div>
                                </div>
                                <div className="md:w-5 lg:w-4/12 md:px-4 lg:order-3 float-right lg:self-center">
                                    <img className='w-16 float-right' src={mediaApiUrl+stackimage} alt="Django" />
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center sm:mt-2 md:pt-24 lg:pt-4">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{followers}</span><span className="text-sm text-blueGray-400">Followers</span>
                                        </div>

                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{followings}</span><span className="text-sm text-blueGray-400">Following</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="sm:text-xl md:text-2xl lg:text-4xl  font-semibold leading-normal text-blueGray-700 mb-2">
                                    {userName ? userName : 'No name'}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-semibold uppercase">
                                    Any Caption which user prefers
                                </div>
                                <div className='flex justify-center' >
                                    {/* <DefaultButton name='Follow' ></DefaultButton> */}
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-regular fa-building"></i> {hub}
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faUsersRectangle} /> {batch}
                                </div>
                            </div>
                            <div className='flex justify-end' >
                                <div className='w-96 h-14 p-3 flex justify-end' >
                                    {
                                        socialaccounts.map((social) => {
                                            return (
                                                <a key={social.url} className='mx-2' target='_blank' href={social.url}>
                                                    <img src={social.social_media.icon} className='w-9' alt="" />
                                                </a>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-left sm:text-lg md:text-sm lg:text-base text-blueGray-700">
                                            {about ? about : <i>about is not added</i>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-10' >
                        <div className='flex mb-4 justify-between bg-indigo-400 px-6 py-1 items-center text-white rounded-10' >
                            View User's advice
                            <Button onClick={()=>navigate('/user/profile/advices')} variant='text' color='white'  className='font- text-xl rounded-10 py-1 px-5' >&rarr;</Button>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}

export default Profile

