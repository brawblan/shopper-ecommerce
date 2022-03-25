import React, { Component } from 'react'
import CartItem from '../organisms/CartItem'
import Input from './../molecules/Input.jsx'
import CartInformation from '../organisms/CartInformation'
import BackArrowButton from '../molecules/BackArrowButton'
import style from './ShippingPage.module.scss'
import CartItemBtnPlus from '../molecules/CartItemBtnPlus'
import {ShippingService} from '../../services/shipping-service/shipping.service'
import '../../App.scss'

class ShippingPage extends Component {
  state = {
    shippingInputError: {
      firstName: [],
      lastName: [],
      address: [],
      city: [],
      state: [],
      zipcode: []
    },
    shippingInfo: this.props.shippingInformation,
    formHasErrors: false,
    inputHasFocus: ''
  }

  render() {
    const {data, cart, updateState} = this.props
    const { shippingInfo, shippingInputError, formHasErrors, inputHasFocus } = this.state

    const shippingInputObject = [
      {
        type: 'text',
        id: 'firstName',
        label: 'First Name *',
        error: shippingInputError.firstName,
        value: shippingInfo.firstName,
      },
      {
        type: 'text',
        id: 'lastName',
        label: 'Last Name *',
        error: shippingInputError.lastName,
        value: shippingInfo.lastName,
      },
      {
        type: 'text',
        id: 'address',
        label: 'Address *',
        error: shippingInputError.address,
        value: shippingInfo.address,
      },
      {
        type: 'text',
        id: 'city',
        label: 'City *',
        error: shippingInputError.city,
        value: shippingInfo.city,
      },
      {
        type: 'select',
        id: 'state',
        label: 'State *',
        error: shippingInputError.state,
        value: shippingInfo.state,
      },
      {
        type: 'number',
        id: 'zipcode',
        label: 'Zipcode *',
        error: shippingInputError.zipcode,
        value: shippingInfo.zipcode,
        max: '99999'
      },
    ]

    const handleBlur = (e) => {
      handleChange(e)
      this.setState({inputHasFocus: ''})
    }

    const handleChange = ({ target: { name, value } }) => {
      if (name === 'zipcode' && value.length <= 5) {
        this.setState((prevState) => ({
          shippingInfo: {
            ...prevState.shippingInfo,
            [name]: value.toUpperCase()
          }
        }))
      } else if (name !== 'zipcode') {
        this.setState((prevState) => ({ 
          shippingInfo: {
            ...prevState.shippingInfo,
            [name]: value.toUpperCase()
          }
        }))
      }
      
      checkForErrors(shippingInfo)
    }

    const checkForErrors = (request) => {
      const {firstName, lastName, zipcode, address, city, state} = request

      shippingInputError.firstName = ShippingService.nameValidation('firstName', firstName)
      shippingInputError.lastName = ShippingService.nameValidation('lastName', lastName)
      shippingInputError.city = ShippingService.nameValidation('city', city)
      shippingInputError.address = ShippingService.addressValidation(address)
      shippingInputError.state = ShippingService.stateValidation(state)
      shippingInputError.zipcode = ShippingService.zipcodeValidation(zipcode)
      
      let noErrors = !shippingInputError.firstName.length && 
                    !shippingInputError.lastName.length &&
                    !shippingInputError.address.length &&
                    !shippingInputError.city.length &&
                    !shippingInputError.zipcode.length
      this.setState({formHasErrors: noErrors})
    }

    const onEnterShipping = () => {
      updateState('shippingDisplay', false)
      updateState('paymentDisplay', true)
      updateState('shippingInformation', shippingInfo)
    }
    
    const onBackArrow = () => {
      updateState('shippingDisplay', false)
      updateState('cartDisplay', true)
    }
    
    const closeModal = () => {
      updateState('shippingDisplay', false)
    }

    return (
        <div className={style.Container}>
          <div className={style.HeaderContainer}>
            <BackArrowButton 
              className={style.CartItemBtn} 
              onBack={onBackArrow}
            />
            <h2>Shipping Information</h2>
            <div className={style.ExitButton}>
              <CartItemBtnPlus
                  adjustQty={closeModal}
                />
            </div>
          </div>
          <div className={style.FormContainer}>
            <div className={style.InputContainer}>
              {shippingInputObject.map((item) => (
                <div className={style.InputForm} key={item.id}>
                  <label form={item.id}>{item.label}</label>
                    <Input
                      type={item.type}
                      key={item.id}
                      id={item.id}
                      name={item.id}
                      value={item.value}
                      inputHasFocus={inputHasFocus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete='none'
                      max={item.max}
                    />
                  <div className={style.Error}>{item.error}</div>
                </div>
              ))}
            </div>
            <div className={style.CartInformationContainer}>
              <CartInformation
                cartInfo={data}
                onCheckout={onEnterShipping}
                buttonText={'Shipping'}
                disabled={formHasErrors}
              />
              <div>
                {cart.map((item) => (
                  <CartItem
                    data={item}
                    adjustQty={false}
                    deleteFromCart={false}
                    key={item.id}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
    )
  }
}

export default ShippingPage