import React, { useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Carousel,
} from "@material-tailwind/react";
import { ImagePostingModal } from "./ImagePostModal";

export function ImageSelectModal({ fetchPosts,open, handleOpen }) {

    const imagesInputRef = useRef()

    const [imageselected, setImageSelected] = useState(false)
    const [userimages, setUserImage] = useState([])

    const [openpostmodal, setOpenPostModal] = useState(false);
    const handlePostModal = () => setOpenPostModal(!openpostmodal);


    const handleIconClick = () => {
        imagesInputRef.current.click();
    };

    return (
        <>
            <ImagePostingModal fetchPosts={fetchPosts} imageselected={setImageSelected} images={userimages} open={openpostmodal} handleOpen={handlePostModal} />
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Add Images</DialogHeader>
                <DialogBody divider style={{ maxHeight: '70vh' }} className="overflow-y-scroll" >
                    <Carousel className="rounded-xl">
                        {
                            imageselected ?
                                userimages.map((image) => {
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
                                <p className="font-semibold text-center text-indigo-500 cursor-pointer p-20" onClick={handleIconClick} >
                                    Select images to post
                                </p>
                        }
                    </Carousel>
                    <input type="file" className='hidden' multiple ref={imagesInputRef} onChange={(e) => {
                        if (e.target.files != null) {
                            setUserImage(Array.from(e.target.files))
                            setImageSelected(true)
                        }
                    }}
                    />
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        color="gray"
                        onClick={(e) => {
                            setUserImage([])
                            setImageSelected(false)
                            handleOpen()
                        }}
                        className="mr-1 rounded-full"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button  disabled={imageselected?false:true} className="rounded-full" variant="gradient" color="indigo" onClick={() => {
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