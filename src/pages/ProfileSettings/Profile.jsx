import React, { useEffect, useState } from 'react'
import { DefaultButton } from '../../components/buttons'
import { getLocal } from '../../helpers/auth'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { apiUrl, defaultUserImageLink } from '../../constants/constants'
import { userAxiosInstance } from '../../utils/axios-utils'


const setUserBasicDetails = async (userId, setUserName) => {
    userAxiosInstance.get('/user/' + userId + '/').then((response) => {
        console.log('Profile-1: ', response.data);
        setUserName(response.data.fullname)
    })
}

const setUserProfileDetails = async (userId, setUserImage) => {
    userAxiosInstance.get('/user-profile/' + userId + '/').then((response) => {
        console.log('Profile-2: ', response.data);
        setUserImage(response.data.profile_image)
    })
}


function Profile() {

    const navigate = useNavigate()

    const [userImage, setUserImage] = useState('')
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const user = getLocal('AuthToken')
        if (!user) {
            toast.warn('User Not Authenticated')
            navigate('/auth/')
        }
        else {
            const user_decoded = jwtDecode(user)
            if (user_decoded.custom.is_profile_completed) {
                setUserProfileDetails(user_decoded.custom.user_id, setUserImage)
                setUserBasicDetails(user_decoded.custom.user_id, setUserName)
            }
            else navigate('/auth/login')
        }
    }, [])

    return (
        <>
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />

            <div className='absolute w-full bg-gray-900 h-3/6' >
                <div className='w-4/6 flex justify-around align-middle' >
                    <div className="relative w-40 h-40 mt-48">
                        <img
                            alt="User-Dp"
                            src={userImage ? apiUrl + userImage : defaultUserImageLink}
                            className="rounded-full w-full h-full align-middle ring-4 ring-gray-50 object-cover absolute -mt-16"
                        />
                    </div>
                    <h3 className='text-green-800' >Muhammed Fawas kp</h3>
                </div>
            </div>
            <main className="mt-72">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded-lg -mt- border-2 border-gray-200">
                        <div className="px-6">
                            <div className="flex justify-center">
                                <div className="md:w-5 lg:w-4/12 md:px-4 lg:order-3 float-right lg:self-center">
                                    <img className='w-24 float-right' src="https://ih1.redbubble.net/image.354280811.3987/st,small,507x507-pad,600x600,f8f8f8.u4.jpg" alt="Django" />
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
                                    <DefaultButton name='Follow' ></DefaultButton>
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager - Creative Tim Officer
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
                                </div>
                            </div>

                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-left sm:text-lg md:text-sm lg:text-base text-blueGray-700">
                                            An artist of considerable range, Jenna the name taken by
                                            Melbourne-raised, Brooklyn-based Nick Murphy writes,
                                            performs and records all of his own music, giving it a
                                            warm, intimate feel with a solid groove structure. An
                                            artist of considerable range.
                                        </p>
                                        <a href="#" className="font-normal text-pink-500">Show more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Profile

