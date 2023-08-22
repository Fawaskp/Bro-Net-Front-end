import React, { useEffect, useRef, useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { Avatar } from '@material-tailwind/react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../helpers/auth';
import { userAxiosInstance } from '../../utils/axios-utils';
import { apiUrl, defaultUserImageLink, wsApiUrl } from '../../constants/constants';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ChatList from './ChatList';
import Messaging from './Messaging';


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

function MessagePage() {
    const [refresh,setRefresh] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('user');

    const [isFirstLoad, setIsFirstLoad] = useState(false)

    const [recipientdetails, setRecipientDetails] = useState({})
    const [senderdetails, setSenderDetails] = useState({ id: 1 });

    const [senderid, setSenderId] = useState(null);
    const [recipientid, setRecipientId] = useState(null)

    const [clientstate, setClientState] = useState('');
    const [messages, setMessages] = useState([]);
    const messageRef = useRef()

    const handleButtonClick = () => {
        queryParams.set('user', 'beatbase');
        navigate(`/user/messaging/?${queryParams.toString()}`);
    };

    const onButtonClicked = () => {
        clientstate.send(
            JSON.stringify({
                message: messageRef.current.value,
                senderUsername: senderdetails.username,
                recieverUsername: recipientdetails.username,
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
                        return
                    }
                    else {
                        callSetBasicDetails(response.data.id, setRecipientDetails, setRecipientId)
                    }
                })
            }
        }
    }, [])

   

    return (
        <div className='flex max-w-5xl mx-auto m-0 max-h-screen-40rem' >
            <ChatList refresh={setRefresh} />
            <Messaging/>
        </div>
    );
}

export default MessagePage
