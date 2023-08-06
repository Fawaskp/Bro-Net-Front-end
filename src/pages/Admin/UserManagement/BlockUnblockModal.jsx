import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { blockUser, unBlockUser } from "./api";

export function UserBlockUnBlockModal({ open, handleOpen, purpose, instance, refresh }) {

    const performAction = () => {
        if (purpose == 'block')
            blockUser(instance.id, refresh), handleOpen()
        else if (purpose == 'unblock')
            unBlockUser(instance.id, refresh), handleOpen()
        else
            toast.error('Sorry! something went wrong')
    }

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg" >Are you sure?</DialogHeader>
                <DialogBody divider>

                    <h1>Are you sure to {purpose} user {instance?.name}</h1>
                    <div className="flex p-3 justify-center pt-10" >
                        <Button size="sm" variant="gradient" color="red" onClick={handleOpen} className="mr-1 h-9">
                            <span>Cancel</span>
                        </Button>
                        <Button onClick={performAction} type="submit" size="sm" variant="gradient" color="indigo" className="h-9">
                            <span>{purpose}</span>
                        </Button>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}