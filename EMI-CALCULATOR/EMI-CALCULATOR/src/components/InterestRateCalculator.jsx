import React,{useState} from 'react'

const InterestRateCalculator = () => {
    const [principle, setPrinciple] = useState("")
    
  return (
    <>
    <div className="container">
        <div className="calculations">
           <div className="principle-loan">
           <h3>Home Loan</h3>
            <div className="principle-amount">
                <input type="range" name="" value={principle} id="" min={0} max={2000} onClick={(e)=>setPrinciple(e.target.value)} />
                <input type="number" name="" value={principle} id="" placeholder='2500000' onChange={(e)=>setPrinciple(e.target.value)}/>
            </div>
            <div className="interest-rate">
            <input type="range" name="" id="" min={0} max={20} />
                <input type="number" name="" id="" placeholder='2'/>
            </div>
            <div className="loan-tenure">
                <input type="range" name="" id="" />
                <input type="number" name="" id="" />
            </div>
            <div className="breakup-loan">
                <label>Loan Emi</label>
                <span>2000</span>
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