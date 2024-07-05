import React, { useState } from 'react'
import axios from 'axios'
import './css/balance.css'

const balance = () => {

  const [amount,setamount] = useState()

  const token = localStorage.getItem('token')

  async function getbalance()
  {
    const balance = await axios.get("http://localhost:4000/api/v1/accounts/balance",
      {
      headers:
      {
        authorization:` Bearer ${token} `
      }
    }
    )
    setamount(balance.data.balance)
  }
  getbalance();

  return (
    <div className='balance'>
      <div className="balancemain">
        <h1>Balance : Rs {Math.round(amount * 100) / 100}</h1>
      </div>
    </div>
  )
}

export default balance