import React, { useEffect, useState } from 'react'
import { getLocal } from '../../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { userAxiosInstance } from '../../../utils/axios-utils'
import { IconButton } from '@material-tailwind/react'
import {PlusIcon} from '@heroicons/react/24/outline'

function ExperienceSection() {

    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        const user = getLocal('AuthToken')
        const user_decoded = jwtDecode(user).custom
        const user_id = user_decoded.user_id
        userAxiosInstance.get('user-work-experience?user_id=' + user_id).then((response) => {
            console.log('User Experience ::', response.data[0]);
            setExperiences(response.data)
        })
    }, [])

    return (
        <main className="block max-w-xl border-2 border-gray-200 rounded-10 pt-4 px-5">
            <div className='flex justify-between' >
                <h1 className='text-lg text-center py-2 font-semibold' >Experiences</h1>
                <span style={{ fontSize: '17px' }} size="sm" color="indigo" className="h-8 rounded-md" >
                    <IconButton className='rounded-10' size='sm' variant="text" color="indigo">
                        <PlusIcon className='w-5' />
                    </IconButton>
                </span>
            </div>
            <div className="flex flex-wrap justify-center">
                {
                    experiences.map((experience) => {
                        return (
                            <div className="w-full">
                                <p className="mb-4 text-center sm:text-lg md:text-sm lg:text-base text-blueGray-700">
                                    {experience.position} at <span className='text-indigo-500 font-semibold' >{experience.company}</span>
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}

export default ExperienceSection
