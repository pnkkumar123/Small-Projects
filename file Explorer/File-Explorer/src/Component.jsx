import React, { useState } from 'react'

function Component({exploreData}) {
    console.log(exploreData);
    const [expend,setExpend]  = useState(false)
   const [showInput ,setShowInput] = useState({
    visible:false,
    isFolder:null
   })
   const handleNewFolder = (e,isFolder)=>{
    e.stopPropagation();
    setExpend(true)
    setShowInput({
        visible:true,
        isFolder
    })
   }
    if(exploreData.isFolder){
  return (
    <div style={{marginTop:5}}>
        <div className='folder' onClick={()=>setExpend(!expend)}>
            <span>

        📁  {exploreData.name}
            </span>
            <div>
              <button onClick={(e)=>handleNewFolder(e,true)}>Folders + </button>  
              <button onClick={(e)=>handleNewFolder(e,false)}>Files +</button>  
            </div>
        </div>
        <div style={{display:expend ? "block":"none",paddingLeft:254}}>
            {
                showInput.visible && (
                    <div className='inputContainer'> 
                      <span>{showInput.isFolder?"📁":"📄"}</span>
                      <input 
                      autoFocus
                      type='text'
                      onBlur={()=>setShowInput({...showInput,visible:false})}
                      className='inputContainer__input' />

                    </div>
                )
            }
            {exploreData.items.map((exp)=>{
                return(
                   <Component exploreData={exp}/>
                )
            })}
        </div>
          

    </div>
  )
} else {
    return <span className='file'>📄{exploreData.name}</span>
}
}

export default Component