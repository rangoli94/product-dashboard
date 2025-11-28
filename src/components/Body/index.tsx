import { useContext, useEffect, useState } from "react"
import type { Product } from "../../types/products"
import ProductCard from "../ProductCard"
import LayoutManager from "../LayoutManager"
import './index.css'
import { LayoutContext } from "../../context/LayoutContext"
import { usePagination } from "../../customHooks/usePagination"
import PaginationPanel from "../PaginationPanel"


const Body = () => {

  const [products, setProducts] = useState<Product[]>([])
  const layoutContext = useContext(LayoutContext)

  if(!layoutContext) {
    return
  }

  const { layout } = layoutContext 

  const {
    currentItems,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(products, 20);

  const [comparisonList, setComparisonList] = useState<Product[]>([])

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=100')
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const onClickCheckboxHandler = (selectedProduct: Product) => {
    const newList = []

    if(comparisonList.length === 3) {
      throw new Error("already 3 products selected")
    }

    let isProductAlreadySelected = false

    for(let i=0; i < comparisonList.length; i++) {
      if(selectedProduct.id !== comparisonList[i].id) {
        newList.push(comparisonList[i])
      } else {
        isProductAlreadySelected = true
      }
    }

    if(!isProductAlreadySelected) {
      newList.push(selectedProduct)
    }

    setComparisonList(newList)

  }

  useEffect(() => {
    fetchData()
  }, [])

  return <main className='body'>
      <LayoutManager layout={layout}>
        {
          currentItems.length > 0 && currentItems.map((product) => (
            <ProductCard key={product.id} product={product}  //isChecked={comparisonList.includes(product.id)}
            isChecked={false}  
            onClickCheckboxHandler={onClickCheckboxHandler}
            />
          ))
        }
      </LayoutManager>

      <PaginationPanel  currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
        goToPage={goToPage}
        />
    
    
    </main>
}

export default Body
