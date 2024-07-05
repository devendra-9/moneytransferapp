import React from 'react'
import Appbar from '../components/appbar'
import Balance from '../components/balance'
import User from '../components/users'
import './css/dashboard.css'

const dashboard = () => {

  return (
    <div className="dashboard">
      <Appbar />
      <Balance />
      <User />
    </div>
  )
}

export default dashboard