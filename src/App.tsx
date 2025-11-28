import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Body from './components/Body'
import Header from './components/Header'
import LeftPanel from './components/LeftPanel'
import { LayoutProvider } from './context/LayoutContext'

function App() {

  return (
    <BrowserRouter>
      <LayoutProvider>
        <Header />
        <div className='layout'>
          <LeftPanel />
          <Body />
        </div>
      </LayoutProvider>
    </BrowserRouter>
  )
}

export default App
