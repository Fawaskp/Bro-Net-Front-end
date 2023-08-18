import {
  Card,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { suAxiosInstance } from "../../utils/axios-utils";
import { formatTime } from "../../helpers/fomate_date";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function AdminMessages() {

  const [messages, setMessages] = useState([])
  const [loadspinning, setLoadSpinning] = useState(false);
  const messageRef = useRef()

  const fetchAllAdminMessages = () => {
    suAxiosInstance.get('admin-messages/').then((response) => {
      if (response.status == 200) {
        setMessages(response.data)
      }
    })
  }

  useEffect(() => {
    fetchAllAdminMessages()
  }, [])

  return (
    <Card className="sticky top-24 w-84 flex h-[18.5rem] justify-between border rounded-10  p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 w-full flex justify-between">
        <Typography variant="h6" color="blue-gray">
          Messages from admin
        </Typography>
        <ArrowPathIcon
          className={`w-5 cursor-pointer hover:text-indigo-800 transition-all duration-200 ${loadspinning ? 'animate-spin' : ''}`}
          onClick={() => {
            fetchAllAdminMessages()
            setLoadSpinning(true);
            setTimeout(() => {
              setLoadSpinning(false);
              messageRef.current.scrollTop = messageRef.current.scrollHeight;
            }, 500)
          }}
          
        >
          Reload
        </ArrowPathIcon>
      </div>
      <div className="overflow-y-scroll" ref={messageRef} >
        {
          messages.map((message) => {
            return (
              <div className="flex justify-around items-end my-2" >
                <div className="p-2 w-5/6 rounded-tl-lg rounded-tr-lg text-left rounded-bl-lg border text-sm break-words">
                  {message.message}
                  <div className="float-left pt-2 text-indigo-400" >
                    {formatTime(message.created_at)}
                  </div>
                </div>
                <Avatar size="xs" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" />
              </div>
            )
          })
        }
      </div>
    </Card>
  );
}