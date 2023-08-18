import React, { useRef } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Carousel,
    Textarea,
} from "@material-tailwind/react";
import { getLocal } from "../../../helpers/auth";
import jwtDecode from "jwt-decode";
import { postAxiosInstance } from "../../../utils/axios-utils";
import { toast } from "react-toastify";


export function ImagePostingModal({ fetchPosts,imageselected, images, open, handleOpen }) {

    let description = ''

    const handleFormSubmit = () => {
        const user = getLocal('AuthToken')
        const user_decoded = jwtDecode(user).custom
        const formData = new FormData();
        images.map((image, index) => {
            formData.append(`image[${index}]`, image);
        })
        formData.append('user', user_decoded.user_id)
        formData.append('description', description)
        formData.append('post-type', 'image')
        postAxiosInstance.post('post-image/', formData).then((response) => {
            if(response.status == 200){
                handleOpen()
                fetchPosts()
                imageselected(false)
                
                toast.success("Image Post Added Successfully")
            }
        }).catch((err)=>{
            toast('Sorry something went wrong')
        })
    }


    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Ready to post</DialogHeader>
                <DialogBody divider>
                    <Textarea onChange={(e) => description = e.target.value} variant="standard" placeholder="description" className="border-none" />
                    <Carousel className="rounded-xl mt-10">
                        {
                            images.length > 0 ?
                                images.map((image) => {
                                    return (
                                        <div className="flex justify-center align-middle" >
                                            <img src={URL.createObjectURL(image)}
                                                alt="image 1"
                                                className="mx-auto max-h-72"
                                            />
                                        </div>
                                    )
                                })
                                :
                                ''
                        }
                    </Carousel>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        color="gray"
                        onClick={(e) => {
                            imageselected(false)
                            handleOpen()
                        }}
                        className="mr-1 rounded-full"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button className="rounded-full" variant="gradient" color="indigo" onClick={handleFormSubmit}>
                        <span>Post</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}