import React,{useState} from 'react'
import usePasswordGenerator from './hooks/usePasswordGenerator';

function PasswordGenerator() {
  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false)
  const [checkboxData, setCheckboxData] = useState([
    {title:"Include Uppercase Letters",state:false},
    {title:"Include Lowercase Letters",state:false},
    {title:"Include Numbers",state:false},
    {title:"Include Symbols",state:false}
  ])

  const handleCopy = ()=>{
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(()=>{
      setCopied(false);
    },1000)
  }

 const handleCheckBoxChange = (i)=>{
  const updatedCheckboxData = [...checkboxData];
       updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
       setCheckboxData(updatedCheckboxData)
 }
 const {password,errorMessage,generatePassword} = usePasswordGenerator();

  return (
    <div style={{background:"black"}}>
        {/* password text and copy */}
       {password && (<div className="header">
            <div className="title">
               {password}
            </div>
            <button onClick={()=>handleCopy()} className="copyBtn">
               {copied ? "Copied" : "copy"}
            </button>

        </div>
  )}
        {/* character length */}
        <div className="charlength">
          <span>
            <label>Character Length</label>
            <label >{length}</label>
          </span>
          <input type="range" min="4" max="20" onChange={(e)=>setLength(e.target.value)} value={length} />
        </div>
          {/* checkbox */}
        <div className="checkboxes">
          {checkboxData.map((checkbox,index)=>{
            return <div key={index}>
              <input type="checkbox" name="" checked={checkbox.state} onChange={()=>handleCheckBoxChange(index)} />
              <label >{checkbox.title}</label>
            </div>
          })}
        </div>
        {/* strength */}
        {/* genrate button */}
        <button className='generatorBtn' onClick={()=>generatePassword(checkboxData,length)}>Generate Password</button>
    </div>
  )
}

export default PasswordGenerator