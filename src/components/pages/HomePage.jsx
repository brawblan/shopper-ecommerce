import React, { Component } from 'react'
import style from './Homepage.module.scss'
import ProductContainer from '../organisms/ProductContainer'
import CategoryContainer from '../organisms/CategoryContainer'
import Input from './../molecules/Input.jsx'

class HomePage extends Component {
  state = {
    category: 'All',
    plantSearch: ''
  }

  updateCategoryView = ({ target: { innerHTML } }) => {
    innerHTML &&
      !innerHTML.includes('img') &&
      this.setState({ category: innerHTML })
  }

  searchPlants = ({target: {value}}) => {
    this.setState({ plantSearch: value})
  }

  render() {
    const {isLoading, productData, addToCart, selectProduct, cartDisplay, productCardDisplay, shippingDisplay, paymentDisplay, confirmationDisplay } = this.props
    const { category, plantSearch } = this.state

    return (
      <div className={`${style.Container} ${(isLoading || cartDisplay || productCardDisplay || shippingDisplay || paymentDisplay || confirmationDisplay) ? style.blurred : ''}`}>
        <div className={style.HomepageIntro} />
        <CategoryContainer
          data={productData}
          categoryDisplay={category}
          onClick={this.updateCategoryView}
        />
        <div className={style.SearchInput}>
          Search
          <Input type="text" onChange={this.searchPlants} />
        </div>
        <ProductContainer
          data={productData}
          categoryDisplay={category}
          addToCart={addToCart}
          selectProduct={selectProduct}
          searchInput={plantSearch}
        />
      </div>
    )
  }
}

export default HomePage
