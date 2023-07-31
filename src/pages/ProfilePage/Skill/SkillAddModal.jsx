import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Typography,
} from "@material-tailwind/react";
import { getSkills } from "../api";
import { DefaultButton } from '../../../components/buttons'
import { userAxiosInstance } from "../../../utils/axios-utils";
import jwtDecode from "jwt-decode";
import { getLocal } from "../../../helpers/auth";
import { toast } from "react-toastify";

export default function SkillAddModal({ status, handleOpen,setUserSkills }) {

    const [skills, setSkills] = useState([])
    const [selectedskill, setSelectedSkill] = useState(null)

    const handleAddSkill = () =>{
        const data = {skill_id:selectedskill}
        const user = getLocal('AuthToken')
        const user_decoded = jwtDecode(user)
            
        userAxiosInstance.put(`add-skill/${user_decoded.user_id}/`,data).then((res)=>{
            if(res.data.status == 200){
                toast.success('Skill Added successfully')
                setUserSkills(user_decoded.user_id)
                handleOpen()
            }
            else{
                toast.error(res.data.Message)
            }
        })
    }

    useEffect(() => {
        getSkills().then((res) => {
            setSkills(res)
        })
    }, [])

    return (
        <>
            <Dialog open={status} handler={handleOpen} className="px-4 pt-12" >
                <div className="flex justify-center">
                    <input
                        style={{ borderRadius: 5 }}
                        type="text"
                        className="block w-5/6 px-4 mx-2 py-2 bg-indigo-50 bg-opacity-70 text-indigo-700 focus:outline-indigo-100"
                        placeholder="Search..."
                    />
                </div>
                <DialogBody className="max-h-96 overflow-y-scroll my-6" >
                    <List>
                        {
                            skills.map((skill) => {
                                return (
                                    <ListItem onClick={(e) => setSelectedSkill(skill.id)} key={skill.id} >
                                        <ListItemPrefix>
                                            <Avatar variant="rounded" size="sm" alt="candice" src={skill.icon} />
                                        </ListItemPrefix>
                                        <div>
                                            <Typography variant="h6" color="blue-gray">
                                                {skill.name}
                                            </Typography>
                                        </div>
                                    </ListItem>
                                )
                            })
                        }
                        {skills.length < 1 && <h1>No Skills found</h1>}
                    </List>
                </DialogBody>
                <DialogFooter>
                    { selectedskill && <Button color="indigo" onClick={()=> handleAddSkill() } > Add </Button> }
                    { !selectedskill && <Button color="indigo" className="outline-none focus:bor"  disabled > Next </Button> }
                </DialogFooter>
            </Dialog>
        </>
    );
}