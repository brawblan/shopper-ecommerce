import React from 'react'
import style from './Homepage.module.scss'
import ProductContainer from '../organisms/ProductContainer'

const Homepage = ({ productData }) => {
  return (
    <div className={style.Container}>
      <div className={style.HomepageIntro} />
      <ProductContainer data={productData} />
    </div>
  )
}

export default Homepage
