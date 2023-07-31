import React, { useEffect, useState } from 'react'
import { userAxiosInstance } from '../../../utils/axios-utils'
import jwtDecode from 'jwt-decode'
import { getLocal } from '../../../helpers/auth'
import EducationAddModal from './EducationAddModal'
import { PlusIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@material-tailwind/react'
function EducationSection() {

    const [educations, setEducations] = useState([])

    const [modalstatus, showModal] = useState(false)
    const handleOpen = () => showModal(!modalstatus)

    const user = getLocal('AuthToken')
    const user_decoded = jwtDecode(user).custom
    const user_id = user_decoded.user_id

    const callSetUserEducations = () => {
        userAxiosInstance.get('user-education?user_id=' + user_id).then((response) => {
            // console.log('User Education ::', response.data);
            setEducations(response.data)
        })

    }

    useEffect(() => {
        callSetUserEducations()
    }, [])

    return (
        <>
            <EducationAddModal open={modalstatus} handleOpen={handleOpen} refresh={callSetUserEducations} />
            <main className="block max-w-xl border-2 border-gray-200 rounded-10  pt-4 px-5">
                <div className='flex justify-between'>
                    <h1 className='text-lg text-center py-2 font-semibold' >Education</h1>
                    <span style={{ fontSize: '17px' }} onClick={handleOpen} size="sm" color="indigo" className="h-8 rounded-md" >
                        <IconButton className='rounded-10' size='sm' variant="text" color="indigo">
                            <PlusIcon className='w-5' />
                        </IconButton>
                    </span>
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
