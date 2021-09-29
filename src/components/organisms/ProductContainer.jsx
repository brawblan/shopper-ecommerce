import React from 'react'
import style from '../pages/Homepage.module.scss'
import ProductCard from '../molecules/ProductCard'

const ProductContainer = ({ data }) => {
  return (
    <div className={style.ProductContainer}>
      {data.map((item) => (
        <ProductCard data={item} key={item.id} />
      ))}
    </div>
  )
}

export default ProductContainer
