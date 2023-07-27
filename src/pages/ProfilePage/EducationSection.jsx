import React, { useEffect, useState } from 'react'
import { userAxiosInstance } from '../../utils/axios-utils'
import jwtDecode from 'jwt-decode'
import { getLocal } from '../../helpers/auth'

function EducationSection() {

    const [educations,setEducations] = useState([])

    useEffect(() => {
        const user = getLocal('AuthToken')
            const user_decoded = jwtDecode(user).custom
            const user_id = user_decoded.user_id
            userAxiosInstance.get('user-education?user_id='+user_id).then((response)=>{
                console.log('User Education ::',response.data[0]);
                setEducations(response.data[0])
            })
    }, [])

    return (
        <main className="max-w-xl border-2 border-gray-200 rounded-10 ">
                <div className="flex flex-wrap justify-center pb-10">
                    <div className="w-full lg:w-9/">
                        <p className="mb-4 text-left sm:text-lg md:text-sm lg:text-base text-blueGray-700">
                            {educations?.category?.name}
                            {educations?.institution}, {educations?.location}
                        </p>
                    </div>
                </div>
        </main>
    )
}

export default EducationSection
