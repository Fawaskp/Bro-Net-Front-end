import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Input
} from "@material-tailwind/react";
import Select from 'react-select';
import { suAxiosInstance } from '../../../utils/axios-utils';
import { toast } from 'react-toastify';
import { getLocal } from '../../../helpers/auth';
import jwtDecode from 'jwt-decode';

const ProjectAddModal = ({ open, handleOpen, refresh }) => {
    const [logo, setLogo] = useState(null);
    const nameRef = useRef();
    const descriptionRef = useRef();
    const repositoryLinkRef = useRef();
    const liveLinkRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const nameValue = nameRef.current.value;
        const descriptionValue = descriptionRef.current.value;
        const repositoryLinkValue = repositoryLinkRef.current.value;
        const liveLinkValue = liveLinkRef.current.value;

        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
        if (!urlPattern.test(repositoryLinkValue)) {
            toast.error('Enter Valid Repo Link')
            return
        }
        else if (!urlPattern.test(liveLinkValue)) {
            toast.error('Enter Valid LIve Link')
            return
        }

        const skillsInputs = document.getElementsByName('select_react')
        const authToken = getLocal('AuthToken')
        const user_decoded = jwtDecode(authToken).custom


        const formData = new FormData();
        formData.append('user', user_decoded.user_id);
        formData.append('name', nameValue);
        formData.append('description', descriptionValue);
        formData.append('repository_link', repositoryLinkValue);
        formData.append('live_link', liveLinkValue);
        formData.append('logo', logo);

        for (var i = 0; i < skillsInputs.length; i++) {
            formData.append('skills_used', parseInt(skillsInputs[i].value))
        }

        suAxiosInstance
            .post('projects/', formData)
            .then((response) => {
                handleOpen();
                setLogo(null);
                toast.success('Project Added Successfully');
                refresh();
            })
            .catch((err) => {
                console.log(err);
                if (err.response.data.name) toast.error(err.response.data.name[0]);
                else if (err.response.data.logo) toast.error(err.response.data.logo[0]);
                else toast.error('Something went wrong. Please try again!');
            });
    };
    const [skills, setSkills] = useState([])
    useEffect(() => {
        suAxiosInstance.get('/skills/').then((res) => {
            console.log(res.data);
            res.data.map((skill) => {
                skills.push({ value: skill.id, label: skill.name, icon: skill.icon })
            })
        }).catch((err) => console.log(err))

    }, [])

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="font-normal text-lg">Are you sure to set image?</DialogHeader>
                <DialogBody divider>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div className="w-full flex justify-center">{logo && <img className="w-1/6" src={URL.createObjectURL(logo)} alt="" />}</div>

                            <div className="mt-4">
                                <label htmlFor="logoInput" className="block w-full px-4 p-4 text-center text-xs text-white bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none">
                                    {logo ? 'Change Logo' : 'Choose Logo'}
                                </label>
                                <input id="logoInput" type="file" className="hidden" onChange={(e) => setLogo(e.target.files[0])} />
                                {logo && <p className="mt-2 text-center text-gray-700 dark:text-gray-300">{logo.name}</p>}
                            </div>

                            <Input inputRef={nameRef} size="lg" label="Name" />
                            <Input inputRef={descriptionRef} size="lg" label="Description" />
                            <Input inputRef={repositoryLinkRef} size="lg" label="Repository Link" />
                            <Input inputRef={liveLinkRef} size="lg" label="Live Link" />
                            <Select
                                name='select_react'
                                options={skills}
                                isMulti
                                isSearchable
                                placeholder={'Select Skill'}
                                noOptionsMessage={() => 'No Skillls match'}
                                getOptionLabel={(skill) => (
                                    <>
                                        <div className='flex items-center' >
                                            <img style={{ width: '40px' }} className='p-1 h-auto' src={skill.icon} alt={skill.label} />
                                            <h5 className='text-gray-800 font-semibold ms-3' >{skill.label}</h5>
                                        </div>
                                    </>
                                )}
                            />
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

export default ProjectAddModal