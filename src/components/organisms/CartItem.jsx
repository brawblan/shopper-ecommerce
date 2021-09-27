import React from 'react'
import CartItemBtnMinus from '../molecules/CartItemBtnMinus'
import CartItemBtnPlus from '../molecules/CartItemBtnPlus'

const CartItem = ({ data }) => {
  const { image, title, price } = data
  return (
    <div className='CartItem'>
      <div className='ItemImage'>
        <img src={image} alt='' />
      </div>
      <div className='ItemContent'>
        <div className='BodyText'>{title}</div>
        <div className='ItemPriceQty'>
          <div className='BodyTextBold'>{price}</div>
          <CartItemBtnMinus />
          <span>2</span>
          <CartItemBtnPlus />
        </div>
      </div>
    </div>
  )
}

export default CartItem
