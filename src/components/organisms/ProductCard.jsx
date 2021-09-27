import React from 'react'
import ProductImage from '../molecules/ProductImage'

const ProductCard = ({ data }) => {
  const { category, name, price, image } = data
  return (
    <div className='Card Center'>
      <ProductImage image={image} classProp={''} />
      <div className='ProductContent Center'>
        <p className='SmallText'>{category}</p>
        <div className='BodyText'>{name}</div>
        <div className='BodyTextBold Price'>{price}</div>
      </div>
    </div>
  )
}

export default ProductCard
