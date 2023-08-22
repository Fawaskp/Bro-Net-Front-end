import { Avatar, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { userAxiosInstance } from '../../utils/axios-utils'
import { getLocal } from '../../helpers/auth';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { apiUrl, defaultUserImageLink } from '../../constants/constants';

function ChatList({ refresh }) {

    const [chatlist, setChatList] = useState([])
    const queryParams = new URLSearchParams(location.search);
    const [selectedchat, setSelectedChat] = useState(queryParams.get('user'))
    const [senderdetails, setSenderDetails] = useState({})
    const navigate = useNavigate()

    const get_chat_list = (id = senderdetails.user_id) => {
        userAxiosInstance.get(`chat-list/${id}/`).then((response) => {
            console.log('Chat List ', response.data);
            setChatList(response.data)
        }).catch(err => console.log(err))
    }

    const handleChatClick = (username) => {
        setSelectedChat(username)
        navigate(`/user/messaging/?user=${username}`)
        refresh(true)
    }

    useEffect(() => {
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
            setSenderDetails(user_decoded)
            get_chat_list(user_decoded.user_id)
        }
    }, [])

    return (
        <div className='h-screen-90 w-2/6 m-3 mt-5 border border-gray-300 rounded-xl overflow-y-scroll px-2' >
            <div>
                {
                    chatlist.map((chat) => {
                        if (chat.username == selectedchat) {
                            return (
                                <div
                                    className="mx-0 my-3 flex items-center gap-4 p-2 bg-indigo-400 shadow rounded-xl cursor-pointer transition-all duration-200"
                                >
                                    <Avatar
                                        size="md"
                                        variant="circular"
                                        src={chat.user_profile ? apiUrl + chat.user_profile : defaultUserImageLink}
                                        alt="tania andrew"
                                    />
                                    <div className="flex w-full flex-col gap-0.5">
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h6" color="white">
                                                {chat.username}
                                            </Typography>
                                        </div>
                                        <p className='text-white text-xs'>Frontend Lead @ Google</p>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div
                                    className="mx-0 my-3 flex items-center gap-4 p-2 shadow rounded-xl cursor-pointer transition-all duration-200"
                                    onClick={() => handleChatClick(chat.username)}
                                >
                                    <Avatar
                                        size="md"
                                        variant="circular"
                                        src={chat.user_profile ? apiUrl + chat.user_profile : defaultUserImageLink}
                                        alt={chat.username}
                                    />
                                    <div className="flex w-full flex-col gap-0.5">
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h6" color="blue-gray">
                                                {chat.username}
                                            </Typography>
                                        </div>
                                        <p className='text-blue-gray text-xs'>Frontend Lead @ Google</p>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>

        </div>
    )
}

export default ChatList
