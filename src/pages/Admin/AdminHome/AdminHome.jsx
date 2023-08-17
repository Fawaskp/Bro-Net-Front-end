import React, { useEffect } from 'react'
import AdminMessages from './AdminMessages'
export default function AdminHome() {

  useEffect(() => {
    document.title = "Admin Home"
  }, [])

  return (
    <>
      <div className='flex w-5/6' >
        <AdminMessages />
        <div>
        </div>
      </div>
    </>
  )
}

