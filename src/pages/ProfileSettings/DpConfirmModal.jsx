import React, { useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import { apiUrl } from "../../constants/constants";
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import { updateUserProfile } from "../ProfileCompletion/api";
import { getLocal } from "../../helpers/auth";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

export function DpConfirmModal({ open, handleOpen, setImage, image1, image2 }) {


    const uploadImage = () => {
        const user = getLocal('AuthToken')
        const user_decoded = jwtDecode(user)
        const imageFormData = new FormData();
        imageFormData.append('profile_image', image2)
        updateUserProfile(imageFormData, user_decoded.custom.user_id).then((result) => {
            if (result) {
                setImage(result.profile_image)
                toast.success('Profile image updated successfully')
            }
        })

        handleOpen()
    }

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg" >Are you sure to set image?</DialogHeader>
                <DialogBody divider>
                    <div className="flex justify-center" >
                        {
                            image1 &&
                            <>
                                <img
                                    alt="User-Dp"
                                    src={apiUrl + image1}
                                    className="rounded-10 mx-4 w-28 lg:w-28 h-28 lg:h-28 object-cover -top-1/2 left-1/2  ring-4 ring-gray-50"
                                />
                                <ChevronDoubleRightIcon className="w-11" />
                            </>
                        }
                        {
                            image2 &&
                            <img
                                alt="User-Dp"
                                src={URL.createObjectURL(image2)}
                                className="rounded-10 mx-4 w-28 lg:w-28 h-28 lg:h-28 object-cover -top-1/2 left-1/2  ring-4 ring-gray-50"
                            />
                        }
                    </div>
                    <div className="flex p-3 justify-center pt-10" >
                        <Button size="sm" variant="gradient" color="red" onClick={handleOpen} className="mr-1 h-9">
                            <span>Cancel</span>
                        </Button>
                        <Button onClick={uploadImage} size="sm" variant="gradient" color="green" className="h-9">
                            <span>Confirm</span>
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}