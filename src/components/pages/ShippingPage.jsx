import React, { Component } from 'react'
import Button from './../atoms/Button'
import style from './ShippingPage.module.scss'

class ShippingPage extends Component {
  render() {
    const {updateState} = this.props
    const closeModal = () => {
      updateState('shippingDisplay', false)
    }

    return (
        <div className={style.Container}>          
            <Button
              text={'Checkout'}
              disabled={false}
              width={10}
              onClick={closeModal}
            />
        </div>
    )
  }
}

export default ShippingPage