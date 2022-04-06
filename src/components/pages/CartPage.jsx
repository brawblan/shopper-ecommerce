import React, { PureComponent } from 'react'
import CartItem from '../organisms/CartItem'
import style from './CartPage.module.scss'
import FloatingCartInfo from '../molecules/FloatingCartInfo'
import CartInformation from '../organisms/CartInformation'
import CartItemBtnPlus from '../molecules/CartItemBtnPlus'
import {CartService} from '../../services/cart-service/cart.service.js'

class CartPage extends PureComponent {
  state = {
    cartInfo: {},
    cart: this.props.data,
    cartLength: 0,
  }

  componentDidMount() {
    let cartPriceInfo = CartService.createCartPriceInfo(this.state.cart)
    let subtotal = CartService.getSubTotal(cartPriceInfo)
    let taxes = CartService.getTaxes(Number(subtotal))
    let total = CartService.getTotal(Number(subtotal), Number(taxes))

    this.setState({
      cartInfo: {subtotal: Number(subtotal), taxes: Number(taxes), total: Number(total)},
      cartLength: this.props.cartLength
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.cartLength === this.props.cartLength) {
      return
    }
    
    let cartPriceInfo = CartService.createCartPriceInfo(this.props.data)
    let subtotal = CartService.getSubTotal(cartPriceInfo)
    let taxes = CartService.getTaxes(Number(subtotal))
    let total = CartService.getTotal(Number(subtotal), Number(taxes))
    
    this.setState({
      cart: this.props.data,
      cartInfo: {subtotal: Number(subtotal), taxes: Number(taxes), total: Number(total)},
      cartLength: this.props.cartLength,
    })
  }

  render() {
    const { adjustQty, cartLength, deleteFromCart, updateState } = this.props
    const { cartInfo, cart } = this.state

    const onCheckout = () => {
      updateState('cartPriceInfo', cartInfo)
      updateState('cartDisplay', false)
      updateState('shippingDisplay', true)
    }

    const closeModal = () => {
      updateState('cartDisplay', false)
    }

    return (
      <div className={style.CartContainer}>
        <div className={style.HeaderContainer}>
            <FloatingCartInfo qty={cartLength} />
            <div className={style.ExitButton}>
              <CartItemBtnPlus
                  adjustQty={closeModal}
              />
            </div>
          </div>
        <div className={style.Container}>
          <div className={style.ItemContainer}>
            {cart.length ? (
              cart.map((item) => (
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
          <CartInformation
            cartInfo={cartInfo}
            onCheckout={onCheckout}
            buttonText={'Checkout'}
            disabled={cart.length}
          />
        </div>
      </div>
    )

  }
}

export default CartPage
