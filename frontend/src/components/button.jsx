import './css/global.css'
export function Button({label,onClick})
{
  return(
    <div className="sumitbtn">
      <button onClick={onClick}>{label}</button>
    </div>
  )
}