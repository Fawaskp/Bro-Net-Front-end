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
            <div>{<Outlet/>}</div>
        </>
    )
}

