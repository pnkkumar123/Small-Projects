import React, { useEffect, useState } from 'react'
import Progress from './Progress'
// import './styles.css'

function PrgoressBar() {
   const[value,setValue] =  useState(0)
   const [success, setSuccess] = useState(false)

   useEffect(()=>{
           setInterval(()=>{
               setValue((val)=> val + 1)
           },100)
   },[])
  return (
   <div className="app">
   <span>
   Progress Bar
   </span>
   <Progress value={value}
   onComplete={()=>setSuccess(true)}
   />
   <span>{success ? "Complete" : "loading..."}</span>
   </div>
  )
}


export default PrgoressBar