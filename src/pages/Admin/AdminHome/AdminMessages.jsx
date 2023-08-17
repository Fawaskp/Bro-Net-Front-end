import {
  Card,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { suAxiosInstance } from "../../../utils/axios-utils";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../../../helpers/fomate_date";


export default function AdminMessages() {

  const [messages, setMessages] = useState([])
  const messageRef = useRef()

  const fetchAllAdminMessages = () => {
    suAxiosInstance.get('admin-messages/').then((response) => {
      if (response.status == 200) {
        setMessages(response.data)
      }
    })
  }

  const postAdminMessage = () => {
    const messageValue = messageRef.current.value
    suAxiosInstance.post('admin-messages/', { message: messageValue }).then((response) => {
      if (response.status == 201) {
        fetchAllAdminMessages()
      }
    })
  }

  useEffect(() => {
    fetchAllAdminMessages()
  }, [])

  return (
    <Card className="w-84 flex -mt-4 h-[50rem] w-2/5 border rounded-10 p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4 w-full">
        <Typography variant="h6" color="blue-gray">
          Post Messages
        </Typography>
      </div>
      <div className="h-[40rem] overflow-y-scroll pb-" >
        {
          messages.map((message) => {
            return (
              <div className="flex justify-around my-3 items-end" >
                <div className="m-1 p-2 w-5/6 rounded-tl-lg rounded-tr-lg text-left rounded-bl-lg border text-sm break-words">
                  {message.message}
                  <div className="float-left pt-3 text-indigo-400" >
                    { formatDate(message.created_at)}
                  </div>
                </div>
                <Avatar size="xs" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" />
              </div>
            )
          })
        }
      </div>
      <div className="relative mt-2">
        <input
          ref={messageRef}
          type="text"
          placeholder="Write your message!"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 ps-2 pr-16 bg-gray-200 rounded-md py-3"
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            onClick={postAdminMessage}
            type="button"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2  m-2 transition duration-500 ease-in-out text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none"
          >
            <PaperAirplaneIcon className='w-5 text-white' />
          </button>
        </div>
      </div>
    </Card>
  );
}