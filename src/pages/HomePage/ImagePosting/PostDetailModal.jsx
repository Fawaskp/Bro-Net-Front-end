import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Carousel,
} from "@material-tailwind/react";
import { apiUrl } from "../../../constants/constants";

export function PostDetailModal({ open, handleOpen, post }) {

    const images = post.post

    return (
        <>
            <Dialog size="lg" open={open} handler={handleOpen}>
                <DialogHeader>Long modal</DialogHeader>
                <DialogBody divider className="h-[40rem]">
                    <div className="flex" >
                        <div className="w-1/2 " >
                            {
                                images?.length > 1 ?
                                    <Carousel>
                                        {
                                            images.map((imageurl, idx) => {
                                                return (
                                                    <div key={idx} className="flex justify-center align-middle" >
                                                        <img
                                                            onDoubleClick={(e) => { setLiked(!liked) }}
                                                            src={apiUrl + imageurl}
                                                            alt='Post Image'
                                                            className="mx-auto"
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Carousel>
                                    :
                                    <div className="flex justify-center align-middle" >
                                        <img
                                            onDoubleClick={(e) => { setLiked(!liked) }}
                                            src={apiUrl + images}
                                            alt='Post Image'
                                            className="mx-auto h-max"
                                        />
                                    </div>
                            }
                        </div>
                        <div className="w-1/2 h-[35rem] overflow-y-scroll" >
                            <Typography className="font-normal">
                                <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
                                    <div className="max-w-2xl mx-auto px-4">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Total Comments (20)</h4>
                                        </div>
                                    </div>
                                    <article className="relative p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                        <footer className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                    <img
                                                        className="mr-2 w-6 h-6 rounded-full"
                                                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                        alt="Michael Gough"
                                                    />
                                                    Michael Gough
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <time pubdate datetime="2022-02-08" title="February 8th, 2022">
                                                        Feb. 8, 2022
                                                    </time>
                                                </p>
                                            </div>
                                        </footer>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                                            instruments for the UX designers. The knowledge of the design tools are as important as the
                                            creation of the design strategy.
                                        </p>
                                    </article>
                                </section>
                            </Typography>
                            <Typography className="font-normal">
                                <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
                                    <div className="max-w-2xl mx-auto px-4">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Total Comments (20)</h4>
                                        </div>
                                    </div>
                                    <article className="relative p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                        <footer className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                    <img
                                                        className="mr-2 w-6 h-6 rounded-full"
                                                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                        alt="Michael Gough"
                                                    />
                                                    Michael Gough
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <time pubdate datetime="2022-02-08" title="February 8th, 2022">
                                                        Feb. 8, 2022
                                                    </time>
                                                </p>
                                            </div>
                                        </footer>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                                            instruments for the UX designers. The knowledge of the design tools are as important as the
                                            creation of the design strategy.
                                        </p>
                                    </article>
                                </section>
                            </Typography>
                            <Typography className="font-normal">
                                <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
                                    <div className="max-w-2xl mx-auto px-4">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Total Comments (20)</h4>
                                        </div>
                                    </div>
                                    <article className="relative p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                        <footer className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                    <img
                                                        className="mr-2 w-6 h-6 rounded-full"
                                                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                        alt="Michael Gough"
                                                    />
                                                    Michael Gough
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <time pubdate datetime="2022-02-08" title="February 8th, 2022">
                                                        Feb. 8, 2022
                                                    </time>
                                                </p>
                                            </div>
                                        </footer>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                                            instruments for the UX designers. The knowledge of the design tools are as important as the
                                            creation of the design strategy.
                                        </p>
                                    </article>
                                </section>
                            </Typography>
                            <div className="absolute bottom-0 w-1/2" >
                                <form className="mb-6">
                                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                        <label htmlFor="comment" className="sr-only">Your comment</label>
                                        <textarea
                                            id="comment"
                                            rows="6"
                                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                            placeholder="Write a comment..."
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                    >
                                        Post comment
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}