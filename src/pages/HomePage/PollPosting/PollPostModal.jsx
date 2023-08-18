import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    IconButton,
    Progress,
} from "@material-tailwind/react";
import { getLocal } from "../../../helpers/auth";
import jwtDecode from "jwt-decode";
import { postAxiosInstance } from "../../../utils/axios-utils";
import { toast } from "react-toastify";
import { XCircleIcon } from "@heroicons/react/24/outline";


export function PollPostModal({ fetchPosts, imageselected, images, open, handleOpen }) {

    const subjectRef = useRef()
    const [items, setItems] = useState([
        { label: "Option",value:'' ,id: 1 },
        { label: "Option",value:'' ,id: 2 },
    ])
    
    const handleFormSubmit = () => {
        const user = getLocal('AuthToken')
        const user_decoded = jwtDecode(user).custom
        const formData = new FormData();
        const options = items.map((poll,idx)=>{
            formData.append(`option${idx+1}`,poll.value)
        })
        const subjectValue = subjectRef.current.value
        formData.append('subject',subjectValue)
        formData.append('optionscount',items.length)
        formData.append('user',user_decoded.user_id)
        postAxiosInstance.post('post-poll/',formData).then((response)=>{
            if(response.status == 200){
                handleOpen()
                toast.success("Image Post Added Successfully")
                console.log('Response of poll posting ::>> ',response.data);
            }
        })
    }

    const handleInputChange = (id, value) => {
        const updatedPolls = items.map(poll => {
            if (poll.id === id) {
                return { ...poll, value: value };
            }
            return poll;
        });
        setItems(updatedPolls);
    };

    const addNewItem = () => {
        if (items.length < 6) {
            const newItemId = items.length + 1;
            const newItemLabel = `Option `;
            setItems([...items, { label: newItemLabel, value:'',id: items[items.length - 1].id + 1 }]);
        }
        else {
            toast.warning('Atmost Reached')
        }
    };


    const handleDelete = (id) => {
        const updatedPolls = items.filter(poll => poll.id !== id);
        setItems(updatedPolls);
    };

    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Poll Post</DialogHeader>
                <DialogBody divider>
                <Input inputRef={subjectRef} type="text" label='Subject' />
                    <div className="flex flex-col mt-4 items-center" >
                        {
                            items.map((poll, idx) => {
                                return (
                                    idx > 1 ?
                                        <>
                                            <div className="flex my-2" >
                                                <Input  onChange={(e)=>handleInputChange(poll.id,e.target.value)} key={poll.id} label={poll.label+` ${idx+1}`} />
                                                <span>
                                                    <IconButton onClick={() => handleDelete(poll.id)} className="mx-3" variant="text" color="red" >
                                                        <XCircleIcon className="w-6" />
                                                    </IconButton>
                                                </span>
                                            </div>
                                        </>
                                        :
                                        <div className="flex my-2 -ms-16" >
                                            <Input onChange={(e)=>handleInputChange(poll.id,e.target.value)} key={poll.id} type="text" label={poll.label + ` ${idx + 1}`} />
                                        </div>
                                )
                            })
                        }
                    </div>
                    {
                        items.length < 6 ?
                            <Button onClick={addNewItem} >Add</Button>
                            :
                            <Button disabled>Add</Button>
                    }
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        color="gray"
                        onClick={(e) => {
                            handleOpen()
                        }}
                        className="mr-1 rounded-full"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button className="rounded-full" variant="gradient" color="indigo" onClick={handleFormSubmit}>
                        <span>Post</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}