import { useState } from "react"

export function Password ({heading,label,onChange})
{
    const[pass,setpass] = useState('password')

    const handlepass = () =>
    {
        if(pass==='password')
            {
                setpass('text')
            }
        else
            {
                setpass('password')
            }
    }

    return(
        <div className="passwordenter">
            <h3>{heading}</h3>
            <div className="showpass">
                <input onChange={onChange} type={pass} placeholder={label}/>
                <button onClick={()=>handlepass()}>Show</button>
            </div>
        </div>
    )
}