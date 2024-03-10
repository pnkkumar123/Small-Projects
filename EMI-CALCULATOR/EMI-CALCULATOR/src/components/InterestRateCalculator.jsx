import React,{useEffect, useState} from 'react'


const InterestRateCalculator = () => {
    const [principle, setPrinciple] = useState("100000")
    const [downPayment, setDownPayment] = useState("")
    const [emi, setEmi] = useState("")
    const [interest, setInterest] = useState("10")
    const [tenure, setTenure] = useState("0")
     const [Fee, setFee] = useState("")


    const calculateEMI = (downpayment)=>{
        if(!principle)return;

        const loanAmt = principle - downpayment;
        const rateOfInterest = interest/100;
        const numOfYears = tenure/12;

        const EMI = 
        (loanAmt * rateOfInterest * (1 + rateOfInterest)** numOfYears)/
        ((1 + rateOfInterest) ** numOfYears - 1);

        return Number(EMI/12).toFixed(0);
    }

    const calculateDP = (emi)=>{
        if(!principle)return;

        const downPaymentPercent = 100 -(emi / calculateEMI(0)) * 100;
        return Number ((downPaymentPercent/100)* principle).toFixed(0);
    }

    useEffect(()=>{
       if((!principle>0)){
        setDownPayment(0);
        setEmi(0);

}
    const emi = calculateEMI(downPayment)
    setEmi(emi)
    },[tenure,principle])
const updateEMI = (e)=>{
    if(!principle)return;

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0))

    const emi = calculateEMI(dp);
    setEmi(emi)
};
const updateDownPayment = (e)=>{
    if(!principle)return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    const dp = calculateDP(emi);
    setDownPayment(dp)
}
const totalDownPayment = ()=>{
    return numberWithCommas (
        (Number(downPayment) + (cost - downPayment) * (Fee/100).toFixed(0)
    )
    )
}
const totalEMI = ()=>{
    return numberWithCommas((emi * tenure).toFixed(0))
}

    
  return (
    <>
    <div className="container flex flex-wrap justify-center items-center  ">
        <div className="calculations max-w-full w-full md:max-w-lg bg-slate-300  p-5  border-2 border-dotted-black">
           <div className="loan gap-y-5 max-w-full  p-5 border-2  ">
           <h3>Home Loan</h3>
            <div className="principle-amount  flex flex-wrap flex-col mb-5">
                <input  type="range" name="" value={principle}  id="" min={0} max={10000000} step={500000} onChange={(e)=>setPrinciple(e.target.value)} />
                <input type="number" name="" value={principle} id="" placeholder='2500000' onChange={(e)=>setPrinciple(e.target.value)}/>
            </div>
            <div className="interest-rate flex flex-wrap flex-col mb-5 gap-2">
                <h3>Interest Rate</h3>
            <input type="range" name="" id="" value={interest} onChange={(e)=>setInterest(e.target.value)} min={0} max={20} />
                <input type="number" name="" id="" value={interest} onChange={(e)=>setInterest(e.target.value)} placeholder='2'/>
            </div>
            <div className="loan-tenure mb-5 gap-2 flex flex-wrap flex-col">
                <h3>Tenure</h3>
                <input type="range" max={10} min={1} name="" id="" value={tenure} onChange={(e)=>setTenure(e.target.value)} />
                <input type="number" min={1} max={10} name="" id="" value={tenure} onChange={(e)=>setTenure(e.target.value)} />
            </div>
            <div className="loan-tenure mb-5 gap-2 flex flex-wrap flex-col">
                <h3>Down Payment</h3>
                <input type="range" max={10000000} step={10000} min={10000} name="" id="" value={downPayment} onChange={(e)=>setDownPayment(e.target.value)} />
                <input type="number" min={10000} max={10000000} placeholder='10000' step={10000} name="" id="" value={downPayment} onChange={(e)=>setDownPayment(e.target.value)} />
            </div>
           
            <div className="breakup-loan flex flex-col flex-wrap ">
                <label>Loan Emi</label>
                <span>{emi}</span>
                <label >Total Interest Payble</label>
                <span>2000</span>
                <label >Total Payble</label>
                <span>100000</span>
            </div>
           </div>
        </div>
    </div>
        
    </>
  )
}

export default InterestRateCalculator