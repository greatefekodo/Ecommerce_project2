import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {


  return (
    <div className='admin-layout'>
      <AdminSidebar/>
      <div className='admin-main'>
        <AdminTopbar/>
        <div className='admin-content'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout