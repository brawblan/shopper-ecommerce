import React, { Component } from 'react'
import CartItem from '../organisms/CartItem'
import Input from './../molecules/Input.jsx'
import CartInformation from '../organisms/CartInformation'
import BackArrowButton from '../molecules/BackArrowButton'
import style from './ShippingPage.module.scss'
import CartItemBtnPlus from '../molecules/CartItemBtnPlus'
import {ErrorMessage} from '../../utils/error-message.class'

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
    shippingInfo: {},
    formHasErrors: false,
  }

  render() {
    const {data, cart, updateState} = this.props
    const { shippingInfo, shippingInputError } = this.state
    
    // const closeModal = () => {
    //   updateState('shippingDisplay', false)
    // }

    const shippingInputObject = [
      {
        type: 'text',
        id: 'firstName',
        label: 'First Name *',
        error: shippingInputError.firstName,
        value: '',
      },
      {
        type: 'text',
        id: 'surname',
        label: 'Last Name *',
        error: shippingInputError.lastName,
        value: '',
      },
      {
        type: 'text',
        id: 'address',
        label: 'Address *',
        error: shippingInputError.address,
        value: '',
      },
      {
        type: 'text',
        id: 'city',
        label: 'City *',
        error: shippingInputError.city,
        value: '',
      },
      {
        type: 'text',
        id: 'state',
        label: 'State *',
        error: shippingInputError.state,
        value: '',
      },
      {
        type: 'text',
        id: 'zipcode',
        label: 'Zipcode *',
        error: shippingInputError.zipcode,
        value: '',
      },
    ]

    const handleChange = ({ target: { name, value } }) => {
      if (name !== 'postcode') {
        this.setState((prevState) => ({ 
          shippingInfo: {
            ...prevState.shippingInfo,
            [name]: value
          }
        }))
      } else if (name === 'postcode') {
        if (value.length <= 5) {
          this.setState((prevState) => ({ 
            shippingInfo: {
              ...prevState.shippingInfo,
              [name]: value
            }
          }))
        }
      }
      checkForErrors(shippingInfo)
    }

    const checkForErrors = (request) => {
      const {firstName, surname, zipcode} = request

      shippingInputError.firstName = firstName.length ? [] : [ErrorMessage.firstNameError]
      shippingInputError.lastName = surname.length ? [] : [ErrorMessage.surnameError]
      shippingInputError.zipcode = zipcode.length <= 5 ? [] : [ErrorMessage.postcodeError]
      
      let noErrors = !shippingInputError.firstName.length && 
                    !shippingInputError.lastName.length &&
                    !shippingInputError.zipcode.length
      this.setState({formHasErrors: noErrors})
    }

    const onCheckout = () => {
      updateState('shippingDisplay', false)
      updateState('paymentDisplay', true)
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
                      // className={
                      //   item.type === 'submit'
                      //     ? isDisabled.signUpBtn
                      //       ? style.DisabledBtn
                      //       : style.CheckoutBtn
                      //     : style.InputBox
                      // }
                      type={item.type}
                      key={item.id}
                      id={item.id}
                      name={item.id}
                      value={item.value}
                      // disabled={
                      //   item.type === 'submit' ? isDisabled.signUpBtn : false
                      // }
                      onChange={handleChange}
                      onBlur={handleChange}
                      autoComplete='none'
                    />
                  <div className={style.Error}>{item.error}</div>
                </div>
              ))}
            </div>
            <div className={style.CartInformationContainer}>
              <CartInformation
                cartInfo={data}
                onCheckout={onCheckout}
                buttonText={'Shipping'}
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