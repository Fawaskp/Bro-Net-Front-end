import React, { useEffect, useRef, useState } from 'react'
import { getLocal } from '../../helpers/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { userAxiosInstance } from '../../utils/axios-utils'


export default function SocialMediaSection() {

    const [accounts, setAccounts] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const user = getLocal('AuthToken')
        const user_decoded = jwtDecode(user)
        if (user_decoded.custom.is_profile_completed) {
            userAxiosInstance.
        }
        else navigate('/auth/login')
    }, [])

    return (
        <>
            <main className="w-full -mt-14">
                <div className="container flex justify-center mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-4/6 mb-6 rounded-10 -mt- border-2 border-gray-200">
                        <div className='p-4 font-bold flex justify-between' >
                            <h1>Social Accounts</h1>
                        </div>
                        <div className="px-6">
                            {
                                accounts.map((account) => {
                                    return (
                                        <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                            <h4>Account</h4>
                                            <div className='flex' >
                                                <p className='mx-10' >link</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}


