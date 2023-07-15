import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
function Banner() {
    return (
        <div className='flex justify-center max-w-full'>
            <Card className="mt-6 md:max-w-full mx-5 py-10 px-5 rounded-10 text-white bg-gray-900">
                <CardBody>
                    <Typography variant="h5" color="white" className="mb-2">
                        Banner to show events
                    </Typography>
                    <Typography>
                        The place is close to Barceloneta Beach and bus stop just 2 min by walk
                        and near to &quot;Naviglio&quot; where you can enjoy the main night life
                        in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant='gradient' color='white' className='rounded-10' >View Detail</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Banner
