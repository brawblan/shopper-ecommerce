import React from 'react'
import CartItem from '../organisms/CartItem'
import style from './CartPage.module.scss'
import FloatingCartInfo from '../molecules/FloatingCartInfo'

const CartPage = ({ data, adjustQty, cartLength, deleteFromCart }) => {
  return (
    <div className={style.Container}>
      <FloatingCartInfo qty={cartLength} />
      {data.length ? (
        data.map((item) => (
          <CartItem
            data={item}
            adjustQty={adjustQty}
            deleteFromCart={deleteFromCart}
            key={item.id}
          />
        ))
      ) : (
        <div>You have no items in your cart</div>
      )}
    </div>
  )
}

export default CartPage
