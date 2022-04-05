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
    shippingInfo: this.props.shippingInformation,
    newShippingInformation: {
      firstName: {
        value: this.props.shippingInformation.firstName ?? '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newShippingInformation: {
              ...prevState.newShippingInformation,
              firstName: {
                ...prevState.newShippingInformation.firstName,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      lastName: {
        value: this.props.shippingInformation.lastName ?? '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newShippingInformation: {
              ...prevState.newShippingInformation,
              lastName: {
                ...prevState.newShippingInformation.lastName,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      address: {
        value: this.props.shippingInformation.address ?? '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newShippingInformation: {
              ...prevState.newShippingInformation,
              address: {
                ...prevState.newShippingInformation.address,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      city: {
        value: this.props.shippingInformation.city ?? '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newShippingInformation: {
              ...prevState.newShippingInformation,
              city: {
                ...prevState.newShippingInformation.city,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      state: {
        value: this.props.shippingInformation.state ?? '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newShippingInformation: {
              ...prevState.newShippingInformation,
              state: {
                ...prevState.newShippingInformation.state,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      zipcode: {
        value: this.props.shippingInformation.zipcode ?? '',
        touched: false,
        onUpdate: (input) => {
          if(input.length <= 5) {
            this.setState((prevState) => ({
              newShippingInformation: {
                ...prevState.newShippingInformation,
                zipcode: {
                  ...prevState.newShippingInformation.zipcode,
                  value: input,
                  touched: true
                }
              }
            }))
          }
        },
        error: [],
      },
    },
    inputHasFocus: ''
  }

  render() {
    const {data, cart, updateState} = this.props
    const { inputHasFocus, newShippingInformation } = this.state
    const { firstName, lastName, address, city, state, zipcode} = newShippingInformation

    const shippingInputObject = [
      {
        type: 'text',
        id: 'firstName',
        label: 'First Name *',
        error: firstName.error,
        value: firstName.value,
      },
      {
        type: 'text',
        id: 'lastName',
        label: 'Last Name *',
        error: lastName.error,
        value: lastName.value,
      },
      {
        type: 'text',
        id: 'address',
        label: 'Address *',
        error: address.error,
        value: address.value,
      },
      {
        type: 'text',
        id: 'city',
        label: 'City *',
        error: city.error,
        value: city.value,
      },
      {
        type: 'select',
        id: 'state',
        label: 'State *',
        error: state.error,
        value: state.value,
      },
      {
        type: 'number',
        id: 'zipcode',
        label: 'Zipcode *',
        error: zipcode.error,
        value: zipcode.value,
        max: '99999'
      },
    ]

    const handleBlur = () => {
      this.setState({inputHasFocus: ''})
    }

    const handleChange = ({ target: { name, value } }) => {
      newShippingInformation[name].onUpdate(value)
    }

    const checkForErrors = (request) => {
      const {firstName, lastName, zipcode, address, city, state} = request

      firstName.error = ShippingService.nameValidation('firstName', firstName.value)
      lastName.error = ShippingService.nameValidation('lastName', lastName.value)
      city.error = ShippingService.nameValidation('city', city.value)
      address.error = ShippingService.addressValidation(address.value)
      state.error = ShippingService.stateValidation(state.value)
      zipcode.error = ShippingService.zipcodeValidation(zipcode.value)
      
      let noErrors = !firstName.error.length && 
                    !lastName.error.length &&
                    !address.error.length &&
                    !city.error.length &&
                    !state.error.length &&
                    !zipcode.error.length

      return noErrors
    }

    const onEnterShipping = () => {
      const formHasErrors = checkForErrors(newShippingInformation)
      if(!formHasErrors) {
        this.setState({inputHasFocus: ''})
        return
      }

      const shippingInformation = ShippingService.createShippingObject(newShippingInformation)
      updateState('shippingDisplay', false)
      updateState('paymentDisplay', true)
      updateState('shippingInformation', shippingInformation)
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
                disabled={true}
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