import React from 'react'
import CartItemBtnMinus from '../molecules/CartItemBtnMinus'
import CartItemBtnPlus from '../molecules/CartItemBtnPlus'
import {CartService} from '../../services/cart-service/cart.service.js'

const CartItem = ({ data, adjustQty, deleteFromCart }) => {
  const { image, name, price, qty, id } = data
  const adjustedPrice = (CartService.getPriceAsNumber(price) * qty).toFixed(2)
  return (
    <div className='CartItem'>
      <div className='ItemImage'>
        <img src={image} alt='' />
      </div>
      <div className='ItemContent'>
        <div className='BodyText'>{name}</div>
        <div className='ItemPriceQty'>
          <div className='BodyTextBold'>${adjustedPrice}</div>
          <CartItemBtnMinus
            adjustQty={adjustQty}
            id={id}
            qty={qty}
            deleteFromCart={deleteFromCart}
          />
          <span>{qty}</span>
          <CartItemBtnPlus adjustQty={adjustQty} id={id} />
        </div>
      </div>
    </div>
  )
}

export default CartItem
