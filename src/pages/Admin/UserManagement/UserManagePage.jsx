import React, { useEffect } from 'react'
import { UserManageTable } from './UserManageTable'

function UserManageLayout() {

  useEffect(() => {
    document.title = "Users List"
}, [])

  return (
    <>
      <UserManageTable />
    </>
  )
}

export default UserManageLayout
