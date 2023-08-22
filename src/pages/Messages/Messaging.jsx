import React, { useEffect, useRef, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { Avatar } from '@material-tailwind/react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import { userAxiosInstance } from '../../utils/axios-utils';
import { apiUrl, defaultUserImageLink, wsApiUrl } from '../../constants/constants';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { toast } from 'react-toastify';

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
            const { profile_image, user } = response.data
            setSenderDetails((previous) => {
                return { ...previous, profile_image };
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

export default function Messaging() {

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('user');

    const [recipientdetails, setRecipientDetails] = useState({})
    const [senderdetails, setSenderDetails] = useState({ id: 1 });

    const [senderid, setSenderId] = useState(null);
    const [recipientid, setRecipientId] = useState(null)

    const [clientstate, setClientState] = useState('');
    const [messages, setMessages] = useState([]);
    const messageRef = useRef()

    const onButtonClicked = () => {
        if (messageRef.current.value.trim() == "") {
            return
        }
        clientstate.send(
            JSON.stringify({
                message: messageRef.current.value,
                senderUsername: senderdetails.username,
                receiverUsername: recipientdetails.username,
            })
        );
        messageRef.current.value = ''
    };

    useEffect(() => {
        console.log('username ::>> ', username)
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
                        return
                    }
                    else {
                        callSetBasicDetails(response.data.id, setRecipientDetails, setRecipientId)
                    }
                })
            }
        }
    }, [username])

    const setUpChat = () => {
        userAxiosInstance.get(`user-previous-chats/${senderid}/${recipientid}/`).then((response) => {
            if (response.status == 200) {
                setMessages(response.data)
            }
        })
        const client = new W3CWebSocket(`${wsApiUrl}/ws/chat/${senderid}/?${recipientid}`);
        setClientState(client)
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
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
            console.log('Websocket disconnected');
        }

        return () => {
            client.close();
        };
    }
    useEffect(() => {
        if (senderid != null && recipientid != null) {
            setUpChat()
        }
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }, [senderid, recipientid, username])

    return (

        <div className="flex-1 p-2 sm:p-3 justify-between flex border border-gray-300 mt-5 rounded-xl  flex-col h-screen-90">
            {!username && <div className='h-full flex justify-center items-center font-bold' ><h1>Select a message to send</h1></div>}
            {
                username &&
                <>
                    <div className="flex sm:items-center justify-between border-b-2 border-gray-200">
                        <div className="relative flex items-center space-x-4">
                            <div className="relative pb-2">
                                {/* <span className="absolute text-green-500 right-0 bottom-0">
                                <svg width="20" height="20">
                                <circle cx="8" cy="12" r="5" fill="currentColor"></circle>
                                </svg>
                            </span> */}
                                <Avatar src={recipientdetails?.profile_image ? apiUrl + recipientdetails?.profile_image : defaultUserImageLink} alt="avatar" />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <div className="text-base flex items-center">
                                    <span className="text-gray-700 mr-3">{recipientdetails?.fullname}</span>
                                </div>
                                <span className="text-sm text-gray-600">Junior Developer</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div
                            id="messages"
                            className="flex max-h-[40rem] flex-col space-y-4 p-3 overflow-y-auto scrolling-touch"
                        >
                            {
                                messages.map((message, idx) => {
                                    if (message.sender_username != recipientdetails.username) {

                                        return (
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
                                        )
                                    }
                                    else {
                                        return (
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
                                        )
                                    }
                                })
                            }
                        </div>

                        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                            <div className="relative flex -mt-2">

                                <input
                                    ref={messageRef}
                                    type="text"
                                    placeholder="Write your message!"
                                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                                />
                                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
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
                </>
            }

        </div>
    );
}
