import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { US_to_EU_routes } from './grades'
import { getRoutes } from './API/routes';
import { Routes } from './fakes';
// import { Utah_climbs } from './Utah'


function App() {
  type Keys = keyof typeof US_to_EU_routes;
  type Values = typeof US_to_EU_routes[Keys];
  const [selectedGrade, setSelectedGrade] = useState<Keys>("5.5")
  const [selectedEUGrade, setSelectedEUGrade] = useState<Values>("3c")
  const [routes, setRoutes] = useState<Routes>([])

  function getKeyByValue(US_to_EU_routes: { [x: string]: any; }, val: string) {
    return Object.keys(US_to_EU_routes).find(key =>
      US_to_EU_routes[key] === val)
  }


  useEffect(() => {
    //@ts-expect-error TODO
    getRoutes().then((r) => setRoutes(r.area.children as Routes))
  }, [])

  console.log({ routes })

  const filteredRoutes = useMemo(() => {
    return routes.filter(route => route?.children?.[0]?.climbs.filter(x => x.grades.yds === "5.10").length)
  }, [selectedGrade, selectedEUGrade])

  console.log({ filteredRoutes });

  return (
    <>
      <h1>Climbing grades</h1>

      <div>
        <h2>USA to Europe:</h2>
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <select onChange={({ target: { value } }) => setSelectedGrade(value as keyof typeof US_to_EU_routes)}>
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
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <select onChange={({ target: { value } }) => {
            setSelectedEUGrade(value as Values);
            filteredRoutes()
          }}>
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
      <div>

      </div>
    </>
  )
}

export default App

