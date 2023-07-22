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

            <div className='w-full bg-gray-900 h-96'>
                <div className='mx-auto h-2/3 md:w-3/6 flex flex-col items-center'>
                    <div className="block mx-auto mt-10">
                        <img
                            alt="User-Dp"
                            src={userImage ? apiUrl + userImage : defaultUserImageLink}
                            className="rounded-full w-28 lg:w-28 h-28 lg:h-28 object-cover -top-1/2 left-1/2  ring-4 ring-gray-50"
                        />
                    </div>
                    <div className='mt-3'>
                        <h3 className='text-gray-50 text-xl font-semibold'>user name</h3>
                    </div>
                </div>
            </div>


            <main className="absolute -mt-56">
                <div className="container flex justify-center mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-5/6 mb-6 rounded-lg -mt- border-2 border-gray-200">
                        <div className='p-4 font-bold' >
                            <h1>Personal Info</h1>
                        </div>
                        <div className="px-6">
                            <div className="my-2 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                <h4 className='lg:text-4xl text-sm' >Full name</h4>
                                <h4>Muhammed Fawas kp</h4>
                            </div>
                           <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                <h4>Username</h4>
                                <h4>Muhammed Fawas kp</h4>
                            </div>
                            <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                <h4>E-mail</h4>
                                <h4>Muhammed Fawas kp</h4>
                            </div>
                            <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                <h4>DOB</h4>
                                <h4>Muhammed Fawas kp</h4>
                            </div>
                            <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                <h4>Full name</h4>
                                <h4>Muhammed Fawas kp</h4>
                            </div>
                            <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-left flex justify-between">
                                <h4>About</h4>
                                <p className='ms-20' >Hi, I'm livingstone, a Full Stack Web Developer trainee from BCK74. I'm passionate about programming and I've gained a lot of knowledge and experience in Python, Django, React, DSA, HTML, CSS, JavaScript, AWS, SQL, and NoSQL. through self learn I love working on complex projects that challenge me to learn and grow as a ...</p>
                            </div>

                            <div className='p-4 font-bold' >
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
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Profile

