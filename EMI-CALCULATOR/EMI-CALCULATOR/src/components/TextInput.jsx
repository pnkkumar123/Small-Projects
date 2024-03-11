import React from 'react'

const TextInput = ({title,state,setState}) => {

  return (
    <>
    <span className='title'>{title}</span>
    <input type="number" name="" value={state} onChange={(e)=>setState(e.target.value)}  placeholder={title}/>
    </>
  )
}

export default TextInput