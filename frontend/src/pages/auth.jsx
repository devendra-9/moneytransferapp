import React from 'react'
import { Outlet, useNavigate,Navigate } from 'react-router-dom'

const auth = () => {
  const token = localStorage.getItem('token')
  return token ? <Outlet /> : <Navigate to='/' />
}

export default auth