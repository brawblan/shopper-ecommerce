import React from 'react'
import Plus from '../atoms/Plus'

const ProductImage = ({ image, classProp }) => {
  return (
    <div className={`ProductImageContainer ${classProp}`}>
      <img src={image} alt='' />
      {!classProp.length && <Plus fill={'#FFFAF5'} />}
    </div>
  )
}

export default ProductImage
