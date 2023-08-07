import React, { useRef, useState } from "react";
import {
    Button,
    Dialog,
    Input,
    DialogHeader,
    DialogBody,
    Textarea,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { userAxiosInstance } from "../../../utils/axios-utils";

export function AddAdviceModal({userId, open, handleOpen, purpose, refresh }) {
    const titleRef = useRef()
    const [matter, setMatter] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const titleValue = titleRef.current.value
        const formData = new FormData()
        if (titleValue.trim() == '' || matter.trim() == '') {
            toast.error('Both fields are required!!')
            return;
        }

        formData.append('title', titleValue)
        formData.append('user', userId)
        if (purpose == 'do') {
            formData.append('do', matter)
            userAxiosInstance.post(`dos/${userId}/`, formData).then((response) => {
                handleOpen()
                toast.success('Do Addedd Successfully')
                refresh[1]()
            }).catch((err) => {
                console.log(err);
                if (err.response.data.name)
                    toast.error(err.response.data.name[0])
                else
                    toast.error('Something went wrong, Try again! ')
            })
        }
        else if (purpose == 'dont') {
            formData.append('dont', matter)
            userAxiosInstance.post(`donts/${userId}/`, formData).then((response) => {
                handleOpen()
                toast.success('Dont Addedd Successfully')
                refresh[0]()
            }).catch((err) => {
                console.log(err);
                if (err.response.data.name)
                    toast.error(err.response.data.name[0])
                else
                    toast.error('Something went wrong, Try again! ')
            })
        }
        else {
            toast.error('Something went wrong')
        }
    }


    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg" >Add "{purpose}" </DialogHeader>
                <DialogBody divider>
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <div className="flex flex-col gap-4" >
                            <Input inputRef={titleRef} size="lg" label="Title" />
                            <Textarea onChange={(e) => setMatter(e.target.value)} label={purpose} />
                        </div>
                        <div className="flex p-3 justify-center pt-10" >
                            <Button size="sm" variant="gradient" color="red" onClick={handleOpen} className="mr-1 h-9">
                                <span>Cancel</span>
                            </Button>
                            <Button type="submit" size="sm" variant="gradient" color="indigo" className="h-9">
                                <span>Confirm</span>
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}