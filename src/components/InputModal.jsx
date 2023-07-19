import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Spinner,
} from "@material-tailwind/react";
import { validateEmail } from "../helpers/email_validator";
import { login_with_email } from "../pages/LoginPage/login-with-email";

 
export default function Example({status,close}) {
  const [loading,setLoading] = useState(false)
  const [email,setEmail] = useState()
  const [inputColor,setinputColor] = useState('indigo')
 
  const  handleSubmit = async () =>{
    if(validateEmail(email)){
      setinputColor('indigo')
      login_with_email(email,close,setLoading)
    }
    else{
      setinputColor('red')
    }
  }

  return (
    <React.Fragment> 
      <Dialog
        size="xs"
        open={status}
        handler={()=>close()}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            color="white"
            className="mt-4 ms-0 text-gray-700 px-3 pb-2 w-full place-items-center shadow-none border-b-2 "
          >
            Login into Bronet
          </CardHeader>
          <form onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" color={inputColor} onChange={(e)=>setEmail(e.target.value)} />
            {
              inputColor != 'indigo'?
              <Typography className="text-xs -pt-2 text-red-500" >
              Enter Valid Email
            </Typography>
            :
            null
            }
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" color="indigo" fullWidth>
              {
                loading?
                <Spinner className="mx-auto" color="indigo" /> :
                "Log in"
              }
            </Button>
          </CardFooter>
          </form>
        </Card>
      </Dialog>
    </React.Fragment>
  );
}