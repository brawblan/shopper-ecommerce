import React, { PureComponent } from 'react'
import CartItem from '../organisms/CartItem'
import style from './CartPage.module.scss'
import FloatingCartInfo from '../molecules/FloatingCartInfo'
import Button from './../atoms/Button'
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
    const { subtotal, taxes, total } = cartInfo

    const onCheckout = () => {
      updateState('cartPriceInfo', cartInfo)
      updateState('cartDisplay', false)
      updateState('shippingDisplay', true)
    }

    return (
      <div className={style.CartContainer}>
        <FloatingCartInfo qty={cartLength} />
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
          <div className={style.InfoContainer}>
            <h2>Cart Information</h2>
            <div className={style.PriceContainer}>
              <p>Subtotal: ${subtotal}.00</p>
              <p>Taxes: ${Number(taxes).toFixed(2)}</p>
              <p>Total: ${Number(total).toFixed(2)}</p>
            </div>
            <Button
              text={'Checkout'}
              disabled={false}
              width={10}
              onClick={onCheckout}
            />
          </div>
        </div>
      </div>
    )

  }
}

export default CartPage
