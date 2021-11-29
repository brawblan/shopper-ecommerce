import React, { Component } from 'react'
import './App.scss'
import HomePage from './components/pages/HomePage'
import NavBar from './components/organisms/NavBar'
import {
  INIT_DISPLAY,
  INIT_NAVBAR,
  INIT_SIGN_IN_STATE,
  INIT_CREDIT_CARD,
  INIT_CHECKOUT_DISABLED,
} from './utils/initState'
import {
  userExists,
  validateEmail,
  validateName,
  validatePassword,
} from './utils/createAccountValidations'
import ProductPage from './components/pages/ProductPage'
import CommerceAPI from './utils/api/commerce'
import AccountPage from './components/pages/AccountPage'
import CartPage from './components/pages/CartPage'
import { users } from './utils/users'

const products = new CommerceAPI()

class App extends Component {
  state = {
    toggleSignIn: true,
    display: INIT_DISPLAY,
    navBarActiveButton: INIT_NAVBAR,
    usersArr: users,
    signIn: INIT_SIGN_IN_STATE,
    productData: [],
    cart: [],
    cartDisplay: false,
    cartItems: [],
    cartSubtotal: '0.00',
    cartTotal: '0.00',
    isDisabled: INIT_CHECKOUT_DISABLED,
  }

  async componentDidMount() {
    products.fetchCommerceApiData().then(
      (res) => {
        if (res && res.res.ok) {
          const dataArr = res.data
          this.setState({
            productData: dataArr,
          })
        } else {
          return 'error'
        }
      },
      (error) => {
        console.log(error)
      },
    )
  }

  toggleSwitch = () => {
    this.setState({ toggleSignIn: !this.state.toggleSignIn })
  }

  handleSignInBtn = (value) => {
    const createTotal = (cart) => {
      return Number(
        cart
          .map(({ price, qty }) => {
            return price * qty
          })
          .reduce((a, b) => a + b)
          .toFixed(2),
      )
    }
    this.setState((prevState) => ({
      signIn: { signedIn: true },
      display: {
        ...prevState.display,
        [value]: '',
      },
      cartItems: this.state.productData,
      cartSubtotal: createTotal(this.state.productData),
      cartTotal: createTotal(this.state.productData),
      isDisabled: {
        ...prevState.isDisabled,
        cartCheckout: false,
      },
    }))
  }

  handleSignUp = ({ target: { name, value } }) => {
    let errorText
    if (value.length) {
      if (name === 'email') {
        const userEmailExists = userExists(value)
        if (userEmailExists) {
          errorText = userEmailExists
        } else {
          errorText = validateEmail(value)
        }
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${name}Error`]: errorText },
        }))
      } else if (name === 'password') {
        errorText = validatePassword(value, true)
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${name}Error`]: errorText },
        }))
      } else if (name === 'confirmPassword') {
        errorText = validatePassword(value, true)
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${name}Error`]: errorText },
        }))
      } else if (name === 'firstName') {
        errorText = validateName(value, 'first name')
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${name}Error`]: errorText },
        }))
      } else if (name === 'surname') {
        errorText = validateName(value, 'surname')
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${name}Error`]: errorText },
        }))
      }
    }

    setTimeout(() => {
      const errorCheck = this.checkErrorBeforeSignUp()
      if (!errorCheck) {
        this.setState((prevState) => ({
          isDisabled: {
            ...prevState.isDisabled,
            signUpBtn: false,
          },
        }))
      } else {
        this.setState((prevState) => ({
          isDisabled: {
            ...prevState.isDisabled,
            signUpBtn: true,
          },
        }))
      }
    }, 50)
  }

  handleSignOut = () => {
    this.setState((prevState) => ({
      ...prevState,
      signIn: INIT_SIGN_IN_STATE,
      display: INIT_DISPLAY,
      isDisabled: INIT_CHECKOUT_DISABLED,
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

  handleHomeScreenBtn = ({ target: { value } }) => {
    if (this.state.display.paymentPage === '') {
      this.setState((prevState) => ({
        ...prevState,
        cardData: INIT_CREDIT_CARD,
        cardType: null,
        isDisabled: {
          ...prevState.isDisabled,
          paymentCheckout: true,
        },
      }))
    }

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
    }))
  }

  updateState = (name, state) => {
    this.setState({
      [name]: state,
    })
  }

  updateNestedState = (name, sub, state) => {
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        [sub]: state,
      },
    }))
  }

  updateDoubleNestedState = (
    name,
    sub1,
    state1,
    sub2,
    state2,
    signUp = false,
  ) => {
    if (!signUp) {
      this.setState((prevState) => ({
        ...prevState,
        [name]: {
          ...prevState[name],
          [sub1]: state1,
          [sub2]: state2,
        },
      }))
    } else {
      this.setState((prevState) => ({
        [name]: [...prevState[name], { [sub1]: state1, [sub2]: state2 }],
      }))
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

  setCartState = () => {
    this.setState({ cartDisplay: !this.state.cartDisplay })
  }

  render() {
    const { display, productData, navBarActiveButton, cart, cartDisplay } =
      this.state
    const cartLength = cart.reduce((acc, val) => {
      return val.qty + acc
    }, 0)
    return (
      <div className='App'>
        {/*NavBar*/}
        <NavBar
          qty={2}
          activeButton={navBarActiveButton}
          handlePageChange={this.handlePageChange}
          cartLength={cartLength}
          setCartState={this.setCartState}
          cartDisplay={cartDisplay}
        />

        {/*Pages*/}
        {/*HomePage*/}
        {!display.homePage.length && (
          <HomePage productData={productData} addToCart={this.addToCart} />
        )}
        {/*ProductDetailsPage*/}
        {!display.productPage && <ProductPage data={'Hello World'} />}

        {/*AccountPage*/}
        {!display.accountPage.length && (
          <AccountPage
            toggle={this.state.toggleSignIn}
            toggleSwitch={this.toggleSwitch}
            data={productData}
            signIn={this.state.signIn}
            usersArr={this.state.usersArr}
            display={this.state.display}
            users={this.state.signIn}
            isDisabled={this.state.isDisabled}
            updateNestedState={this.updateNestedState}
            updateState={this.updateState}
            handleSignInBtn={this.handleSignInBtn}
            createAccount={this.handleHomeScreenBtn}
            isSignedIn={this.state.signIn.signedIn}
            handleSignUp={this.handleSignUp}
            backToSignIn={this.handleHomeScreenBtn}
            updateDoubleNestedState={this.updateDoubleNestedState}
            handleSignOut={this.handleSignOut}
          />
        )}

        {/*CartPage*/}
        {cartDisplay && (
          <CartPage
            data={cart}
            adjustQty={this.adjustQty}
            cartLength={cartLength}
            deleteFromCart={this.deleteFromCart}
          />
        )}

        {/*components*/}
      </div>
    )
  }
}

export default App

// Components
// <div className='TestDisplay'>
//   <NavigationLeaf active={true} qty={3} />
//   <NavigationLeaf active={false} qty={0} />
//   <Chip active={true} text={'TextT'} />
//   <Chip active={false} text={'TextF'} />
//   <Badge qty={2} def={true} />
//   <Badge qty={2} def={false} />
//   <FloatingCartInfo qty={2} />
//   <Button text={'Button'} disabled={false} />
//   <Button text={'Button'} disabled={true} />
//   <ProductCard data={data} />
//   <CategoryCard data={data[0]} />
//   <CartItem data={data[0]} />
//   <Input type={'text'} error />
//   <Input type={'number'} success />
// </div>
