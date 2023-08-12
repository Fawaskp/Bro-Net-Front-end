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


export function VideoPostingModal({ fetchPosts, videoselected, video, open, handleOpen }) {

    let description = ''

    const handleFormSubmit = () => {
        const user = getLocal('AuthToken')
        const user_decoded = jwtDecode(user).custom
        const formData = new FormData();
        formData.append('video', video);
        formData.append('user', user_decoded.user_id)
        formData.append('description', description)
        postAxiosInstance.post('post-video/', formData).then((response) => {
            if (response.status == 200) {
                handleOpen()
                fetchPosts()
            }
        }).catch((err) => {
            console.log(err);
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
                            video &&
                            <div className="flex justify-center align-middle">
                                <video controls className="mx-auto max-h-72">
                                    <source src={URL.createObjectURL(video)} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        }
                    </Carousel>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        color="gray"
                        onClick={(e) => {
                            videoselected(false)
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