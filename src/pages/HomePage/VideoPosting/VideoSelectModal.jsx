import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Carousel,
} from "@material-tailwind/react";
import { VideoPostingModal } from "./VideoPostModal";

export function VideoSelectModal({ fetchPosts, open, handleOpen }) {

    const videoInputRef = useRef()

    const [videoselected, setVideoSelected] = useState(false)
    const [video, setVideo] = useState([])

    const [openpostmodal, setOpenPostModal] = useState(false);
    const handlePostModal = () => setOpenPostModal(!openpostmodal);

    const handleIconClick = () => {
        videoInputRef.current.click();
    };

    return (
        <>
            {
                videoselected &&
                <VideoPostingModal fetchPosts={fetchPosts} videoselected={setVideoSelected} video={video} open={openpostmodal} handleOpen={handlePostModal} />
            }

            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Add Video</DialogHeader>
                <DialogBody divider style={{ maxHeight: '70vh' }} className="overflow-y-scroll" >
                    {
                        videoselected ?
                            <div className="flex justify-center align-middle">
                                <video controls className="mx-auto max-h-72">
                                    <source src={URL.createObjectURL(video)} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            :
                            <p className="font-semibold text-center text-indigo-500 cursor-pointer p-20" onClick={handleIconClick} >
                                Select a video
                            </p>
                    }
                    <input type="file" className='hidden' ref={videoInputRef} onChange={(e) => {
                        if (e.target.files != null) {
                            setVideo(e.target.files[0])
                            setVideoSelected(true)
                        }
                    }}
                    />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        color="gray"
                        onClick={(e) => {
                            setVideo([])
                            setVideoSelected(false)
                            handleOpen()
                        }}
                        className="mr-1 rounded-full"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button disabled={videoselected ? false : true} className="rounded-full" variant="gradient" color="indigo" onClick={() => {
                        handleOpen()
                        handlePostModal()
                    }}>
                        <span>Done</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}