import React, { useState } from "react";

function OtpLogin() {
     const [phoneNumber,setPhoneNumber] = useState("");
    const [showOtpInput,setShowOtpInput] = useState(false);  


    const handleSubmit = (e)=>{
       e.preventDefault();
        // phone validation
        const regex = /[^0-9]/g;
        if(phoneNumber.length<10 || regex.test(phoneNumber)){
            alert("Invalid Phone Number");
            return;
        }
        // show otp input
         setShowOtpInput(true)
 
    }
    const handleChange = (e)=>{
      setPhoneNumber(e.target.value);
    }
  return (
    <>
    {
        !showOtpInput ? (
<form onSubmit={handleSubmit}>
        <input placeholder="Enter Phone Number" onChange={handleChange} type="number" name="" id="" />
        <button type="submit">Submit</button>
      </form>
        ): (
            <div>
                <p>Enter OTP sent to {phoneNumber}</p>
                
            </div>
        )
    }
      
    </>
  );
}

export default OtpLogin;
