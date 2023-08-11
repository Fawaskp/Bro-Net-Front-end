import React, { useRef, useState } from "react";
import {
    Button,
    Dialog,
    Input,
    DialogHeader,
    DialogBody,
    Select,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { userAxiosInstance } from "../../../utils/axios-utils";

export function EditSocialAccount({ open, handleOpen,user_id, Editinstance, refresh, id }) {

    const urlRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = urlRef.current.value

        const formData = new FormData()
        if (url.trim() == ''){
            toast.error("field can't be null are required!!")
            return;
        }
        else {
        formData.append('url', url)
        formData.append('user',user_id )
        formData.append('social_media',Editinstance.social_media.id )
        userAxiosInstance.put(`user-social-media-detail/${Editinstance.id}/`, formData).then((response) => {
            handleOpen()
            toast.success('Social Account Edited Successfully')
            refresh()
        }).catch((err) => {
            console.log(err);
            if (err.response.data.location)
                toast.error(err.response.data.name[0])
            else
                toast.error('Something went wrong, Try again! ')
        })
    }
}

return (
    <>
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader className="font-normal text-lg" >Edit Social Account</DialogHeader>
            <DialogBody divider>
                <form onSubmit={(e) => handleSubmit(e)} >
                    <div className="flex flex-col gap-4" >
                        <Select label={Editinstance?.social_media?.name} disabled>
                            <Option>{Editinstance?.social_media?.name}</Option>
                        </Select>
                        <Input defaultValue={Editinstance?.url} inputRef={urlRef} size="lg" label="Code" />
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