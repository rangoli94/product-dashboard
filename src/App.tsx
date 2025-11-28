import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Body from './components/Body'
import Header from './components/Header'
import LeftPanel from './components/LeftPanel'
import { LayoutProvider } from './context/LayoutContext'
import { SearchResultProvider } from './context/SearchResultContext'

function App() {

  return (
    <BrowserRouter>
      <LayoutProvider>
        <SearchResultProvider>
          <Header />
          <div className='layout'>
            <LeftPanel />
            <Body />
          </div>
        </SearchResultProvider>
      </LayoutProvider>
    </BrowserRouter>
  )
}

export default App
