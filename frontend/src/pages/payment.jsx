import React, { useState } from 'react'
import './css/payment.css'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from'axios'

const payment = () => {

  const [amount, setamount] = useState('')

  const [searchparams] = useSearchParams();
  const id = searchparams.get("id")
  const name = searchparams.get("name")
  const token = localStorage.getItem('token')
  const handleclick = async ()=>
    {
      await axios.post("http://localhost:4000/api/v1/accounts/transfer",
        {
          to:id,
          amount,
        },
        {
        headers:
          {
            authorization:` Bearer ${token}`
          }
    })
      .then(response=>
        {
          alert('Successfully transferred')
        }
      )
    }

  return (

    <div className="payment">
      <div className="paymenthead">
        <div className="paymentmain">
          <div className="paymentform">
            <div className="tophead">
              <h1>Send Money</h1>
            </div>
            <div className="heading">
              <h1>{name[0]}</h1>
              <h2>{name}</h2>
            </div>
            <div className="amount">
              <h1>Amount to send </h1>
            </div>
            <div className="amountinput">
              <input type='number' placeholder='Enter Amount to send' min={0} onChange={(e)=>{setamount(e.target.value)}}/>
            </div>
            <div className="sendbutton">
              <button onClick={()=>handleclick()}>Send Rs {amount}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default payment