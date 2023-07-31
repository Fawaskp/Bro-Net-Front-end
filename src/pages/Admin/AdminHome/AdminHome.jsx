import React, { useEffect } from 'react'
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

