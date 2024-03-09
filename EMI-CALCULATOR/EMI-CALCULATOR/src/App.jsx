import React from 'react'
import {Routes,Route} from 'react-router-dom'
import InterestRateCalculator from './components/InterestRateCalculator'
import CarInterestCalculator from './components/CarInterestCalculator'
import PersonalInterrstCalculator from './components/PersonalInterrstCalculator'
import NavBar from './components/NavBar'


const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<InterestRateCalculator/>}/>
        <Route path='/carloancalculator' element={<CarInterestCalculator/>}/>
        <Route path='/personalinterestcalculator' element={<PersonalInterrstCalculator/>}/>
      </Routes>
    </div>
  )
}

export default App