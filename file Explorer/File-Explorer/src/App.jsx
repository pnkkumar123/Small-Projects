

import { useState } from 'react'
import './App.css'
import Component from './Component'
import explorer from './data/folderData'

function App() {
  const [exploreData,setExploreData] = useState(explorer)
  

  return (
    <>
      <Component exploreData={exploreData}/>
    </>
  )
}

export default App
