import React from 'react'
import { DefaultButton } from '../../components/buttons'

function Profile() {
    return (
        <>
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />

            <div className='absolute w-full bg-gray-900 h-32 md:h-50 lg: sm:h-96' >

            </div>
            <main className="profile-page mt-64">
                <section className="relative">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img alt="..." src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" 
                                            className="rounded-full h-auto align-middle ring-8 ring-gray-900 absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" 
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-5 lg:w-4/12 md:px-4 lg:order-3 float-right lg:self-center">
                                        <img className='w-24 float-right' src="https://ih1.redbubble.net/image.354280811.3987/st,small,507x507-pad,600x600,f8f8f8.u4.jpg" alt="Django" />
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center sm:mt-2 md:pt-24 lg:pt-4">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                                            </div>
                                            <div className="lg:mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h3 className="sm:text-xl md:text-2xl lg:text-4xl  font-semibold leading-normal text-blueGray-700 mb-2">
                                        Jenna Stones
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-semibold uppercase">
                                        Any Caption which user prefers
                                    </div>
                                    <div className='flex justify-center' >
                                        <DefaultButton name='Follow' ></DefaultButton>
                                    </div>
                                    <div className="mb-2 text-blueGray-600 mt-10">
                                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager - Creative Tim Officer
                                    </div>
                                    <div className="mb-2 text-blueGray-600">
                                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
                                    </div>
                                </div>

                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-left sm:text-lg md:text-sm lg:text-base text-blueGray-700">
                                                An artist of considerable range, Jenna the name taken by
                                                Melbourne-raised, Brooklyn-based Nick Murphy writes,
                                                performs and records all of his own music, giving it a
                                                warm, intimate feel with a solid groove structure. An
                                                artist of considerable range.
                                            </p>
                                            <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Profile

