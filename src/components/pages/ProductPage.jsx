import React, { Component } from 'react'
import ProductImage from './../molecules/ProductImage.jsx'
import Button from './../atoms/Button'
import style from './ProductPage.module.scss'

class ProductPage extends Component {
  state = {
    isInCart: this.props.data.inCart,
  }

  render() {
    const { data, addToCart, closeModal } = this.props
    const { category, name, price, image, desc, id, inCart } = data
    const {isInCart} = this.state
  
    const changeButtonAndAddItemToCart = () => {
      this.setState({isInCart: true})
      addToCart(id, '+')
    }

    return (
      <>
        <div className={style.Container}>
          <ProductImage
            image={image}
            classProp={''}
            addToCart={addToCart}
            id={id}
            disabled={inCart}
          />
          <div className={`${style.ProductContent} 'Center'`}>
            <div className={style.TextContainer}>
              <p className='SmallText'>Category: {category}</p>
              <div className='TitleBold'>{name}</div>
              <div className={`${style.Description} 'BodyText'`} dangerouslySetInnerHTML={{__html: desc}}></div>
              <div className='BodyTextBold Price'>{price}</div>
            </div>
            <div className={style.ButtonContainer}>
              <Button
                text={isInCart ? 'Already in Cart' : 'Add to Cart'}
                disabled={isInCart}
                onClick={changeButtonAndAddItemToCart}
              />
              <Button
                text={'Close'}
                disabled={false}
                onClick={closeModal}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ProductPage
