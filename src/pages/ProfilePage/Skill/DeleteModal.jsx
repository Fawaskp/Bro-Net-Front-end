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
import { userAxiosInstance } from "../../../utils/axios-utils";
import { getLocal } from "../../../helpers/auth";
import jwtDecode from "jwt-decode";

export function DeleteUserSkill({ open, handleOpen, instance, refresh }) {
    console.log('Modal Instance :> ', instance);

    const user = getLocal('AuthToken')
    const user_decoded = jwtDecode(user)

    const deleteUserSkill = () => {

        userAxiosInstance.delete(`user-skill-detail/${user_decoded.user_id}/`, { data: { skill_id: instance.id } }).then((response) => {
            if (response.status == 200) {
                refresh()
                handleOpen()
                toast.success(`${instance.name} deleted successfully`)
            }
            else{
                console.log('Response of deletion : ', response.data);
                toast.error('Something went wrong')
            }
                // toast.error(res.data.Message)
        })
    }

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg" >Are you sure?</DialogHeader>
                <DialogBody divider>

                    <h1>Are you user to delete skill {instance?.name}</h1>
                    <div className="flex p-3 justify-center pt-10" >
                        <Button size="sm" variant="gradient" color="red" onClick={handleOpen} className="mr-1 h-9">
                            <span>Cancel</span>
                        </Button>
                        <Button onClick={deleteUserSkill} type="submit" size="sm" variant="gradient" color="indigo" className="h-9">
                            <span>Confirm</span>
                        </Button>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}