import React from 'react'
import Plus from '../atoms/Plus'

const CartItemBtnPlus = ({ adjustQty, id }) => {
  return (
    <div className='CartItemBtn'>
      <Plus fill='#51B1A6' plusBtn={adjustQty} id={id} />
    </div>
  )
}

export default CartItemBtnPlus
