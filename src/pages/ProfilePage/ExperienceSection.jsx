import React from 'react'
import { DefaultButton } from '../../components/buttons'

function ExperienceSection() {
    return (
        <main className="profile-page max-w-xl border-2 border-gray-200 rounded-10 ">
            <div className="pb-10 text-center">
                <div className="justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-left sm:text-lg md:text-sm lg:text-base text-blueGray-700">
                            my Experience
                        </p>
                        <a href="#" className="font-normal text-pink-500">Show more</a>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ExperienceSection
