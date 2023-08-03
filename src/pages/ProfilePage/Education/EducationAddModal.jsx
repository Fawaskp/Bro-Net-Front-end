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

const EducationAddModal = ({ open, handleOpen, refresh }) => {

    const institutionRef = useRef();
    const courseRef = useRef();
    const locationRef = useRef();
    const [selectedCategory, setSelectedCategory]= useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const institutionValue = institutionRef.current.value;
        const courseValue = courseRef.current.value;
        const locationValue = locationRef.current.value;

        const authToken = getLocal('AuthToken');
        const user_decoded = jwtDecode(authToken).custom;

        const formData = new FormData();
        formData.append('user', user_decoded.user_id);
        formData.append('institution', institutionValue);
        formData.append('course', courseValue);
        formData.append('location', locationValue);
        if(!selectedCategory){
            toast.error(`Every field is important -> ${selectedCategory}`)
            return;
        }
        formData.append('category', selectedCategory);
  
        userAxiosInstance
            .post('user-education', formData)
            .then((response) => {
                handleOpen();
                toast.success('Education Added Successfully');
                refresh();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong. Please try again!');
            });
    };

    const [eduCategories, setEduCategories] = useState([])

    useEffect(() => {
        userAxiosInstance.get('education-categories').then((response) => {
            console.log(response.data);
            setEduCategories(response.data)
        })
    }, [])

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg">Add Your Education</DialogHeader>
                <DialogBody divider>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <Select onChange={(e)=>setSelectedCategory(e)} label="Select Category">
                                {
                                    eduCategories.map((category) => {
                                        return (
                                            <Option value={category.id} >{category.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                            <Input inputRef={institutionRef} size="lg" label="Institution" />
                            <Input inputRef={courseRef} size="lg" label="Course" />
                            <Input inputRef={locationRef} size="lg" label="Location" />
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

export default EducationAddModal;
