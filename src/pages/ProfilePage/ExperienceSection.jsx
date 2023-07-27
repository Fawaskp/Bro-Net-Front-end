import React, { useEffect, useState } from 'react'
import { DefaultButton } from '../../components/buttons'
import { getLocal } from '../../helpers/auth'
import jwtDecode from 'jwt-decode'
import { userAxiosInstance } from '../../utils/axios-utils'

function ExperienceSection() {

     const [experiences,setExperiences] = useState([])

    useEffect(() => {
        const user = getLocal('AuthToken')
            const user_decoded = jwtDecode(user).custom
            const user_id = user_decoded.user_id
            userAxiosInstance.get('user-work-experience?user_id='+user_id).then((response)=>{
                console.log('User Education ::',response.data[0]);
                setExperiences(response.data[0])
            })
    }, [])

    return (
        <main className="max-w-xl border-2 border-gray-200 rounded-10 ">
            <div className="flex flex-wrap justify-center pb-10">
                <div className="w-full lg:w-9/12">
                    <p className="mb-4 text-left sm:text-lg md:text-sm lg:text-base text-blueGray-700">
                        {experiences?.position} at {experiences?.company}
                    </p>
                </div>
            </div>
    </main>
    )
}

export default ExperienceSection
