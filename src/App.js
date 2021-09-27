import { Component } from 'react'
import './App.scss'
import Homepage from './components/pages/Homepage'
import NavBar from './components/organisms/NavBar'
import { INIT_DISPLAY } from './utils/initState'
import Product from './components/pages/Product'
import CommerceAPI from './utils/api/commerce'

const products = new CommerceAPI()

class App extends Component {
  state = {
    display: INIT_DISPLAY,
    productData: [],
  }

  async componentDidMount() {
    products.fetchCommerceApiData().then(
      (res) => {
        if (res && res.res.ok) {
          this.setState({
            productData: res.data,
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

  render() {
    const { display, productData } = this.state
    return (
      <div className='App'>
        {/*NavBar*/}
        <NavBar qty={2} />

        {/*Homepage*/}
        {!display.homepageScreen.length && (
          <Homepage productData={productData} />
        )}

        {<Product data={'Hello World'} />}

        {/*<div className='TestDisplay'>*/}
        {/*  <NavigationLeaf active={true} qty={3} />*/}
        {/*  <NavigationLeaf active={false} qty={0} />*/}
        {/*  <Chip active={true} text={'TextT'} />*/}
        {/*  <Chip active={false} text={'TextF'} />*/}
        {/*  <Badge qty={2} def={true} />*/}
        {/*  <Badge qty={2} def={false} />*/}
        {/*  <FloatingCartInfo qty={2} />*/}
        {/*  <Button text={'Button'} disabled={false} />*/}
        {/*  <Button text={'Button'} disabled={true} />*/}
        {/*  <ProductCard data={data} />*/}
        {/*  <CategoryCard data={data} />*/}
        {/*</div>*/}
        {/*<CartItem data={data} />*/}
        {/*<Input type={'text'} error />*/}
        {/*<Input type={'number'} success />*/}
      </div>
    )
  }
}

export default App
