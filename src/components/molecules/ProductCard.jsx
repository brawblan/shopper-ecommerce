import React from 'react'
import ProductImage from './ProductImage'

const ProductCard = ({ data, categoryDisplay }) => {
  const { category, name, price, image } = data
  const display =
    categoryDisplay === category || categoryDisplay === 'All' ? '' : 'none'

  return (
    <div className='Card Center' style={{ display: `${display}` }}>
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
