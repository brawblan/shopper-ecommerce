import React from 'react'
import CartItemBtnMinus from '../molecules/CartItemBtnMinus'
import CartItemBtnPlus from '../molecules/CartItemBtnPlus'

const CartItem = ({ data, adjustQty }) => {
  const { image, name, price, qty, id } = data
  return (
    <div className='CartItem'>
      <div className='ItemImage'>
        <img src={image} alt='' />
      </div>
      <div className='ItemContent'>
        <div className='BodyText'>{name}</div>
        <div className='ItemPriceQty'>
          <div className='BodyTextBold'>{price}</div>
          <CartItemBtnMinus />
          <span>{qty}</span>
          <CartItemBtnPlus adjustQty={adjustQty} id={id} />
        </div>
      </div>
    </div>
  )
}

export default CartItem
