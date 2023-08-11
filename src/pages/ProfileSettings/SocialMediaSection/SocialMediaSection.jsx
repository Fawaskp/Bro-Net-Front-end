import React, { useEffect, useRef, useState } from 'react'
import { getLocal } from '../../../helpers/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { userAxiosInstance } from '../../../utils/axios-utils'
import { Button, IconButton } from '@material-tailwind/react'
import { AddSocialAccount } from './AddModal'
import { DeleteSocialAccount } from './DeleteModal'
import { EditSocialAccount } from './EditModal'
import {
    PlusIcon,
    TrashIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";
export default function SocialMediaSection() {

    const [loggeduser,setLoggedUser] = useState()

    const [addModal, setAddModal] = useState(false);
    const handleAddModal = () => setAddModal(!addModal);

    const [deleteModal, setDeleteModal] = useState(false);
    const handleDeleteModal = () => setDeleteModal(!deleteModal);

    const [editModal, setEditModal] = useState(false);
    const handleEditModal = () => setEditModal(!editModal);

    const [deletingInstance, setDeletingInstance] = useState()
    const [editingInstance, setEditingInstance] = useState('')

    const [accounts, setAccounts] = useState([])

    const navigate = useNavigate()

    const callSetAccounts = () => {
        const user = getLocal('AuthToken')
        const user_decoded = jwtDecode(user)
        setLoggedUser(user_decoded.custom)
        if (user_decoded.custom.is_profile_completed) {
            userAxiosInstance.get('user-social-media?user_id=' + user_decoded.custom.user_id).then((response) => {
                setAccounts(response.data)
            })
        }
        else navigate('/auth/login')
    }

    useEffect(() => {
        callSetAccounts()
    }, [])

    return (
        <>
            <AddSocialAccount open={addModal} user_id={loggeduser?.user_id} handleOpen={handleAddModal} refresh={callSetAccounts} />
            <DeleteSocialAccount open={deleteModal} handleOpen={handleDeleteModal} refresh={callSetAccounts} instance={deletingInstance} />
            <EditSocialAccount open={editModal} user_id={loggeduser?.user_id} handleOpen={handleEditModal} refresh={callSetAccounts} Editinstance={editingInstance} />

            <main className="w-full -mt-14">
                <div className="container flex justify-center mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-4/6 mb-6 rounded-10 -mt- shadow-xl border">
                        <div className='p-4 font-bold flex justify-between' >
                            <h1>Social Accounts</h1>
                            <Button variant='sm' onClick={handleAddModal} color="indigo" className="m-3 float-right" >Add</Button>
                        </div>
                        <div className="px-6">
                            {
                                accounts.map((account) => {
                                    return (
                                        <div className="my-6 py-3 border-b border-blueGray-200 text-gray-700 text-center flex justify-between">
                                            <h4>{account.social_media.name}</h4>
                                            <div className='flex' >
                                                <p className='mx-10' >{account.url}</p>
                                                <div>
                                                    <IconButton variant='text' color='gray' >
                                                        <PencilIcon color="orange" onClick={() => { setEditingInstance(account),handleEditModal() }} className="h-5 w-5" />
                                                    </IconButton>
                                                    <IconButton variant='text' color='gray' >
                                                        <TrashIcon color="red" onClick={() => { setDeletingInstance(account),handleDeleteModal() }} className="h-5 w-5" />
                                                    </IconButton>
                                                </div>
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


