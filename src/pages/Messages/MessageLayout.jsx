import React, { useEffect, useRef, useState } from 'react'
import { FaceSmileIcon, CameraIcon, LinkIcon, MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { Avatar, Typography } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import { userAxiosInstance } from '../../utils/axios-utils';
import { apiUrl, defaultUserImageLink } from '../../constants/constants';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const setUserProfileDetails = async (userId, recipientdetails, setRecipientDetails) => {
    userAxiosInstance.get('/user-profile/' + userId + '/').then((response) => {
        if (response.status == 200) {
            setRecipientDetails({ ...response.data, ...recipientdetails })
        }
    })
}

const setSenderProfile = async (userId, setSenderDetails) => {
    userAxiosInstance.get('/user-profile/' + userId + '/').then((response) => {
        if (response.status == 200) {
            const { profile_image } = response.data
            setSenderDetails((previous) => {
                return { ...previous, profile_image};
            });
        }
    })
}

const callSetBasicDetails = async (userId, setRecipientDetails, setRecipientId) => {
    userAxiosInstance.get('/user/' + userId + '/').then((response) => {
        if (response.status == 200) {
            setRecipientId(response.data.id)
            setUserProfileDetails(userId, response.data, setRecipientDetails)
        }
    })
}

function MessagePage() {


    const { username } = useParams()

    const [isFirstLoad, setIsFirstLoad] = useState(false)

    const [recipientdetails, setRecipientDetails] = useState({})
    const [senderdetails, setSenderDetails] = useState({ id: 1 });

    const [senderid, setSenderId] = useState(null);
    const [recipientid, setRecipientId] = useState(null)

    const [clientstate, setClientState] = useState('');
    const [messages, setMessages] = useState([]);
    const messageRef = useRef()

    const onButtonClicked = () => {
        console.log('|||||_______||||| -> ', senderdetails, '<- |||||_______|||||');
        clientstate.send(
            JSON.stringify({
                message: messageRef.current.value,
                senderUsername: senderdetails.username,
            })
        );
        messageRef.current.value = ''
    };

    useEffect(() => {
        document.title = 'Messages'
        setIsFirstLoad(true)
        const user = getLocal('AuthToken')
        if (!user) {
            toast.error('Login First')
            navigate('/auth/login')
            return
        }
        const user_decoded = jwtDecode(user).custom
        if (!user_decoded) {
            toast.error('Login First')
            navigate('/auth/login')
            return
        }
        else {
            if (user_decoded.username == username) {
                return
            }
            else {
                setSenderDetails({ username: user_decoded.username })
                setSenderProfile(user_decoded.user_id, setSenderDetails)
                setSenderId(user_decoded.user_id)
                userAxiosInstance.get(`get-user-id/${username}/`).then((response) => {
                    if (response.data.status == 404) {
                        navigate('/4/0/4/')
                        return
                    }
                    else {
                        callSetBasicDetails(response.data.id, setRecipientDetails, setRecipientId)
                    }
                })
            }
        }
    }, [])

    useEffect(() => {
        if (senderid != null && recipientid != null) {
            if (isFirstLoad == true) {
                userAxiosInstance.get(`user-previous-chats/${senderid}/${recipientid}/`).then((response) => {
                    if (response.status == 200) {
                        setMessages(response.data)
                    }
                })
            }
            setIsFirstLoad(false)
            const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + senderid + '/?' + recipientid);
            setClientState(client)
            client.onopen = () => {
                console.log('WebSocket Client Connected');
            };

            client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                console.log('Data from server => ', dataFromServer);
                if (dataFromServer) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            message: dataFromServer.message,
                            sender_username: dataFromServer.senderUsername,
                        },
                    ]);
                }
            };

            client.onclose = () => {
                console.log('annan poyeeee');
            }

            return () => {
                client.close();
            };
        }
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [senderid, recipientid]);

    return (
        <div className='flex max-w-5xl mx-auto' >
            {/* <div className='h-screen-90 w-2/6 m-3 mt-5 border border-gray-300 rounded-xl px-2' >
                <div>
                    <div
                        className="mx-0 my-3 flex items-center gap-4 p-2 shadow rounded-xl "
                    >
                        <Avatar
                            size="md"
                            variant="circular"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            alt="tania andrew"
                        />
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between">
                                <Typography variant="h6" color="blue-gray">
                                    Tania Andrew
                                </Typography>
                            </div>
                            <p className='text-blue-gray text-xs'>Frontend Lead @ Google</p>
                        </div>
                    </div>

                </div>
                <div>
                    <div
                        className="mx-0 flex items-center gap-4 p-2 bg-indigo-400 shadow rounded-xl "
                    >
                        <Avatar
                            size="md"
                            variant="circular"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            alt="tania andrew"
                        />
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between">
                                <Typography variant="h6" color="white">
                                    Tania Andrew
                                </Typography>
                            </div>
                            <p className='text-white text-xs'>Frontend Lead @ Google</p>
                        </div>
                    </div>

                </div>
            </div> */}
            <div className="flex-1 p-2 sm:p-3 justify-between flex border border-gray-300 mt-5 rounded-xl  flex-col h-screen-90">

                <div className="flex sm:items-center justify-between border-b-2 border-gray-200">
                    <div className="relative flex items-center space-x-4">
                        <div className="relative">
                            <span className="absolute text-green-500 right-0 bottom-0">
                                <svg width="20" height="20">
                                    <circle cx="8" cy="12" r="5" fill="currentColor"></circle>
                                </svg>
                            </span>
                            <Avatar src={recipientdetails?.profile_image ? apiUrl + recipientdetails?.profile_image : defaultUserImageLink} alt="avatar" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <div className="text-base flex items-center">
                                <span className="text-gray-700 mr-3">{recipientdetails?.fullname}</span>
                            </div>
                            <span className="text-sm text-gray-600">Junior Developer</span>
                        </div>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                    <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                    >
                    </button>
                </div> */}
                </div>

                <div>
                    <div
                        id="messages"
                        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                    >
                        {
                            messages.map((message, idx) => {
                                console.log('message name : ', message.sender_username, '  ', 'recipient id : ', recipientdetails);
                                if (message.sender_username != recipientdetails.username) {

                                    return (
                                        <>
                                            <div key={idx} className="chat-message">
                                                <div className="flex items-end justify-end">
                                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                                        <div>
                                                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-indigo-600 text-white ">
                                                                {message.message}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <img
                                                        src={apiUrl + senderdetails?.profile_image}
                                                        alt="My profile"
                                                        className="w-6 h-6 rounded-full order-2"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )


                                }
                                else {
                                    return (
                                        <>
                                            <div key={idx} className="chat-message">
                                                <div className="flex items-end">
                                                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                                        <div>
                                                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                                                {message.message}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <img
                                                        src={apiUrl + recipientdetails?.profile_image}
                                                        alt="My profile"
                                                        className="w-6 h-6 rounded-full order-1"
                                                    />
                                                </div>
                                            </div>
                                        </>

                                    )

                                }
                            })
                        }
                    </div>

                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <div className="relative flex">
                            <span className="absolute inset-y-0 flex items-center">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                                >
                                    <MicrophoneIcon className='w-5 text-gray-700' />
                                </button>
                            </span>

                            <input
                                ref={messageRef}
                                type="text"
                                placeholder="Write your message!"
                                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                            />
                            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                                >
                                    <LinkIcon className='w-5 text-gray-700' />
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                                >
                                    <CameraIcon className='w-6 text-gray-700' />
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                                >
                                    <FaceSmileIcon className='w-6 text-gray-700' />
                                </button>
                                <button
                                    onClick={(e) => onButtonClicked()}
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-lg px-4 py-2  m-2 transition duration-500 ease-in-out text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none"
                                >
                                    <PaperAirplaneIcon className='w-5 text-white' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MessagePage
