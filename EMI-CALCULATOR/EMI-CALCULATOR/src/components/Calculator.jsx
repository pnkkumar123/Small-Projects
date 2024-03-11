import React, { useEffect, useState } from 'react'
import TextInput from './TextInput'
import SliderInput from './sliderInput';
import { tenureData } from '../utils/Constants';
import { numberWithCommas } from '../utils/config';

const Calculator = () => {
    const [cost,setCost] = useState(0);
    const [interest,setInterest] = useState(10);
    const [fee,setFee] = useState(1);
    const [downpayment,setdownPayment] = useState(0);
    const [tenure,setTenure] = useState(12);
    const [emi,setEmi] = useState(0);

    const calculateEMI = (downPayment)=>{
        if(!cost)return;
        const loanAmt = cost - downPayment;
        const rateOfInterest = interest/100;
        const numOfYears = tenure /12;

        const EMI = 
        (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears)/
        ((1 + rateOfInterest) ** numOfYears -1);
        return Number(EMI/12).toFixed(0);

    }
    const calculateDP = (emi)=>{
    const downPaymentPercent = 100 - (emi/calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100)*cost).toFixed(0);
    };

    useEffect(()=>{
          if(!cost>0){
            setdownPayment(0);
            setEmi(0);
          }
          const emi  = calculateEMI(downpayment);
          setEmi(emi)
    },[tenure,cost])
    const updateEMI = (e)=>{
        if(!cost) return;

        const dp = Number(e.target.value);
        setdownPayment(dp.toFixed(0))

        const emi = calculateEMI(dp);
        setEmi(emi);
    };
    const updateDownPayment = (e)=>{
        if(!cost) return;
        const emi = Number(e.target.value);
        setEmi(emi.toFixed(0))

        const dp = calculateDP(emi);
        setdownPayment(dp)
    }
    const totalDownPayment = ()=>{
        return numberWithCommas(
            (Number(downpayment) + (cost - downpayment) * (fee/100)).toFixed(0)
        )
    }
    const totalEMI = ()=>{
        return numberWithCommas(emi * tenure).toFixed(0)
    }
 

  return (
    <div className='App'>
        <span className='title'>EMI CALCULATOR</span>
         <TextInput
         title={"Total Cost of Assets"}
         state={cost}
         setState={setCost}
         />
         <TextInput
         title={"Interest Rate (in %)"}
         state={interest}
         setState={setInterest}
         />
         <TextInput
         title={"Processing fee (in%)"}
         state={fee}
         setState={setFee}
         />
         <SliderInput
         title="Down Payment"
         underlineTitle={`Total Down Payment = ${totalDownPayment()}`}
         onChange={updateEMI}
         state={downpayment}
         min={0}
         max={cost}
         labelMin={"0%"}
         labelMax={"100%"}
         />
         <SliderInput
         title="Down Payment"
         underlineTitle={`Total Down Payment - ${totalDownPayment()}`}
         onChange={updateDownPayment}
         state={emi}
         min={calculateEMI(cost)}
         max={calculateEMI(0)}
         />
         <span className='title'>Tenure</span>
         <div className='tenureContainer'>
            {tenureData.map((t)=>{
                return (
                    <button className={`tenure ${t === tenure ? "selected" : ""}`}
                    onClick={()=>setTenure(t)}
                    >
                        {t}
                    </button>
                )
            })}

         </div>
        
    </div>
  )
}

export default Calculator