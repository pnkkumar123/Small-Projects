import React, { useState,useEffect } from 'react'
import './styles.css'

function Progress({value = 0,onComplete = ()=>{}}) {
    const [percent,setPercent] = useState(value)
    useEffect(() => {
      setPercent(Math.min(100,Math.max(value,0)))
    }, [value])
    if(value >=100){
        onComplete()
    }
  return (
    <div className='progress'>
    <span
    style={{color:percent>49 ? "white" : "black"}}
    >{percent.toFixed()}%</span>
    <div style={{transform: `scaleX(${percent/100})`,transformOrigin:"left"}} role='progressbar'
    aria-valuemax={100}
    aria-valuemin={0}
    aria-valuenow={percent.toFixed()}
    />
</div>
  )
}

export default Progress