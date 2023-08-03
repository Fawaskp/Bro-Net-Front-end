import React, { useEffect, useState } from 'react'
import { getLocal } from '../../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { userAxiosInstance } from '../../../utils/axios-utils'


function ExperienceSection({userId}) {

    const [experiences, setExperiences] = useState([])

    const callSetExperiences = () => {
        userAxiosInstance.get('user-work-experience?user_id=' + userId).then((response) => {
            setExperiences(response.data)
        })
    }

    useEffect(() => {
        callSetExperiences()
    }, [])

    return (
        <>
            <main className="block max-w-xl border-2 border-gray-200 rounded-10 pt-4 px-5">
                <div className='flex justify-between' >
                    <h1 className='text-lg text-center py-2 font-semibold' >Experiences</h1>
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
        </>
    )
}

export default ExperienceSection
