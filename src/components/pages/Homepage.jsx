import React from 'react'
import style from './Homepage.module.scss'
import ProductCard from '../organisms/ProductCard'

const Homepage = ({ productData }) => {
  return (
    <div className={style.Container}>
      {productData.map((item) => (
        <ProductCard data={item} key={item.id} />
      ))}
    </div>
  )
}

export default Homepage
