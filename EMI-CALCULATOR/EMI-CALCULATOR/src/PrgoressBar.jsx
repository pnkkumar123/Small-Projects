import React from 'react'

function PrgoressBar({value}) {
  return (
    <div className='progress'>
        <span>{value.toFixed()}%</span>
    </div>
  )
}

export default PrgoressBar