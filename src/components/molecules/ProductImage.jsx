import React from 'react'
import Plus from '../atoms/Plus'

const ProductImage = ({ image, classProp, addToCart, id }) => {
  return (
    <div className={`ProductImageContainer ${classProp}`}>
      <img src={image} alt='' />
      {!classProp.length && (
        <Plus fill={'#FFFAF5'} plusBtn={addToCart} id={id} />
      )}
    </div>
  )
}

export default ProductImage
