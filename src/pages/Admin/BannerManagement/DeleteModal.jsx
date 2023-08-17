import React, { useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { postAxiosInstance, suAxiosInstance } from "../../../utils/axios-utils";

export function DeleteBanner({ open, handleOpen, instance ,refresh }) {
    const deleteBanner = () => {
        postAxiosInstance.delete(`banner-detail/${instance.id}/`).then((response) => {
            if (response.status == 204) 
                refresh()
                handleOpen()
                toast.success(`Banner deleted successfully`)
        }).catch((err) => {
            console.log('Error:! ', err);
        })
    }

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                {/* <DialogHeader className="font-normal text-lg" >Are you sure?</DialogHeader> */}
                <DialogBody divider>
                    
                       <h1>Are you user to delete Banner</h1>
                        <div className="flex p-3 justify-center pt-10" >
                            <Button size="sm" variant="gradient" color="red" onClick={handleOpen} className="mr-1 h-9">
                                <span>Cancel</span>
                            </Button>
                            <Button onClick={deleteBanner} type="submit" size="sm" variant="gradient" color="indigo" className="h-9">
                                <span>Confirm</span>
                            </Button>
                        </div>

                </DialogBody>
            </Dialog>
        </>
    );
}