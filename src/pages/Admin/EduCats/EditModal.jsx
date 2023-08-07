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

export function EditCategory({ open, handleOpen,Editinstance,refresh,id }) {

    const nameRef = useRef()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const nameValue = nameRef.current.value

        const formData = new FormData()
        if(nameValue.trim()==''){
            toast.error("field can't be null are required!!")
            return;
        }
        formData.append('name',nameValue)
        suAxiosInstance.put(`education-categories/${Editinstance.id}/`,formData).then((response)=>{
            handleOpen()
            toast.success('Education Category Edited Successfully')
            refresh()
        }).catch((err)=>{
            console.log(err);
            if(err.response.data.location)
                toast.error(err.response.data.name[0])
            else
                toast.error('Something went wrong, Try again! ')
        })
    }

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg" >Edit Education Category</DialogHeader>
                <DialogBody divider>
                    <form onSubmit={(e)=>handleSubmit(e)} >
                        <div className="flex flex-col gap-4" >
                            <Input defaultValue={Editinstance?.name} inputRef={nameRef} size="lg" label="Location" />
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