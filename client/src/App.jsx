

import React,{ useState } from 'react'
import Top from './components/Top'
import Center from './components/Center'
import Popup from './components/Popup'
import Search from './components/Search'
import './App.css'

function App() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [popActive, setPopActive] = useState(false)
  const [secPop, setSecPop] = useState(false)
  const [searchData, setSearchData] = useState(null)

  function handlePop(){
    setPopActive(!popActive)
  }

  function handleSecPop(){
    setSecPop(!secPop)
  }

  return (
    <div className="App">
      <Popup 
      popActive={popActive}
      handlePop={handlePop}/>
      <Search 
      secPop={secPop}
      handleSecPop={handleSecPop}
      searchData={searchData}/>
      <div className={popActive? "main lessen" : secPop? "main lessen" : "main"}>
        <Top 
        isAnimated={isAnimated}
        handlePop={handlePop} />
        

        <Center 
        isAnimated={isAnimated}
        secPop={secPop}
        setIsAnimated={setIsAnimated} 
        handleSecPop={handleSecPop}
        setSearchData={setSearchData}/>
      </div>
    </div>
  )
}

export default App
