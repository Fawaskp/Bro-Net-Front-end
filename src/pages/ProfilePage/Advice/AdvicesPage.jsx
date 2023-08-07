import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
} from "@material-tailwind/react";
import {
    PlusIcon,
    HandThumbUpIcon,
    HandThumbDownIcon,
    TrashIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";
import { userAxiosInstance } from "../../../utils/axios-utils";
import { getLocal } from "../../../helpers/auth";
import jwtDecode from "jwt-decode";
import { AddAdviceModal } from "./AddModal";
import { DeleteAdvice } from "./DeleteModal";
import { EditAdvice } from "./EditModal";
export default function AdvicesPage() {

    const [user_id, setUserId] = useState('')
    const [modalpurpose, setModalPurpose] = useState('')

    const [dos, setDos] = useState([])
    const [donts, setDonts] = useState([])

    const [addModal, setAddModal] = useState(false);
    const handleAddModal = () => setAddModal(!addModal);

    const [editModal, setEditModal] = useState(false);
    const handleEditModal = () => setEditModal(!editModal);

    const [deleteModal, setDeleteModal] = useState(false);
    const handleDeleteModal = () => setDeleteModal(!deleteModal);

    const [deletingid, setDeletingId] = useState(null)
    const [editingInstance, setEditingInstance] = useState('')

    const callSetDos = (userId = user_id) => {
        userAxiosInstance.get(`dos/${userId}/`).then((response) => {
            if (response.status == 200) {
                setDos(response.data)
            }
        }).catch((err) => console.log(err))
    }

    const callSetDonts = (userId = user_id) => {
        userAxiosInstance.get(`donts/${userId}/`).then((response) => {
            if (response.status == 200) {
                setDonts(response.data)
            }
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        const user = getLocal('AuthToken')
        const user_decoded = jwtDecode(user).custom
        setUserId(user_decoded.user_id)
        callSetDonts(user_decoded.user_id)
        callSetDos(user_decoded.user_id)
    }, [])


    return (
        <>
            <AddAdviceModal userId={user_id} open={addModal} handleOpen={handleAddModal} purpose={modalpurpose} refresh={[callSetDonts, callSetDos]} />
            <DeleteAdvice id={deletingid} open={deleteModal} handleOpen={handleDeleteModal} purpose={modalpurpose} refresh={[callSetDonts, callSetDos]} />
            <EditAdvice open={editModal} purpose={modalpurpose} handleOpen={handleEditModal} refresh={[callSetDonts, callSetDos]} Editinstance={editingInstance} />

            <div className="absolute p-16 pt-40 top-0 left-0">
                <SpeedDial>
                    <SpeedDialHandler>
                        <IconButton color="indigo" size="lg" className="rounded-full">
                            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                        </IconButton>
                    </SpeedDialHandler>
                    <SpeedDialContent>
                        <SpeedDialAction>
                            <HandThumbUpIcon onClick={() => { setModalPurpose('do'), handleAddModal() }} className="h-5 w-5" />
                        </SpeedDialAction>
                        <SpeedDialAction>
                            <HandThumbDownIcon onClick={() => { setModalPurpose('dont'), handleAddModal() }} className="h-5 w-5" />
                        </SpeedDialAction>
                        <div className="p-5" ></div>
                    </SpeedDialContent>
                </SpeedDial>
            </div>
            <div className="max-w-7xl mx-auto my-10 flex justify-between py-2" >
                <div className="p-5 bord rounded-md w-1/2 mx-2" >
                    <h1 className="text-center font-bold text-2xl mb-2" >Dos</h1>
                    {
                        dos.map((doInstance) => {
                            return (
                                <SpeedDial key={doInstance.id} placement="left" >
                                    <SpeedDialHandler>
                                        <Card className="mb-2 border border-blue-gray-100 shadow-none p-3">
                                            <p className="border-b-0 transition-colors text-indigo-400 font-bold text-xl p-3">
                                                {doInstance.title}
                                            </p>
                                            <CardBody className="text-base font-normal px-3 py-0">
                                                {doInstance.do}
                                            </CardBody>
                                        </Card>
                                    </SpeedDialHandler>
                                    <SpeedDialContent>
                                        <SpeedDialAction>
                                            <TrashIcon color="red" onClick={() => { setDeletingId(doInstance.id), setModalPurpose('do'), handleDeleteModal() }} className="h-5 w-5" />
                                        </SpeedDialAction>
                                        <SpeedDialAction>
                                            <PencilIcon color="orange" onClick={() => { setEditingInstance(doInstance), setModalPurpose('do'), handleEditModal() }} className="h-5 w-5" />
                                        </SpeedDialAction>
                                    </SpeedDialContent>
                                </SpeedDial>
                            )
                        })
                    }
                    {dos.length < 1 ? <h1 className="text-center border rounded-md border-blue-gray-100 p-5 text-xl mb-2" >No dos to show</h1> : ''}
                </div>
                <div className="p-5 bord rounded-md w-1/2 mx-2" >
                    <h1 className="text-center font-bold text-2xl mb-2" >Dont&apos;s</h1>
                    {
                        donts.map((dontInstance) => {
                            return (
                                <SpeedDial key={dontInstance.id} placement="right" >

                                    <SpeedDialHandler>
                                        <Card className="mb-2 border border-blue-gray-100 shadow-none p-3">
                                            <p className="border-b-0 transition-colors text-indigo-400 font-bold text-xl p-3">
                                                {dontInstance.title}
                                            </p>
                                            <CardBody className="text-base font-normal px-3 py-0">
                                                {dontInstance.dont}
                                            </CardBody>
                                        </Card>
                                    </SpeedDialHandler>
                                    <SpeedDialContent>
                                        <SpeedDialAction >
                                            <TrashIcon onClick={() => { setDeletingId(dontInstance.id), setModalPurpose('dont'), handleDeleteModal() }} color="red" className="h-5 w-5" />
                                        </SpeedDialAction>
                                        <SpeedDialAction >
                                            <PencilIcon onClick={() => { setEditingInstance(dontInstance), setModalPurpose('dont'), handleEditModal() }} color="orange" className="h-5 w-5" />
                                        </SpeedDialAction>
                                    </SpeedDialContent>
                                </SpeedDial>
                            )
                        })
                    }
                    {donts.length < 1 ? <h1 className="text-center border rounded-md border-blue-gray-100 p-5 text-xl mb-2" >No don'ts to show</h1> : ''}
                </div>
            </div>
        </>
    );
}