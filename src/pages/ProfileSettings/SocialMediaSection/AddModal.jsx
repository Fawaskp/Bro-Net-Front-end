import React, { useEffect, useRef, useState } from "react";
import {
    Select,
    Option,
    Button,
    Dialog,
    Input,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { userAxiosInstance } from "../../../utils/axios-utils";

export function AddSocialAccount({ open, user_id,handleOpen, refresh }) {

    const [selectedmedia, setSelectedMedia] = useState(null)
    const [socialmedia, setSocialMedia] = useState([])
    const urlRef = useRef()

    const callSetSocialMedia = () => {
        userAxiosInstance.get('social-media').then((response) => {
            if (response.status == 200) {
                setSocialMedia(response.data)
            }
        }).catch((err) => toast.error('something went wrong'))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = urlRef.current.value

        const formData = new FormData()
        if (url.trim() == '' || selectedmedia == null) {
            toast.error('Both fields are required!!')
            return;
        }

        formData.append('social_media', selectedmedia)
        formData.append('user', user_id)
        formData.append('url', url)
        console.log(selectedmedia,user_id,url);
        userAxiosInstance.post('user-social-media', formData).then((response) => {
            handleOpen()
            toast.success('Social Media Addedd Successfully')
            refresh()
        }).catch((err) => {
            console.log(err);
            if (err.response.data.name)
                toast.error(err.response.data.name[0])
            else
                toast.error('Something went wrong, Try again! ')
        })
    }

    useEffect(() => {
        callSetSocialMedia()
    },[])

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg" >Add Social account here</DialogHeader>
                <DialogBody divider>
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <div className="flex flex-col gap-4" >
                            <div>
                                <Select onChange={(e) => setSelectedMedia(e)} label="Select a media">
                                    {
                                        socialmedia.map((media) => {
                                            return (
                                                <Option value={media.id} >{media.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                            <Input inputRef={urlRef} size="lg" label="Url" />
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