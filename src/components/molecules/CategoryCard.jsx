import React from 'react'
import ProductImage from './ProductImage'

const CategoryCard = ({ data }) => {
  const { category, image } = data
  return (
    <div className='CategoryCard Card Center'>
      <ProductImage image={image} classProp={'CategoryHeight'} />
      <div className='CategoryContent Center BodyText'>{category}</div>
    </div>
  )
}

export default CategoryCard
