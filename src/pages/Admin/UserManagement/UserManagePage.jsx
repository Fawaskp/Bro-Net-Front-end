import React, { useEffect } from 'react'
import { UserManageTable } from './UserManageTable'

function UserManageLayout() {

  useEffect(() => {
    document.title = "Users List"
}, [])

  return (
    <>
        <div className='mx-auto max-w-sm sm:max-w-lg md:w-4/6 lg:max-w-6xl mt-12' >
          <UserManageTable />
        </div>
    </>
  )
}

export default UserManageLayout
