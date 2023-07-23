import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { AdminSideBar } from '../../components/AdminSideBar';
import AdminNavbar from '../../components/AdminNavbar';

export default function AdminLayout() {

    const [open, setOpen] = React.useState(false);
    const handleDrawer = () => setOpen(!open)

    return (
        <>
            <AdminNavbar handleDrawer={handleDrawer} />
            <AdminSideBar status={open} handleDrawer={handleDrawer} />
            <div className='mx-auto max-w-sm sm:max-w-lg md:w-4/6 lg:max-w-6xl mt-12' >
                {<Outlet />}
            </div>
        </>
    )
}

