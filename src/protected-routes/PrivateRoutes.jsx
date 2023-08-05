import React, { useEffect, useState } from 'react'
import { isUserAuth, isSuAuth } from '../services/user-services'
import { Navigate, Outlet} from 'react-router-dom'

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
