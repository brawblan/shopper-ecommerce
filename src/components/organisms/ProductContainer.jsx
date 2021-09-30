import React from 'react'
import style from '../pages/Homepage.module.scss'
import ProductCard from '../molecules/ProductCard'

const ProductContainer = ({ data, categoryDisplay, background }) => {
  return (
    <div className={style.ProductContainer}>
      {data.map((item) => (
        <ProductCard
          data={item}
          categoryDisplay={categoryDisplay}
          key={`product_${item.id}`}
          background={background}
        />
      ))}
    </div>
  )
}

export default ProductContainer
