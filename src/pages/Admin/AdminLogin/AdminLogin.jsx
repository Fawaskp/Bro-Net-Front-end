import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

import { useEffect, useRef } from "react";
import { suAxiosInstance } from "../../../utils/axios-utils";
import { toast } from "react-toastify";
export function AdminLogin() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const login = (e) => {
        e.preventDefault()

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isEmailValid) {
          alert("Please enter a valid email address.");
          return;
        }
        
        suAxiosInstance.post('login',{email,password}).then((response)=>{
            console.log(response.data);
            if(response.status==202){
                toast.success('Logged In sucessfully')
                localStorage.setItem('AuthToken',JSON.stringify(response.data.token));
            }
            else{
                toast.error(response.data.message)
                return
            }
        })

    }

    useEffect(() => {
        document.title = 'Admin Login'
    })

    return (
        <div className="flex justify-center mt-48" >
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Admin Login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to Login.
                </Typography>
                <form onSubmit={(e) => login(e)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input inputRef={emailRef} type="email" size="lg" label="E-mail" />
                        <Input inputRef={passwordRef} type="password" size="lg" label="Password" />
                    </div>
                    <Button type="submit" className="mt-6" fullWidth>
                        Get In
                    </Button>
                </form>
            </Card>
        </div>
    );
}