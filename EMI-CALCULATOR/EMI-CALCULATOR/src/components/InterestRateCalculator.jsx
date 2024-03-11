import React,{useState,useEffect} from 'react'
import {tenureData} from '../utils/Constants'
import {numberWithCommas} from '../utils/config'


const InterestRateCalculator = () => {
    const [cost, setCost] = useState(0);
    const [interest, setInterest] = useState(12);
    const [fee, setFee] = useState(0);
    const [downPayment, setDownPayment] = useState(0);
    const [tenure, setTenure] = useState(12);
    const [emi, setEmi] = useState(0);
  
    const updateEmi = (e)=>{
        if(!cost)return;
        const dp = Number(e.target.value)
        setDownPayment(dp.toFixed(0));
        // calculate emi and update it

        const emi = calculateEmi(dp)
        setEmi(emi)
    }
    const updateDownPayment = (e)=>{
        if(!cost)return;
        const emi = Number(e.target.value);
        setEmi(emi.toFixed(0));
        // calculate dp and update it
        const dp = calculateDownPayment(emi)
        setDownPayment(dp)

    }
    const calculateEmi = (downpayment)=>{
        // emi = 
        if(!cost)return;
        const loanAmt = cost - downpayment;
        const rateOfInterest = interest/100;
        const numOfYears = tenure /12;
        const EMI = (loanAmt * rateOfInterest*(1+rateOfInterest)**numOfYears)/((1 + rateOfInterest)**numOfYears-1)
          return Number(EMI/12).toFixed(0)
        }
    const calculateDownPayment = (emi)=>{
        if(!cost)return;
        const downpaymentPercent = 100 - (emi/calculateEmi(0))*100;
        return Number((downpaymentPercent/100)*cost).toFixed(0) 

    }
    useEffect(() => {
      if(!(cost>0)){
        setDownPayment(0)
        setEmi(0)
      } 
      const emi = calculateEmi(downPayment)
      setEmi(emi)


    }, [tenure,cost,interest])
    
    
      
   

    return(
        <div className="App">
        <span className="title font-semibold">EMI CALCULATOR</span>
        <span className="title font-semibold">Total Cost of Assets</span>
        <input
            type="number"
            name=""
            value={cost}
            placeholder="Total Cost"
            onChange={(e) => setCost(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
        />
        <span>InterestRate</span>
        <input
            type="number"
            name=""
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="Processing Fee (in%)"
            className="border border-gray-300 rounded-md p-2"
        />
        
        <span>Processing Fee</span>
        <input
            type="number"
            name=""
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            placeholder="Processing Fee (in%)"
            className="border border-gray-300 rounded-md p-2"
        />
        
        <span>Down Payment</span>
        <span>{""} -{numberWithCommas((Number(downPayment)+(cost-downPayment)*(fee/100)).toFixed(0))}</span>
        <div>
            <input
                type="range"
                name=""
                min={0}
                max={cost}
                value={downPayment}
                onChange={updateEmi}
                className="slider w-full"
            />
            <div className="lables flex justify-between">
                <label>0%</label>
                <b>{numberWithCommas(downPayment)}</b>
                <label>100%</label>
            </div>
        </div>
        <span>Loan Per Month</span>
        <span className="title">{" "} total LOAN AMOUNT {numberWithCommas((emi * tenure).toFixed(0))}</span>
        <div>
            <input
                type="range"
                name=""
                min={calculateEmi(cost)}
                max={calculateEmi(0)}
                value={emi}
                onChange={updateDownPayment}
                className="slider w-full"
            />
            <div className="lables flex justify-between">
                <label>{numberWithCommas(calculateEmi(cost))}</label>
                <b>{numberWithCommas(emi)}</b>
                <label>{numberWithCommas(calculateEmi(emi))}</label>
            </div>
        </div>
        <span>
            <div className="tenureContainer flex justify-between">
                {tenureData.map((t) => {
                    return (
                        <button
                            key={t}
                            onClick={() => setTenure(t)}
                            className={`tenure ${
                                t === tenure ? 'selected bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                            }`}
                        >
                            {t}
                        </button>
                    );
                })}
            </div>
        </span>
    </div>
  )
}

export default InterestRateCalculator
