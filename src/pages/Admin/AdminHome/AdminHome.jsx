import React, { useEffect } from 'react'
import { AdminSideBar } from '../../../components/AdminSideBar'
import AdminNavbar from '../../../components/AdminNavbar'
export default function AdminHome() {

  useEffect(() => {
    document.title = "Admin Home"
  }, [])

  return (
    <>
      <h1 >Its Admin Home Page</h1>
    </>
  )
}

