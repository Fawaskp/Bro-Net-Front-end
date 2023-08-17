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
  Spinner,
} from "@material-tailwind/react";
import { validateEmail } from "../../helpers/email_validator";
import { userAxiosInstance } from "../../utils/axios-utils";
import { toast } from "react-toastify";


export default function EmailChangeModal({ emailRefresher,username, status, close }) {

  const [loading, setLoading] = useState(false)
  const [optfield, setOtpField] = useState(false)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [inputColor, setinputColor] = useState('indigo')
  const [errormessage, setErrorMessage] = useState('')

  const confirmOtp = () => {
    if(otp.trim()==''){
      setinputColor('red')
      setErrorMessage('Enter valid otp')
    }
    else{
      userAxiosInstance.post('verify-change-email-otp',{username,otp}).then((response)=>{
        if(response.status == 200){
          toast.success('E-mail Changed successfully')
          emailRefresher(email)
          close()
        }
      })
    }
  }

  const resetEmail = () => {
    setOtp('')
    setOtpField(false)
    setEmail('')
  }

  const handleSubmit = async () => {
    if (!email) {
      setinputColor('red')
      setErrorMessage('Email field cannot be null')
    }
    else if (validateEmail(email)) {
      setinputColor('indigo')
      setLoading(true)
      userAxiosInstance.post('otp-for-change-email', { email, username }).then((response) => {
        setLoading(false)
        if (response.status == 200) {
          setOtpField(true)
        }
      }).catch((err) => {
        setLoading(false)
      })
    }
    else {
      setinputColor('red')
      setErrorMessage('Enter valid E-mail')
    }
  }

  return (
    <React.Fragment>
      <Dialog
        size="xs"
        open={status}
        handler={() => { close(); setEmail(''), setinputColor('indigo'), setErrorMessage('') }}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            color="white"
            className="mt-4 ms-0 text-gray-700 px-3 pb-2 w-full place-items-center shadow-none border-b-2 "
          >
            Change Email
          </CardHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
            <CardBody className="flex flex-col gap-4">
              {
                optfield ?
                  <>
                    <p>Enter OTP sent to {email}</p>
                    <a onClick={resetEmail} className="cursor-pointer -mt-3 text-indigo-400 " >Change E-mail?</a>
                    <Input maxLength={4} defaultValue={otp} label="Otp" size="lg" color={inputColor} onChange={(e) => setOtp(e.target.value)} />
                  </>
                  :
                  <Input label="New Email" size="lg" color={inputColor} onChange={(e) => setEmail(e.target.value)} />
              }
              {
                inputColor != 'indigo' &&
                <Typography className="text-xs -pt-2 text-red-500" >
                  {errormessage}
                </Typography>
              }
            </CardBody>
            <CardFooter className="pt-0">
              {
                optfield ?
                  <Button onClick={confirmOtp} variant="gradient" color="indigo" fullWidth>
                    {
                      loading ?
                        <Spinner className="mx-auto" color="indigo" />
                        :
                        "Confirm"
                    }
                  </Button>
                  :
                  <Button type="submit" variant="gradient" color="indigo" fullWidth>
                    {
                      loading ?
                        <Spinner className="mx-auto" color="indigo" />
                        :
                        "Log in"
                    }
                  </Button>
              }
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </React.Fragment>
  );
}