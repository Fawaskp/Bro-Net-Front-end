import {
  Card,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { suAxiosInstance } from "../../utils/axios-utils";
import { formatDate } from "../../helpers/fomate_date";

export default function AdminMessages() {

  const [messages, setMessages] = useState([])

  const fetchAllAdminMessages = () => {
    suAxiosInstance.get('admin-messages/').then((response) => {
      if (response.status == 200) {
        setMessages(response.data)
      }
    })
  }

  useEffect(()=>{
    fetchAllAdminMessages()
  },[])

  return (
    <Card className="sticky top-24 w-84 flex h-[18.5rem] overflow-y-scroll justify-between border rounded-10 m-2 p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4 w-full">
        <Typography variant="h6" color="blue-gray">
          Messages from admin
        </Typography>
      </div>
      {
          messages.map((message) => {
            return (
              <div className="flex justify-around items-end" >
                <div className="p-2 w-5/6 rounded-tl-lg rounded-tr-lg text-left rounded-bl-lg border text-sm break-words">
                  {message.message}
                  <div className="float-left pt-2 text-indigo-400" >
                    { formatDate(message.created_at)}
                  </div>
                </div>
                <Avatar size="xs" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" />
              </div>
            )
          })
        }
    </Card>
  );
}