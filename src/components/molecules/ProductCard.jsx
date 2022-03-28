import React from 'react'
import ProductImage from './ProductImage'

const ProductCard = ({ data, categoryDisplay, addToCart, selectProduct, searchInput }) => {
  const { category, name, price, image, id, inCart } = data
  let searchName
  if (name) {
    searchName = name.toLowerCase()
  }
  let lowerSearchInput
  if (searchInput) {
    lowerSearchInput = searchInput.toLowerCase()
  }

  let display =
    categoryDisplay === category || categoryDisplay === 'All' ? '' : 'none'

  if (name && searchInput) {
    if (searchInput.length && !searchName.includes(lowerSearchInput)) {
      display = 'none'
    }
  }

  return (
    <div 
      className='Card Center Product' 
      style={{ display: `${display}` }} 
      onClick={(e) => selectProduct(data)}
    >
      <ProductImage
        image={image}
        classProp={''}
        addToCart={addToCart}
        id={id}
        disabled={inCart}
      />
      <div className='ProductContent Center'>
        <p className='SmallText'>{category}</p>
        <div className='BodyText'>{name}</div>
        <div className='BodyTextBold Price'>{price}</div>
      </div>
    </div>
  )
}

export default ProductCard
