import { useContext } from 'react';
import './index.css'
import { LayoutContext } from '../../context/LayoutContext';
import { LAYOUT } from '../../constant';
import SearchBar from '../SearchBar';

function Header() {
  const { layout, setLayout } = useContext(LayoutContext) || {};

  const toggleLayout = () => {
    if(setLayout) {
      if(layout === LAYOUT.GRID) {
        setLayout(LAYOUT.LIST)
      } else {
        setLayout(LAYOUT.GRID)
      }
    }

  }

  return (
    <header className='header'>
    <div>
     <h3>E-Commerce DASHBOARD</h3>
    </div>
    <div className='header-actions'>
      <SearchBar />
      <button onClick={toggleLayout}>{layout}</button>
      <div>Compare</div>
    </div>
  </header>
  )
}
  

export default Header
