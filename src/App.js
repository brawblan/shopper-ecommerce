import { Component } from 'react'
import './App.scss'
import HomePage from './components/pages/HomePage'
import NavBar from './components/organisms/NavBar'
import { INIT_DISPLAY, INIT_NAVBAR } from './utils/initState'
import ProductPage from './components/pages/ProductPage'
import CommerceAPI from './utils/api/commerce'
import AccountPage from './components/pages/AccountPage'
import CartPage from './components/pages/CartPage'

const products = new CommerceAPI()

class App extends Component {
  state = {
    display: INIT_DISPLAY,
    productData: [],
    navBarActiveButton: INIT_NAVBAR,
    cart: [],
    cartDisplay: false,
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
        {!display.accountPage.length && <AccountPage data={productData} />}

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
