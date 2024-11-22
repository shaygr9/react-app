import './App.css'
import Header from "./components/Header"
import { useState } from "react"
import TodayHourly from "./components/TodayHourly"
import Forecast from "./components/Forecast"
import { AppContext } from "./helpers/Contexts"
import Menu from "./components/Menu"

const PAGES = {
  menu: 'menu',
  today: 'today',
  forecast: 'forecast'
}

function App() {

  const [appState, setAppState] = useState(PAGES.menu)

  function changePage(nextPage?:string){
    setAppState(nextPage ?? 'menu')
  }

  return(
    <div className="App">
      <Header/>
      <AppContext.Provider value={{page:appState, changePage}}>
        {appState === PAGES.menu && <Menu/>}
        {appState === PAGES.today && <TodayHourly/>}
        {appState === PAGES.forecast && <Forecast/>}
      </AppContext.Provider>
      </div>
  )
}

export default App
