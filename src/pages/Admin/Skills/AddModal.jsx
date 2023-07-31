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

export function AddSocialMediaModal({ open, handleOpen, refresh }) {
    const [icon, setIcon] = useState('')
    const iconRef = useRef()
    const nameRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const nameValue = nameRef.current.value
        const formData = new FormData()
        if (nameValue.trim() == '' || !icon) {
            toast.error('Both fields are required!!')
            return;
        }
        formData.append('name', nameValue)
        formData.append('icon', icon)
        suAxiosInstance.post('skills/', formData).then((response) => {
            handleOpen()
            setIcon('')
            toast.success('Skill Addedd Successfully')
            refresh()
        }).catch((err) => {
            console.log(err);
            if (err.response.data.name)
                toast.error(err.response.data.name[0])
            else if (err.response.data.icon)
                toast.error(err.response.data.icon[0])
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
                            <div className="w-full flex justify-center" > {icon && <img className="w-1/6" src={URL.createObjectURL(icon)} alt="" />} </div>

                            <div className="mt-4">

                                <label
                                    htmlFor="iconInput"
                                    className="block w-full px-4 p-4 text-center text-xs text-white bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
                                >
                                    {icon ? 'Change Icon' : 'Choose Icon'}
                                </label>
                                <input
                                    id="iconInput"
                                    ref={iconRef}
                                    type="file"
                                    className="hidden"
                                    onChange={(e)=>{
                                        if (e.target.value[0] != null)
                                            setIcon(e.target.files[0])
                                    }}
                                />
                                {icon && (
                                    <p className="mt-2 text-center text-gray-700 dark:text-gray-300">{icon.name}</p>
                                )}
                            </div>
                            <Input inputRef={nameRef} size="lg" label="Name" />
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