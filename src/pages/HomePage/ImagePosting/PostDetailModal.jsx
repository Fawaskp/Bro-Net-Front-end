import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogBody,
    Typography,
    Carousel,
} from "@material-tailwind/react";
import { apiUrl } from "../../../constants/constants";
import { HandThumbUpIcon, ChatBubbleBottomCenterTextIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { postAxiosInstance } from "../../../utils/axios-utils";
import { formatDate } from "../../../helpers/fomate_date";
import './post-detail.css'

export function PostDetailModal({ commentscount, setCommentsCount, comments, refreshComments, open, handleOpen, post }) {

    const images = post.post
    const commentRef = useRef('')
    const [commentbutton, setCommentButton] = useState(false)
    const [commentloadspinning, setCommentsLoadSpinning] = useState(false);

    const postComment = () => {
        const commnetValue = commentRef.current.value
        const data = { user: post.user.id, post: post.id, comment: commnetValue }
        postAxiosInstance.post(`/comments/${post.id}/`, data).then((response) => {
            if (response.status == 201) {
                refreshComments()
                setCommentsCount((prevcount) => {
                    return prevcount += 1
                })
                console.log(commentscount);
            }
        }).catch((err) => console.log(err))
    }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    let size = '';
    if (windowWidth <= 2000) {
        size = 'lg';
    } else {
        size = 'md';
    }

    return (
        <>
            <Dialog size={size} open={open} handler={handleOpen}>
                <DialogBody className="h-[40rem]">
                    <div className="flex" >
                        <div className="w-2/3 border p-2 me-2 rounded-md" >
                            {
                                images?.length > 1 ? (
                                    <Carousel>
                                        {images.map((imageurl, idx) => (
                                            <div key={idx} className="flex justify-center items-center h-full">
                                                <img
                                                    onDoubleClick={(e) => { setLiked(!liked) }}
                                                    src={apiUrl + imageurl}
                                                    alt='Post Image'
                                                    className="mx-auto"
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                ) : (
                                    <div className="flex justify-center items-center">
                                        <img
                                            onDoubleClick={(e) => { setLiked(!liked) }}
                                            src={apiUrl + images}
                                            alt='Post Image'
                                            className="mx-auto h-[30rem]"
                                        />
                                    </div>
                                )
                            }
                            <div className="flex">
                                <div className="flex flex-col justify-center me-2 p-3">
                                    <HandThumbUpIcon onClick={post.like_post} className="w-5 text-black" />
                                    <p className="text-xs" >{post.like_count} Likes</p>
                                </div>
                                <div className="flex flex-col justify-center mx-2">
                                    <ChatBubbleBottomCenterTextIcon className="w-5 text-black" />
                                    <p className="text-xs" >{commentscount} Comments</p>
                                </div>
                            </div>
                            <p className="font-normal text-left text-black text-base pt-2 opacity-75">
                                <span className="font-semibold text-black text-base" >{post.user.username}</span> {post.description}
                            </p>
                        </div>

                        <div className="relative w-1/3 flex justify-center border rounded-md " >
                            <div className="h-[30rem] px-2 w-full overflow-y-scroll" >
                                <Typography className="font-normal">
                                    <section className="bg-white dark:bg-gray-900">
                                        <div className="max-w-2xl mx-auto">
                                            <div className="flex justify-between items-center mb-6 p-3">
                                                <h4 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Total Comments ({commentscount})</h4>
                                                <ArrowPathIcon
                                                    className={`w-5 cursor-pointer hover:text-indigo-800 transition-all duration-200 ${commentloadspinning ? 'animate-spin' : ''}`}
                                                    onClick={() => {
                                                        refreshComments()
                                                        setCommentsLoadSpinning(true);
                                                        setTimeout(() => {
                                                            setCommentsLoadSpinning(false);
                                                        }, 500)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {
                                            comments?.map((comment, idx) => {
                                                return (
                                                    <div key={idx} className="relative p-2 ms-4 text-base bg-white rounded-lg dark:bg-gray-900">
                                                        <footer className="flex items-center mb-2">
                                                            <div className="flex items-center justify-between">
                                                                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                                    <img
                                                                        className="mr-2 w-6 h-6 rounded-full"
                                                                        src={comment.user_detail.profile_image ? apiUrl + comment.user_detail.profile_image : defaultUserImageLink}
                                                                        alt={comment.user_detail.username}
                                                                    />
                                                                    {comment.user_detail.username}                                                                 </div>
                                                                <time className="text-sm text-gray-600 dark:text-gray-400">
                                                                    {formatDate(comment.created_at)}
                                                                </time>
                                                            </div>
                                                        </footer>
                                                        <p className="text-gray-500 dark:text-gray-400 ms-7">
                                                            {comment.comment}
                                                        </p>
                                                    </div>
                                                )
                                            })
                                        }

                                    </section>
                                </Typography>
                            </div>
                            <div className="absolute bottom-0 w-72" >
                                <form className="mb-6 w-full mx-auto">
                                    <div className="py-2 w-full px-4 mb-4 bg-white rounded-lg rounded-t-lg border dark:bg-gray-800 dark:border-gray-700">
                                        <label htmlFor="comment" className="sr-only">Your comment</label>
                                        <textarea
                                            ref={commentRef}
                                            onChange={(e) => {
                                                if (e.target.value.trim() !== '') {
                                                    setCommentButton(true);
                                                } else {
                                                    setCommentButton(false);
                                                }
                                                if (e.target.scrollHeight < 101) {
                                                    e.target.style.height = "auto";
                                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                                }
                                            }}
                                            draggable={false}
                                            rows="1"
                                            className="px-0 resize-none min-w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                            placeholder="Write a comment..."
                                        ></textarea>
                                    </div>
                                    {
                                        commentbutton ?
                                            <Button onClick={postComment} color="indigo" className="float-right mb-2 text-xs" size="sm" >
                                                Post
                                            </Button>
                                            :
                                            <Button disabled color="indigo" className="float-right mb-2 text-xs" size="sm" >
                                                Post
                                            </Button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}