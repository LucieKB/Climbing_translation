import { useState } from 'react'
import './App.css'
import { US_to_EU_routes } from './grades'

function App() {
const [selectedGrade, setSelectedGrade] = useState<keyof typeof US_to_EU_routes>("5.5")
// const selectRef = useRef(null) 

  return (
    <div>
      <h1>Climbing grades</h1>
    
      <div style={{display:"flex", justifyContent:'space-between'}}>
        <select onChange={({target:{value}})=> setSelectedGrade(value as keyof typeof US_to_EU_routes)}>
          {Object.keys(US_to_EU_routes).map((grade) => <option value={grade}> {grade} </option>
            )}
        </select>
        <div>
          {US_to_EU_routes?.[selectedGrade]}
        </div>

      </div>
    </div>
  )
}

export default App

