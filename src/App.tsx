import { useState } from 'react'
import './App.css'
import { US_to_EU_routes } from './grades'

function App() {
type Keys = keyof typeof US_to_EU_routes;
type Values = typeof US_to_EU_routes[Keys];
const [selectedGrade, setSelectedGrade] = useState<Keys>("5.5")
const [selectedEUGrade, setSelectedEUGrade] = useState<Values>("3c")

function getKeyByValue(US_to_EU_routes: { [x: string]: any; }, val: string){
  return Object.keys(US_to_EU_routes).find(key =>
    US_to_EU_routes[key] === val)
}





  return (
    <>
    <h1>Climbing grades</h1>
    
    <div>
      <h2>USA to Europe:</h2>
      <div style={{display:"flex", justifyContent:'space-between'}}>
        <select onChange={({target:{value}})=> setSelectedGrade(value as keyof typeof US_to_EU_routes)}>
          {Object.keys(US_to_EU_routes).map((grade) => <option value={grade}> {grade} </option>
            )}
        </select>
        <div>
       ➜   
        </div>
        <div>
         {US_to_EU_routes?.[selectedGrade]}
        </div>


      </div>

      <h2>Europe to USA:</h2>
      <div style={{display:"flex", justifyContent:'space-between'}}>
        <select onChange={({target:{value}})=> setSelectedEUGrade(value as Values)}>
          {Object.values(US_to_EU_routes).map((grade) => <option value={grade}> {grade} </option>
            )}
        </select>
        <div>
       ➜   
        </div>
        <div>
         {getKeyByValue(US_to_EU_routes, selectedEUGrade)}
        </div>
      </div>
    </div>
    </>
  )
}

export default App

