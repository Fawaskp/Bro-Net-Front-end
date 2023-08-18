import React, { useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogBody,
    Typography,
    CardFooter,
    IconButton,
} from "@material-tailwind/react";
import { apiUrl } from "../../../constants/constants";
import { HandThumbUpIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as FilledUpIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { postAxiosInstance } from "../../../utils/axios-utils";

export function PostDetailModal({ liked, handle_press, commentscount, setCommentsCount, comments, refreshComments, open, handleOpen, post }) {

    const article = post.post
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
                commentRef.current.value = ''
                console.log(commentscount);
            }
        }).catch((err) => console.log(err))
    }

    return (
        <>
            <Dialog size="lg" open={open} handler={handleOpen}>
                <DialogBody divider className="h-[40rem]">
                    <div className="flex" >
                        <div className="w-1/2 " >
                            {
                                article &&
                                <div className="flex border rounded-md min-h-96 max-h-[30rem] ql-snow overflow-hidden">
                                    <div className="ql-editor w-full max-h-[30rem] overflow-y-scroll text-black" dangerouslySetInnerHTML={{ __html: article }} />
                                </div>
                            }
                            <CardFooter className="pt-0 text-center">
                                <div className="flex ">
                                    <div className="flex flex-col justify-center me-2 py-2">
                                        <IconButton variant='text' color="indigo" onClick={() => setLiked(!liked)}  >
                                            {
                                                liked ?
                                                    <FilledUpIcon className="w-5 text-indigo" />
                                                    :
                                                    <HandThumbUpIcon onClick={handle_press} className="w-5 text-black" />
                                            }
                                        </IconButton>
                                        <p className="text-xs" >{post.like_count} Likes</p>
                                    </div>
                                </div>
                                {
                                    post.description ?
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal text-left text-black text-base pt-2 opacity-75"
                                        >
                                            <span className="font-semibold text-black text-base" >{post.user.username}</span>
                                            {post.description}
                                        </Typography>
                                        :
                                        ''
                                }
                            </CardFooter>
                        </div>
                        <div className="w-1/2 h-[25rem] overflow-y-scroll" >
                            <Typography className="font-normal">
                                <section className="bg-white dark:bg-gray-900">
                                    <div className="max-w-2xl mx-auto px-4">
                                        <div className="flex justify-between items-center mb-6">
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
                                            >
                                            </ArrowPathIcon>
                                        </div>
                                    </div>

                                    {
                                        comments?.map((comment) => {
                                            return (
                                                <article className="relative p-2 ms-4 text-base bg-white rounded-lg dark:bg-gray-900">
                                                    <footer className="flex justify-between items-center mb-2">
                                                        <div className="flex items-center">
                                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                                <img
                                                                    className="mr-2 w-6 h-6 rounded-full"
                                                                    src={comment.user_detail.profile_image ? apiUrl + comment.user_detail.profile_image : defaultUserImageLink}
                                                                    alt={comment.user_detail.username}
                                                                />
                                                                {comment.user_detail.username}
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                <time pubdate datetime="2022-02-08" title="February 8th, 2022">
                                                                    {comment.created_at}
                                                                </time>
                                                            </p>
                                                        </div>
                                                    </footer>
                                                    <p className="text-gray-500 dark:text-gray-400 ms-7">
                                                        {comment.comment}
                                                    </p>
                                                </article>
                                            )
                                        })
                                    }

                                </section>
                            </Typography>
                            <div className="absolute bottom-0 w-1/2" >
                                <form className="mb-6 w-5/6 mx-auto">
                                    <div className="py-2 w-full px-4 mb-4 bg-white rounded-lg rounded-t-lg border dark:bg-gray-800 dark:border-gray-700">
                                        <label htmlFor="comment" className="sr-only">Your comment</label>
                                        <textarea

                                            ref={commentRef}
                                            onChange={(e) => {
                                                if (e.target.value.trim() != '') {
                                                    setCommentButton(true)
                                                }
                                                else {
                                                    setCommentButton(false)
                                                }
                                            }}
                                            draggable={false}
                                            rows="4"
                                            className="px-0 min-w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                            placeholder="Write a comment..."
                                        ></textarea>
                                    </div>
                                    {
                                        commentbutton ?
                                            <Button onClick={postComment} color="indigo" className="float-right m-3 text-xs" size="sm" >
                                                Post
                                            </Button>
                                            :
                                            <Button disabled color="indigo" className="float-right m-3 text-xs" size="sm" >
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