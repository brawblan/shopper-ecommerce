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
      // eslint-disable-next-line no-unused-expressions
      if (item.title === id) item.inCart = true
      return id === item.id
        ? this.setState((prevState) => ({
            cart: [...prevState.cart, { ...item, qty: 1 }],
          }))
        : null
    })
  }

  adjustQty = (id) => {
    this.state.cart.filter((item) => {
      // eslint-disable-next-line no-unused-expressions
      return id === item.id
        ? this.setState((prevState) => ({
            cart: {
              ...prevState.cart,
              ...item,
              qty: item.qty + 1,
            },
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
    const cartLength = cart.length
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
          />
        )}

        {/*components*/}
      </div>
    )
  }
}

export default App
