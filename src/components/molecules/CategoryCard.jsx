import React from 'react'
import ProductImage from './ProductImage'

const CategoryCard = ({ data, categoryDisplay, onClick }) => {
  const { category, image } = data
  const active = category === categoryDisplay

  return (
    <div
      className={`CategoryCard Card Center ${
        category === 'All' ? 'AllCard' : ''
      }`}
      onClick={onClick}
    >
      <ProductImage image={image} classProp={'CategoryHeight'} />
      <div
        className={`CategoryContent Center BodyText card${3} ${
          active ? 'Active' : ''
        }`}
      >
        {category}
      </div>
    </div>
  )
}

export default CategoryCard
