import React, { Component } from 'react'
import './App.scss'
import HomePage from './components/pages/HomePage'
import NavBar from './components/organisms/NavBar'
import {
  INIT_DISPLAY,
  INIT_NAVBAR,
  INIT_SIGN_IN_STATE,
  INIT_CHECKOUT_DISABLED,
  INIT_SHIPPING_INFORMATION,
  INIT_PAYMENT_INFORMATION,
} from './utils/initState'
import ProductPage from './components/pages/ProductPage'
import CommerceAPI from './utils/api/commerce'
import AccountPage from './components/pages/AccountPage'
import ShippingPage from './components/pages/ShippingPage'
import CartPage from './components/pages/CartPage'
import PaymentPage from './components/pages/PaymentPage'
import ConfirmationPage from './components/pages/ConfirmationPage'
import { users } from './utils/users'

const products = new CommerceAPI()

class App extends Component {
  state = {
    isLoading: false,
    toggleSignIn: true,
    productCardDisplay: false,
    cartDisplay: false,
    shippingDisplay: false,
    paymentDisplay: false,
    confirmationDisplay: false,
    isDisabled: INIT_CHECKOUT_DISABLED,
    signIn: INIT_SIGN_IN_STATE,
    display: INIT_DISPLAY,
    navBarActiveButton: INIT_NAVBAR,
    shippingInformation: INIT_SHIPPING_INFORMATION,
    paymentInformation: INIT_PAYMENT_INFORMATION,
    usersArr: users,
    cart: [],
    productData: [],
    productSelected: [],
    cartItems: [],
    cartPriceInfo: {},
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    products.fetchCommerceApiData().then(
      (res) => {
        if (res && res.res.ok) {
          const dataArr = res.data
          this.setState({
            productData: dataArr,
            isLoading: false,
          })
        } else {
          return 'error'
        }
      },
      (error) => {
        console.error(error)
      },
    )
  }

  toggleSwitch = () => {
    this.setState({ toggleSignIn: !this.state.toggleSignIn })
  }
  handleSignInBtn = (value, user) => {
    this.setState((prevState) => ({
      signIn: { signedIn: true },
      cartItems: this.state.productData,
      isDisabled: {
        ...prevState.isDisabled,
        cartCheckout: false,
      },
      shippingInformation: user[0],
      usersArr: [
        ...prevState.usersArr,
        user[0]
      ]
    }))
  }
  handleSignOut = () => {
    this.setState((prevState) => ({
      ...prevState,
      signIn: INIT_SIGN_IN_STATE,
      display: INIT_DISPLAY,
      isDisabled: INIT_CHECKOUT_DISABLED,
      shippingInformation: INIT_SHIPPING_INFORMATION,
    }))
  }
  handlePageChange = (value) => {
    const changeDisplayToNone = Object.entries(this.state.display).filter(
      (item) => {
        return item[1] === '' ? item[0] : ''
      },
    )
    this.setState((prevState) => ({
      display: {
        ...prevState.display,
        [changeDisplayToNone[0][0]]: 'none',
        [value]: '',
      },
      navBarActiveButton: {
        ...prevState.navBarActiveButton,
        homePage: false,
        accountPage: false,
        cartPage: false,
        [value]: true,
      },
    }))
  }
  updateState = (name, state) => {
    this.setState({
      [name]: state,
    })
  }
  selectProduct = (data, { target: { localName }}) => {
    if (localName === 'svg' || localName === 'path') {
      return
    } else {
      this.setState({
        productCardDisplay: !this.state.productCardDisplay,
        productSelected: data,
      })
    }
  }
  addToCart = (id) => {
    this.state.productData.filter((item) => {
      return id === item.id && !item.inCart
        ? this.setState((prevState) => ({
            cart: [...prevState.cart, { ...item, qty: 1, inCart: true }],
            productData: prevState.productData.map((obj) =>
              obj.id === id ? { ...item, inCart: true } : obj,
            ),
          }))
        : null
    })
  }
  deleteFromCart = (id) => {
    this.setState((prevState) => ({
      cart: prevState.cart.filter((cartItem) =>
        cartItem.id === id ? null : cartItem,
      ),
      productData: prevState.productData.map((obj) =>
        obj.id === id ? { ...obj, inCart: false } : obj,
      ),
    }))
  }
  adjustQty = (id, operator) => {
    this.state.cart.filter((item) => {
      switch (operator) {
        case '+':
          item.qty <= item.available && item.id === id && item.qty++
          break
        case '-':
          item.qty > 0 && item.id === id && item.qty--
          break
        default:
      }
      // eslint-disable-next-line no-unused-expressions
      return id === item.id
        ? this.setState((prevState) => ({
            cart: [...prevState.cart],
          }))
        : null
    })
  }
  closeModal = () => {
    this.setState({ productCardDisplay: !this.state.productCardDisplay })
  }
  setCartState = () => {
    this.setState({ cartDisplay: !this.state.cartDisplay })
  }

  resetApp = () => {
    this.setState((prevState) => ({
      ...prevState,
      toggleSignIn: true,
      productCardDisplay: false,
      cartDisplay: false,
      shippingDisplay: false,
      paymentDisplay: false,
      confirmationDisplay: false,
      isDisabled: INIT_CHECKOUT_DISABLED,
      display: INIT_DISPLAY,
      navBarActiveButton: INIT_NAVBAR,
      cart: [],
      cartItems: [],
      cartPriceInfo: {},
    }))
  }

  render() {
    const {
      display,
      productData,
      navBarActiveButton,
      cart,
      cartPriceInfo,
      productCardDisplay,
      productSelected,
      shippingInformation,
      paymentInformation,
      cartDisplay,
      shippingDisplay,
      paymentDisplay,
      confirmationDisplay,
      isLoading,
    } = this.state
    const cartLength = cart.reduce((acc, val) => {
      return val.qty + acc
    }, 0)
    return (
      <div className='App'>
        <div className='MobileHeader'>
          <h1>Shopper App</h1>
        </div>
        {/*NavBar*/}
        <NavBar
          qty={2}
          activeButton={navBarActiveButton}
          handlePageChange={this.handlePageChange}
          cartLength={cartLength}
          setCartState={this.setCartState}
          cartDisplay={cartDisplay}
        />

        {/* Loading Spinner */}
        {isLoading && <div className="ldsRoller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}

        {/*Pages*/}
        {/*HomePage*/}
        {!display.homePage.length && (
          <HomePage
            productData={productData}
            addToCart={this.addToCart}
            selectProduct={this.selectProduct}
            cartDisplay={cartDisplay}
            productCardDisplay={productCardDisplay}
            shippingDisplay={shippingDisplay}
            paymentDisplay={paymentDisplay}
            confirmationDisplay={confirmationDisplay}
            isLoading={isLoading}
          />
        )}

        {/*AccountPage*/}
        {!display.accountPage.length && (
          <AccountPage
            toggle={this.state.toggleSignIn}
            toggleSwitch={this.toggleSwitch}
            signIn={this.state.signIn}
            shippingInformation={shippingInformation}
            usersArr={this.state.usersArr}
            display={this.state.display}
            users={this.state.signIn}
            isDisabled={this.state.isDisabled}
            handleSignInBtn={this.handleSignInBtn}
            isSignedIn={this.state.signIn.signedIn}
            handleSignOut={this.handleSignOut}
          />
        )}

        {productCardDisplay && (
          <ProductPage
            data={productSelected}
            addToCart={this.addToCart}
            closeModal={this.closeModal}
          />
        )}

        {/*CartPage*/}
        {cartDisplay && (
          <CartPage
            data={cart}
            adjustQty={this.adjustQty}
            cartLength={cartLength}
            deleteFromCart={this.deleteFromCart}
            updateState={this.updateState}
          />
        )}
        {shippingDisplay && (
          <ShippingPage
            data={cartPriceInfo}
            cart={cart}
            updateState={this.updateState}
            shippingInformation={shippingInformation}
          />
        )}
        {paymentDisplay && (
          <PaymentPage
            data={cartPriceInfo}
            updateState={this.updateState}
            cart={cart}
            shippingInformation={shippingInformation}
          />
        )}
        {confirmationDisplay && (
          <ConfirmationPage
            data={cartPriceInfo}
            cart={cart}
            updateState={this.updateState}
            shippingInformation={shippingInformation}
            paymentInformation={paymentInformation}
            resetApp={this.resetApp}
          />
        )}
      </div>
    )
  }
}

export default App
