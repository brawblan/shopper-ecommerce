import React from 'react'
import Minus from '../atoms/Minus'
import Trash from '../atoms/Trash'

const CartItemBtnPlus = ({ adjustQty, id, deleteFromCart, qty }) => {
  return (
    <div className='CartItemBtn'>
      {qty > 1 ? (
        <Minus fill='#51B1A6' minusBtn={adjustQty} id={id} />
      ) : (
        <Trash fill='#51B1A6' deleteBtn={deleteFromCart} id={id} />
      )}
    </div>
  )
}

export default CartItemBtnPlus
