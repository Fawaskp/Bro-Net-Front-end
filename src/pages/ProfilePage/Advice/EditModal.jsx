import React, { useEffect, useRef, useState } from "react";
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

export function EditAdvice({ open, purpose, handleOpen, Editinstance, refresh, id }) {

    const titleRef = useRef()
    const [matter, setMatter] = useState('')

    useEffect(() => {
        {
            purpose == 'do' ?
                setMatter(Editinstance.do)
                :
                setMatter(Editinstance.dont)

        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        const titleValue = titleRef.current.value
        const formData = new FormData()
        console.log(titleValue, matter);
        if (titleValue.trim() == '' || matter.trim() == '') {
            toast.error("field can't be null")
            return;
        }
        formData.append('title', titleValue)
        formData.append('user', Editinstance.user)
        if (purpose == 'do') {
            formData.append('do', matter)
        }
        else {
            formData.append('dont', matter)
        }
        const url = purpose == 'do' ? 'dos-detail' : 'donts-detail'
        userAxiosInstance.put(`${url}/${Editinstance.id}/`, formData).then((response) => {
            handleOpen()
            toast.success('Hub Edited Successfully')
            const url = purpose == 'do' ? refresh[1]() : refresh[0]()
        }).catch((err) => {
            console.log(err);
            if (err.response.data.location)
                toast.error(err.response.data.name[0])
            else
                toast.error('Something went wrong, Try again! ')
        })
    }

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg" >Edit {purpose}</DialogHeader>
                <DialogBody divider>
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <div className="flex flex-col gap-4" >
                            <Input defaultValue={Editinstance.title} inputRef={titleRef} size="lg" label="Title" />
                            {
                                purpose == 'do' ?
                                    <Textarea defaultValue={Editinstance.do} onChange={(e) => setMatter(e.target.value)} label={purpose} />
                                    :
                                    <Textarea defaultValue={Editinstance.dont} onChange={(e) => setMatter(e.target.value)} label={purpose} />
                            }
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