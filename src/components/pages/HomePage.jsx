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
    const { productData, addToCart } = this.props
    const { category } = this.state

    return (
      <div className={style.Container}>
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
        />
      </div>
    )
  }
}

export default HomePage
