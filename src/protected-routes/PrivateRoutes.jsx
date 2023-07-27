import React, { useEffect, useState } from 'react'
import { isUserAuth, isSuAuth } from '../services/user-services'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userAxiosInstance } from '../utils/axios-utils'

export default function PrivateRoutes({ role, route }) {
  const [verify, setVerify] = useState(null);
  useEffect(() => {
    if (role=="user"){
      isUserAuth().then((res)=>{
        setVerify(res.data)
      }).catch((err)=>setVerify(false))
    }
    else if(role="su"){
      isSuAuth().then((res)=>{
        setVerify(res.data)
      }).catch((err)=>setVerify(false))
    }
  }, []);

  if (verify == null) return;
  return verify ? <Outlet /> : <Navigate to={route} />;
}
