import { Link } from "react-router-dom"

export function Buttonwarning({message,label,to})
{
  return(
    <div className="switch">
        <p>{message}</p>
        <Link to={to} style={{color:'red',textDecoration:'none', fontFamily:'arial', fontSize:'15px'}}>{label}</Link>
    </div>
  )
}