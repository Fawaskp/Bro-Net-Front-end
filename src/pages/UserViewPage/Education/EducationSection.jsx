import React, { useEffect, useState } from 'react'
import { userAxiosInstance } from '../../../utils/axios-utils'
import jwtDecode from 'jwt-decode'
import { getLocal } from '../../../helpers/auth'

function EducationSection({userId}) {

    const [educations, setEducations] = useState([])
    const user_id = userId

    const callSetUserEducations = () => {
        userAxiosInstance.get('user-education?user_id=' + user_id).then((response) => {
            setEducations(response.data)
        })

    }

    useEffect(() => {
        callSetUserEducations()
    }, [])

    return (
        <>
            <main className="block max-w-xl border-2 border-gray-200 rounded-10  pt-4 px-5">
                <div className='flex justify-between'>
                    <h1 className='text-lg text-center py-2 font-semibold' >Education</h1>
                </div>
                <div className="flex flex-wrap justify-center">
                    {
                        educations.map((education) => {
                            return (
                                <div className="w-full">
                                    <p className="mb-4 text-center sm:text-lg md:text-sm lg:text-base text-blueGray-700">
                                        {education.category.name} &nbsp;
                                        {education.institution}, {education.location}
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

export default EducationSection
