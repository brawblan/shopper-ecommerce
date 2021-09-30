import React, { Component } from 'react'
import style from './Homepage.module.scss'
import ProductContainer from '../organisms/ProductContainer'
import CategoryContainer from '../organisms/CategoryContainer'

class Homepage extends Component {
  state = {
    category: 'All',
  }

  updateCategoryView = ({ target: { innerHTML } }) => {
    innerHTML &&
      !innerHTML.includes('img') &&
      this.setState({ category: innerHTML })
  }

  randomBackground = (max) => Math.round(Math.random() * max)

  render() {
    const { productData } = this.props
    const { category } = this.state

    return (
      <div className={style.Container}>
        <div className={style.HomepageIntro} />
        <CategoryContainer
          data={productData}
          background={this.randomBackground(4)}
          categoryDisplay={category}
          onClick={this.updateCategoryView}
        />
        <ProductContainer
          data={productData}
          categoryDisplay={category}
          background={this.randomBackground}
        />
      </div>
    )
  }
}

export default Homepage
