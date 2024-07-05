import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Inputbutton} from '../components/inputbutton'
import {Buttonwarning} from '../components/bottomwarning'
import {Heading} from '../components/heading'
import {Password} from '../components/password'
import {Button} from '../components/button'
import './css/form.css'
import { useNavigate } from 'react-router-dom'

const signup = () => {
  const[email,setemail] = useState('')
  const[password,setpassword] = useState('')
  const[firstname,setfirstname] = useState('')
  const[lastname,setlastname] = useState('')
  const [error,seterror] = useState('')
  const navigate = useNavigate()
  return (
    <div className="signinmain">
      <div className="signinhead">
        <p>{error}</p>
        <div className="formbody2">
          <Heading label='signup' />
          <Inputbutton onChange={e=>{setemail(e.target.value)}} heading='Email' label='example@gmail.com' />
          <Inputbutton onChange={e=>{setfirstname(e.target.value)}} heading='First Name' label="Example: 'John'" />
          <Inputbutton onChange={e=>{setlastname(e.target.value)}} heading='Last Name' label="Example : 'Koothrapali'" />
          <Password onChange={e=>setpassword(e.target.value)} heading="Password" label='Enter password' />
          <Button label='Sign Up' onClick={async()=>
            {
              try
              {
              const response = await axios.post("http://localhost:4000/api/v1/user/signup",{
                email,
                firstname,
                lastname,
                password
              })
              localStorage.setItem('token',result.data.token)
              navigate('/dashboard')
            }
            catch(err)
            {
              seterror(err.response.data.msg)
            }
          }
          }/>
          <Buttonwarning message="Already have an account ?" label='Sign In' to='/' />
        </div>
      </div>
    </div>
  )
}

export default signup