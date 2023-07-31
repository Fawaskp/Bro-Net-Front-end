import React, { useRef, useState } from "react";
import {
    Button,
    Dialog,
    Input,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
// import { apiUrl } from "../../constants/constants";
// import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
// import { updateUserProfile } from "../ProfileCompletion/api";
// import { getLocal } from "../../helpers/auth";
// import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { suAxiosInstance } from "../../../utils/axios-utils";

export function EditSocialMediaModal({ open, handleOpen,Editinstance,refresh,id }) {

    const [icon,setIcon] = useState('')
    const iconRef = useRef()
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
        {icon?formData.append('icon',icon):''}
        suAxiosInstance.put(`social-media/${Editinstance.id}/`,formData).then((response)=>{
            handleOpen()
            setIcon('')
            toast.success('Social Media Edited Successfully')
            refresh()
        }).catch((err)=>{
            console.log(err);
            if(err.response.data.name)
                toast.error(err.response.data.name[0])
            else if(err.response.data.icon)
                toast.error(err.response.data.icon[0])
            else
                toast.error('Something went wrong, Try again! ')
        })
    }

    const handleIconClick = () =>{ iconRef.current.click() }

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg" >Edit Skill</DialogHeader>
                <DialogBody divider>
                    <form onSubmit={(e)=>handleSubmit(e)} >
                        <div className="flex flex-col gap-4" >
                            <div className="w-full flex justify-center" onClick={handleIconClick} >
                                {
                                    icon?
                                    <img className="w-1/6" src={URL.createObjectURL(icon)} alt="" /> 
                                    :
                                    Editinstance?.icon && <img className="w-1/6" src={Editinstance?.icon} alt="" /> 
                                }
                            </div>
                            <input className="hidden" onChange={(e)=> { 
                                    if(e.target.value[0]!=null) 
                                        setIcon(e.target.files[0])
                                    } 
                                } 
                            ref={iconRef} type="file"
                            />
                            <Input defaultValue={Editinstance?.name} inputRef={nameRef} size="lg" label="Name" />
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