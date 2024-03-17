import React from 'react'
import {Routes,Route} from 'react-router-dom'

import CarInterestCalculator from './components/CarInterestCalculator'
import PersonalInterrstCalculator from './components/PersonalInterrstCalculator'
import NavBar from './components/NavBar'
import InterestRateCalculator from './components/InterestRateCalculator'
import PrgoressBar from './PrgoressBar'


const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<InterestRateCalculator/>}/>
        <Route path='/carloancalculator' element={<CarInterestCalculator/>}/>
        <Route path='/personalinterestcalculator' element={<PersonalInterrstCalculator/>}/>
        <Route path='/progressbar' element={<PrgoressBar/>}/>
      </Routes>
    </div>
  )
}

export default App