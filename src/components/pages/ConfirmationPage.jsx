import React from 'react'
import CartItem from '../organisms/CartItem'
import CartInformation from '../organisms/CartInformation'
import BackArrowButton from '../molecules/BackArrowButton'
import style from './PaymentPage.module.scss'
import CartItemBtnPlus from '../molecules/CartItemBtnPlus'
import ShippingInfo from '../organisms/ShippingInfo'
import '../../App.scss'

const ConfirmationPage = ({data, cart, shippingInformation, paymentInformation, updateState, resetApp}) => {
  const onConfirmOrder = () => {
    updateState('paymentDisplay', false)
    updateState('confirmationDisplay', true)
    resetApp()
  }
  
  const onBackArrow = () => {
    updateState('confirmationDisplay', false)
    updateState('paymentDisplay', true)
  }
  
  const closeModal = () => {
    updateState('confirmationDisplay', false)
  }

  return (
      <div className={style.Container}>
        <div className={style.HeaderContainer}>
          <BackArrowButton 
            className={style.CartItemBtn} 
            onBack={onBackArrow}
          />
          <h2>Order Confirmation</h2>
          <div className={style.ExitButton}>
            <CartItemBtnPlus
                adjustQty={closeModal}
              />
          </div>
        </div>
        <div className={style.FormContainer}>        
          <div className={style.CartInformationContainer}>
            <div>
              {cart.map((item) => (
                <CartItem
                data={item}
                adjustQty={false}
                deleteFromCart={false}
                key={item.id}
                />
                ))}
            </div>
            <ShippingInfo 
              shippingInformation={shippingInformation}
            />
            <CartInformation
              cartInfo={data}
              onCheckout={onConfirmOrder}
              buttonText={'Place Order'}
              disabled={true}
            />
          </div>
        </div>
      </div>
  )
}

export default ConfirmationPage