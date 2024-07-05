import React, { useState } from 'react'
import axios from 'axios'
import {Inputbutton} from '../components/inputbutton'
import {Buttonwarning} from '../components/bottomwarning'
import {Heading} from '../components/heading'
import {Password} from '../components/password'
import {Button} from '../components/button'
import './css/form.css'
import { useNavigate } from 'react-router-dom'

const signin = () => {
  const[email,setemail] = useState('')
  const[password,setpassword] = useState('')
  const [error,seterror] = useState('')
  const navigate = useNavigate()
  return (
    <div className="signinmain">
      <div className="signinhead">
      <p>{error}</p>
        <div className="formbody">
          <Heading label='signin' />
          <Inputbutton onChange={e=>{setemail(e.target.value)}} heading='Email' label='example@gmail.com' />
          <Password onChange={e=>setpassword(e.target.value)} heading="Password" label='Enter password' />
          <Button label='Sign In' onClick={async()=>
            {
              try{
              const result = await axios.post("http://localhost:4000/api/v1/user/signin",{
              email,
              password,  
          });
          const token = result.data.token
            localStorage.setItem('token',result.data.token)
              navigate('/dashboard')
            }
            catch(err)
            {
              seterror(err.response.data.msg)
            }
            }
          }/>
          <Buttonwarning message="Don't have an account ?" label='Sign Up' to='/signup' />
        </div>
      </div>
    </div>
  )
}

export default signin