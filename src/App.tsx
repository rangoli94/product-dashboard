import './App.css'
import Body from './components/Body'
import Header from './components/Header'
import LeftPanel from './components/LeftPanel'

function App() {

  return (
    <>
      <Header />
      <div className='layout'>
        <LeftPanel />
        <Body />
      </div>
     
    </>
  )
}

export default App
