import React, { useState, useEffect } from 'react'
import './css/appbar.css'
import axios from 'axios'

const appbar = () => {
  
  const [user,setuser] = useState('')

  const token = localStorage.getItem('token')
  async function calling()
  {
  const result = await axios.get("http://localhost:4000/api/v1/user/oneuser",
    {
      headers:
      {
        authorization:` Bearer ${token} `
      }
    }
  )
  setuser(result.data.userfind.firstname)
}
  calling();
  
  return (
    <div className='appbar'>
      <div className="appbarmain">
        <div className="appbarheader">
          <div className="appbar-left">
            <h3>Paytm Like app</h3>
          </div>
          <div className="appbar-right">
            <h3>Hello, {user}</h3>
            <h2>{user[0]}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default appbar