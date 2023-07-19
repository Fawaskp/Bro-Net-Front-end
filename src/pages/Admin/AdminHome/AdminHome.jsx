import React, { useEffect } from 'react'
import Navbar from '../../../components/Navbar'
export default function AdminHome() {

  useEffect(()=>{
    document.title = "Admin Home"
  },[])

  return (
    <>
      <Navbar/>
      <h1 >Its Admin Home Page</h1>
    </>
  )
}
