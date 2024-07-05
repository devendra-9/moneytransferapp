import './css/global.css'
export function Inputbutton({heading,label,onChange})
{
  return(
    <div className="emailfield">
    <h3>{heading} :</h3>
    <input onChange={onChange} type="text" placeholder={label} />
    </div>
  )
}