import React from 'react'
import Button from './../atoms/Button'
import style from './CartInformation.module.scss'

const CartInformation = ({cartInfo, onCheckout, buttonText, disabled}) => {
  const {subtotal, taxes, total} = cartInfo
  return (
    <div className={style.InfoContainer}>
      <h2>Cart Information</h2>
      <div className={style.PriceContainer}>
        <p>Subtotal: ${subtotal}.00</p>
        <p>Taxes: ${Number(taxes).toFixed(2)}</p>
        <p>Total: ${Number(total).toFixed(2)}</p>
      </div>
      <Button
        text={buttonText}
        disabled={!disabled}
        width={10}
        onClick={onCheckout}
      />
    </div>
  )
}

export default CartInformation
