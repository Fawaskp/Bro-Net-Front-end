import React, { useRef, useState } from "react";
import {
    Button,
    Dialog,
    Input,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { suAxiosInstance } from "../../../utils/axios-utils";

export function AddHub({ open, handleOpen, refresh }) {
    const locationRef = useRef()
    const codeRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const locationValue = locationRef.current.value
        const codeValue = codeRef.current.value

        const formData = new FormData()
        if (locationValue.trim() == '' || codeValue.trim() == '' ) {
            toast.error('Both fields are required!!')
            return;
        }

        formData.append('location', locationValue)
        formData.append('code', codeValue)
        suAxiosInstance.post('hubs/', formData).then((response) => {
            handleOpen()
            toast.success('Hub Addedd Successfully')
            refresh()
        }).catch((err) => {
            console.log(err);
            if (err.response.data.name)
                toast.error(err.response.data.name[0])
            else
                toast.error('Something went wrong, Try again! ')
        })
    }


    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg" >Are you sure to set image?</DialogHeader>
                <DialogBody divider>
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <div className="flex flex-col gap-4" >
                            <Input inputRef={locationRef} size="lg" label="Location" />
                            <Input inputRef={codeRef} size="lg" label="Code" />
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