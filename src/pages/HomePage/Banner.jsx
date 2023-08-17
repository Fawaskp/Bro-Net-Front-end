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
            if(response.status == 200){
                setContent(response.data.content)
                setHeading(response.data.heading)
                setStart(true)

            }
        }).catch((err) => console.log('Banner ', err))
    }, [])
    if (start) {
        return (
            <div className='flex justify-center w-5/6 py-3 mx-auto mt-5'>
                <Alert
                    open={open}
                    icon={<SignalIcon />}
                    className='p-8'
                    onClose={() => setOpen(false)}
                >
                    <Typography variant="h5" color="white">
                        {heading}
                    </Typography>
                    <Typography color="white" className="mt-2 font-normal">
                        {content}
                    </Typography>
                </Alert>
            </div>
        );
    }
    // return (
    //     <div className='flex justify-center max-w-full'>
    //         <Card className="mt-6 md:max-w-full mx-5 py-10 px-5 rounded-10 text-white bg-gray-900">
    //             <CardBody>
    //                 <Typography variant="h5" color="white" className="mb-2">
    //                     Banner to show events
    //                 </Typography>
    //                 <Typography>
    //                     The place is close to Barceloneta Beach and bus stop just 2 min by walk
    //                     and near to &quot;Naviglio&quot; where you can enjoy the main night life
    //                     in Barcelona.
    //                 </Typography>
    //             </CardBody>
    //             <CardFooter className="pt-0">
    //                 <Button variant='gradient' color='white' className='rounded-10' >View Detail</Button>
    //             </CardFooter>
    //         </Card>
    //     </div>
    // )
}

export default Banner
