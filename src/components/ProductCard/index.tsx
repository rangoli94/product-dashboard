import './index.css'
import type { Product } from '../../types/products'
import { LayoutContext } from '../../context/LayoutContext'
import { useContext } from 'react'
import { BADGE, LAYOUT, STOCK_STATUS } from '../../constant'
import BadgeComponent from '../BadgeComponent'
import StarRating from '../StarRating'

const ProductCard = ({ product, isChecked, onClickCheckboxHandler }: { product: Product, isChecked: boolean, onClickCheckboxHandler: (product: Product) => void }) => {
  const layoutContext = useContext(LayoutContext)

  if(!layoutContext) {
    return
  }

  const { layout } = layoutContext 

  const getStockStatus = () => {
    if(product.stock === 0) {
      return {badgeValue: STOCK_STATUS.OUT_OF_STOCK, badgeColor: BADGE.RED}

    }
    if(product.stock < 5) {
      return {badgeValue: STOCK_STATUS.LOW_STOCK, badgeColor: BADGE.YELLOW}
    }

    if(product.stock >= 5) {
      return {badgeValue: STOCK_STATUS.IN_STOCK, badgeColor: BADGE.GREEN}
    }

    return {badgeValue: STOCK_STATUS.OUT_OF_STOCK, badgeColor: BADGE.RED}
  }

  const {badgeValue, badgeColor} = getStockStatus()
  const finalClasses = `product-card ${layout === LAYOUT.LIST ? "list-view" : ""}`
  return (
    <div className={finalClasses}>
      <img
        className='product-card__image'
        src={product.images[0]}
        alt={product.title}
        loading='lazy'
      />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating} <StarRating rating={product.rating}/></p>
      <p>Stock: {product.stock}<BadgeComponent badgeValue={badgeValue} badgeColor={badgeColor} /></p>
      
      <label style={{
        display: "flex",
        alignItems: "center"
      }}>
        <input type='checkbox' checked={isChecked} onChange={() => onClickCheckboxHandler(product)}/> 
        Compare
      </label>
      
    </div>
  )
}

export default ProductCard