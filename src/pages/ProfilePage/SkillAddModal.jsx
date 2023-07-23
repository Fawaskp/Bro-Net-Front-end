import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
} from "@material-tailwind/react";
import { userAxiosInstance } from '../../utils/axios-utils';


export default function SkillAddModal({ status, handleOpen }) {

    userAxiosInstance.post('')

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
                <DialogBody>
                    <List>
                        <ListItem>
                            <ListItemPrefix>
                                <Avatar variant="circular" alt="candice" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
                            </ListItemPrefix>
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Tania Andrew
                                </Typography>
                            </div>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <Avatar variant="circular" alt="candice" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
                            </ListItemPrefix>
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Alexander
                                </Typography>
                            </div>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <Avatar variant="circular" alt="candice" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
                            </ListItemPrefix>
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Emma Willever
                                </Typography>
                            </div>
                        </ListItem>
                    </List>
                </DialogBody>
            </Dialog>
        </>
    );
}