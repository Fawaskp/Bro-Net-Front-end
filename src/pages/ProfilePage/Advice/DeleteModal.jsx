import React, { useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { userAxiosInstance } from "../../../utils/axios-utils";

export function DeleteAdvice({ open, handleOpen, purpose, id, refresh }) {
    const deleteAdvice = () => {
        const url = purpose == 'do' ? 'dos-detail' : 'donts-detail'
        userAxiosInstance.delete(`${url}/${id}/`).then((response) => {
            if (response.status == 204)
                purpose == 'do' ? refresh[1]() : refresh[0]()
            handleOpen()
            toast.success(`${purpose} deleted successfully`)
        }).catch((err) => {
            console.log('Error:! ', err);
        })
    }

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg" >Are you sure?</DialogHeader>
                <DialogBody divider>

                    <h1>Are you sure to delete {purpose}</h1>
                    <div className="flex p-3 justify-center pt-10" >
                        <Button size="sm" variant="gradient" color="red" onClick={handleOpen} className="mr-1 h-9">
                            <span>Cancel</span>
                        </Button>
                        <Button onClick={deleteAdvice} type="submit" size="sm" variant="gradient" color="indigo" className="h-9">
                            <span>Confirm</span>
                        </Button>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}