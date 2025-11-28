import './index.css'
import { LAYOUT } from '../../constant'
import type { Layout } from '../../types/products'

function LayoutManager({ children, layout }: { children: React.ReactNode, layout: Layout }) {


  const getLayout = () => {
    switch(layout) {
      case LAYOUT.GRID:
        return <div className='grid-layout'>{children}</div>
      case LAYOUT.LIST:
        return <div className='list-layout'>{children}</div>
      default:
        return <div className='grid-layout'>{children}</div>
    }
  }
  return getLayout()
}

export default LayoutManager