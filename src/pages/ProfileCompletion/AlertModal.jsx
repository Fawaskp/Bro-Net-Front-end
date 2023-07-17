import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export default function ConfirmModal({status,handleOpen,message,confirm}) {
 
  return (
    <Fragment>
      <Dialog open={status} handler={handleOpen} className="rounded-10">
        <DialogHeader className="text-base" >Confirm</DialogHeader>
        <DialogBody divider>
          {message}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="rounded-10 mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button className="rounded-10" variant="gradient" color="green" onClick={()=>{confirm(null),handleOpen()}}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}