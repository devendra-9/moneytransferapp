import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './css/user.css'
import { Button } from './button'
import { useNavigate } from 'react-router-dom'

const users = () => {
  const [users,setusers] = useState([])
  const [ filter, setfilter] = useState('')
  

  useEffect(()=>
  {
    axios.get('http://localhost:4000/api/v1/user/alluser?filter='+filter)
    .then((response)=>{
      setusers(response.data.user)
    })
  },[filter])

  return (
    <div className='user'>
      <div className="userhead">
        <div className="inputuser">
          <h1>User</h1>
          <input type="text" placeholder='Search User ....' onChange={(e)=>{setfilter(e.target.value)}} />
        </div>
      </div>
      <div className="userbottom">
        {users.map(users=><Users users={users} />)}
      </div>
    </div>
  )
}

function Users({users})
{
  const navigate = useNavigate()
  return( 
  <div className="auser">
    <div className="auserhead">
      <div className="adisplayuser">
        <div className="letter">

        <div className="firstletter">
          <h1>{users.firstname[0]}</h1>
          </div>
          <div className="fullname">
          <h1>{users.firstname} {users.lastname}</h1>
          </div>
        </div>
        <div className="auserbutton">
          <p onClick={(e)=>{
            navigate('/payment?id='+ users._id + "&name=" + users.firstname)
          }}>Send Money</p>
        </div>
      </div>
    </div>
  </div>
  )
}
export default users