import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Alert
} from "@material-tailwind/react";
import { SignalIcon } from "@heroicons/react/24/outline";
import { postAxiosInstance } from '../../utils/axios-utils';

function Banner() {
    const [open, setOpen] = useState(true);
    const [start, setStart] = useState(false)
    const [heading, setHeading] = useState('')
    const [content, setContent] = useState('')
    useEffect(() => {
        postAxiosInstance.get('get-active-banner/').then((response) => {
            if (response.status == 200) {
                setContent(response.data.content)
                setHeading(response.data.heading)
                setStart(true)

            }
        }).catch((err) => console.log('Banner ', err))
    }, [])
    if (start) {
        return (
            <div className='flex justify-center w-full'>
                <Card className="mt-6 md:w-[80rem] mb-3 mx-5 py-10 px-5 rounded-10 text-white bg-gray-900">
                    <CardBody>
                        <Typography variant="h5" color="white" className="mb-2">
                            {heading}
                        </Typography>
                        <Typography>
                            {content}
                        </Typography>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Banner
