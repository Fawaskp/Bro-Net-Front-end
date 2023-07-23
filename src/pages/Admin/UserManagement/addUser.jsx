import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Card,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";

export function AddUserModal({ open, handleOpen, role }) {

    const [Fullname,setFullname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const clearFields = () =>{
        setEmail('')
        setFullname('')
        setPassword('')
    }

    const commonFields = () => {
        return (
            <>
                <Input onChange={(e)=>setFullname(e.target.value)} size="lg" label="Fullname" value={Fullname} />
                <Input onChange={(e)=>setEmail(e.target.value)}    size="lg" label="Email"    value={email}/>
                <Input onChange={(e)=>setPassword(e.target.value)} size="lg" label="Password"  value={password}/>
            </>
        )
    }

    const coordinatorForm = () => {
        return (
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    {commonFields()}
                </div>
            </form>
        )
    }

    const adminForm = () => {
        return (
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    {commonFields()}
                </div>
            </form>
        )
    }

    const councillorForm = () => {
        return (
            <form  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    {commonFields()}
                </div>
            </form>
        )
    }

    const UserRoles = [
        {
            role: 'Student',
            value: 'student'
        },
        {
            role: 'Academic Coucellor',
            value: 'student'
        },
        {
            role: 'Review Co-ordinator',
            value: 'student'
        },
        {
            role: 'Brototype Admin',
            value: 'student'
        },
    ]

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Add {role}</DialogHeader>
                <DialogBody divider>
                    <div className="flex justify-center" >
                        <Card color="transparent" shadow={false}>
                            {role === 'co-ordinator' && coordinatorForm()}
                            {role === 'admins' && adminForm()}
                            {role === 'councellors' && councillorForm()}
                            <div className="flex justify-center" >
                                <Button className="mt-6 px-8 rounded-10">
                                    Create
                                </Button>
                                <Button color="red"
                                    onClick={()=>{handleOpen(),clearFields()}}
                                    className="mt-6 mx-4 px-4 rounded-10" >
                                    Cancel
                                </Button>
                            </div>
                        </Card>
                    </div>
                    <Button
                        variant="text"
                        className="mr-1"
                    >
                        <span></span>
                    </Button>
                </DialogBody>
            </Dialog >
        </>
    );

}

