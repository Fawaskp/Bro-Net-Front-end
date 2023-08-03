import React, { useState, useRef, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Input
} from "@material-tailwind/react";
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { userAxiosInstance } from '../../../utils/axios-utils';
import { getLocal } from '../../../helpers/auth';
import { Select, Option } from "@material-tailwind/react";

const ExperienceAddModal = ({ open, handleOpen, refresh }) => {

    const positionRef = useRef();
    const companyRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const positionValue = positionRef.current.value;
        const companyValue = companyRef.current.value;

        const authToken = getLocal('AuthToken');
        const user_decoded = jwtDecode(authToken).custom;

        const formData = new FormData();
        formData.append('user', user_decoded.user_id);
        formData.append('position', positionValue);
        formData.append('company', companyValue);

        userAxiosInstance
            .post('user-work-experience', formData)
            .then((response) => {
                handleOpen();
                toast.success('Experience Added Successfully');
                refresh();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong. Please try again!');
            });
    };

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg">Add Your Experience</DialogHeader>
                <DialogBody divider>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <Input inputRef={positionRef} size="lg" label="Position" />
                            <Input inputRef={companyRef} size="lg" label="Company" />
                        </div>

                        <div className="flex p-3 justify-center pt-10">
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
};

export default ExperienceAddModal;
