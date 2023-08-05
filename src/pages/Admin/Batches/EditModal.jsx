import React, { useRef } from "react";
import {
    Button,
    Dialog,
    Input,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { suAxiosInstance } from "../../../utils/axios-utils";

export function EditBatch({ open, handleOpen,Editinstance,refresh,id }) {

    const codeRef = useRef()
    const locationRef = useRef()

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log('Location : ',locationRef.current);
        console.log('Code : ',codeRef.current);
        const locationValue = locationRef.current.value
        const codeValue = codeRef.current.value

        const formData = new FormData()
        if(locationValue.trim()==''||codeValue.trim()==''){
            toast.error("field can't be null are required!!")
            return;
        }
        formData.append('location',locationValue)
        formData.append('code',codeValue)
        suAxiosInstance.put(`hub/${Editinstance.id}/`,formData).then((response)=>{
            handleOpen()
            toast.success('Hub Edited Successfully')
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
                <DialogHeader className="font-normal text-lg" >Edit Skill</DialogHeader>
                <DialogBody divider>
                    <form onSubmit={(e)=>handleSubmit(e)} >
                        <div className="flex flex-col gap-4" >
                            <Input defaultValue={Editinstance?.location} inputRef={locationRef} size="lg" label="Location" />
                            <Input defaultValue={Editinstance?.code} inputRef={codeRef} size="lg" label="Code" />
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