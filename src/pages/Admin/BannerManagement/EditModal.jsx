import React, { useRef, useState } from "react";
import {
    Button,
    Dialog,
    Input,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { postAxiosInstance, suAxiosInstance } from "../../../utils/axios-utils";

export function EditBanner({ open, handleOpen, Editinstance, refresh, id }) {

    const headingRef = useRef()
    const contentRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('heading : ', headingRef.current);
        console.log('content : ', contentRef.current);
        const headingValue = headingRef.current.value
        const contentValue = contentRef.current.value

        const formData = new FormData()
        if (headingValue.trim() == '' || contentValue.trim() == '') {
            toast.error("field can't be null are required!!")
            return;
        }
        formData.append('heading', headingValue)
        formData.append('content', contentValue)
        postAxiosInstance.put(`banner-detail/${Editinstance.id}/`, formData).then((response) => {
            handleOpen()
            toast.success('Banner Edited Successfully')
            refresh()
        }).catch((err) => {
            console.log(err);
            if (err.response.data.heading)
                toast.error(err.response.data.name[0])
            else
                toast.error('Something went wrong, Try again! ')
        })
    }

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg" >Edit Skill</DialogHeader>
                <DialogBody divider>
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <div className="flex flex-col gap-4" >
                            <Input defaultValue={Editinstance?.heading} inputRef={headingRef} size="lg" label="Heading" />
                            <textarea
                            defaultValue={Editinstance?.content}
                                ref={contentRef}
                                rows="4"
                                className=" px-0 min-w-full text-sm text-gray-900 border p-3 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a content here"
                            ></textarea>
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