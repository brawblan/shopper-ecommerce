import React, { Component } from 'react'
import style from './Homepage.module.scss'
import ProductContainer from '../organisms/ProductContainer'
import CategoryContainer from '../organisms/CategoryContainer'

class HomePage extends Component {
  state = {
    category: 'All',
  }

  updateCategoryView = ({ target: { innerHTML } }) => {
    innerHTML &&
      !innerHTML.includes('img') &&
      this.setState({ category: innerHTML })
  }

  render() {
    const { productData, addToCart, selectProduct, cartDisplay, productCardDisplay, shippingDisplay, paymentDisplay } = this.props
    const { category } = this.state

    return (
      <div className={`${style.Container} ${(cartDisplay || productCardDisplay || shippingDisplay || paymentDisplay) ? style.blurred : ''}`}>
        <div className={style.HomepageIntro} />
        <CategoryContainer
          data={productData}
          categoryDisplay={category}
          onClick={this.updateCategoryView}
        />
        <ProductContainer
          data={productData}
          categoryDisplay={category}
          addToCart={addToCart}
          selectProduct={selectProduct}
        />
      </div>
    )
  }
}

export default HomePage
