import React, { useEffect, useRef, useState } from 'react'

function OtpInput() {
   const [otp,setOtp]   = useState(new Array(length).fill(""));
   const inputRefs = useRef([]);

   useEffect(()=>{
       if(inputRefs.current[0]){
        inputRefs.current[0].focus();
       }
   },[])

   const handleChange = (index,e)=>{
    const value = e.target.value;
    if(isNaN(value))return;

    const newOtp = [...otp];
    // allow only one input
       newOtp[index] = value.substring(value.length - 1);
       setOtp(newOtp);
       
    // move to next input
    if(value && index < length - 1 && inputRefs.current[index + 1]){
        inputRefs.current[index + 1 ].focus();
    }
   };
   const handleClick = (index)=>{
    inputRefs.current[index].set
   }
  return (
    <div>

    </div>
  )
}

export default OtpInput