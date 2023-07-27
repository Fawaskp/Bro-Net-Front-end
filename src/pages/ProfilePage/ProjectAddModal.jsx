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


export default function ProjectAddModal({ status, handleOpen }) {

    return (
        <>
            <Dialog open={status} handler={handleOpen} className="px-2 pt-6" >
                <div className="flex justify-start text-xl font-bold text-gray-800">
                    <h1>Add Project</h1>
                </div>
                <DialogBody>
                    Project adding section
                </DialogBody>
            </Dialog>
        </>
    );
}