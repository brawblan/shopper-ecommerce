import React, { Component } from 'react'
import CartItem from '../organisms/CartItem'
import Input from './../molecules/Input.jsx'
import CartInformation from '../organisms/CartInformation'
import BackArrowButton from '../molecules/BackArrowButton'
import style from './PaymentPage.module.scss'
import CartItemBtnPlus from '../molecules/CartItemBtnPlus'
import {PaymentService} from '../../services/payment-service/payment.service'
import ShippingInfo from '../organisms/ShippingInfo'
import '../../App.scss'

class PaymentPage extends Component {
  state = {
    paymentInputError: {
      cardError: [],
      cardHolderError: [],
      expiryError: [],
      securityCodeError: []
    },
    paymentInfo: this.props.paymentInformation,
    formHasErrors: false,
    inputHasFocus: ''
  }

  render() {
    const {data, cart, shippingInformation, paymentInformation, updateState} = this.props
    const { paymentInfo, paymentInputError, formHasErrors, inputHasFocus } = this.state

    const paymentInputObject = [
      {
        label: 'Card Number',
        name: 'card',
        value: paymentInfo.card,
        id: 'card',
        type: 'text',
        error: paymentInputError.cardError,
      },
      {
        label: "CardHolder's Name",
        name: 'cardHolder',
        value: paymentInfo.cardHolder,
        id: 'cardHolder',
        type: 'text',
        error: paymentInputError.cardHolderError,
      },
      {
        label: 'Expiry Date (MM/YY)',
        name: 'expiry',
        value: paymentInfo.expiry,
        id: 'expiry',
        type: 'expiryDate',
        error: paymentInputError.expiryError,
      },
      {
        label: 'Security Code',
        name: 'securityCode',
        value: paymentInfo.securityCode,
        id: 'securityCode',
        type: 'number',
        error: paymentInputError.securityCodeError,
      },
    ]

    const handleCCInputData = ({ target: { name, value } }) => {
      if (value.match(/\d/gi) && value.length && value.length <= 19) {
        if (name === 'card') {
          let mask = value.split(' ').join('')
          if (mask.length) {
            mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ')
            this.setState((prevState) => ({
              paymentInfo: {
                ...prevState.paymentInfo,
                [name]: mask,
              },
            }))
          } else {
            this.setState((prevState) => ({
              paymentInfo: {
                ...prevState.paymentInfo,
                [name]: '',
              },
            }))
          }
        } else {
          this.setState((prevState) => ({
            paymentInfo: {
              ...prevState.paymentInfo,
              [name]: value,
            },
          }))
        }
      } else if (value.length <= 19) {
        this.setState((prevState) => ({
          paymentInfo: {
            ...prevState.paymentInfo,
            [name]: value,
          },
        }))
      }
    }

    const checkForErrors = (request) => {
      const {card, cardHolder, expiry, securityCode} = request

      paymentInputError.cardError = PaymentService.cardNumberValidation(card)
      paymentInputError.cardHolderError = PaymentService.onlyTextValidation(cardHolder)
      paymentInputError.expiryError = PaymentService.cardExpireValidation(expiry)
      paymentInputError.securityCodeError = PaymentService.securityCodeValidation(3, securityCode)
      
      let noErrors = !paymentInputError.cardError.length && 
                    !paymentInputError.cardHolderError.length &&
                    !paymentInputError.expiryError.length &&
                    !paymentInputError.securityCodeError.length
      this.setState({formHasErrors: noErrors})
    }

    const handleChange = ({ target: { name, value } }) => {
      if(name === 'expiryMonth') {
        this.setState((prevState) => ({ 
          paymentInfo: {
            ...prevState.paymentInfo,
            expiry: {
              ...prevState.paymentInfo.expiry,
              month: value
            }
          }
        }))
        checkForErrors(paymentInfo)
      } else if(name === 'expiryYear') {
        this.setState((prevState) => ({ 
          paymentInfo: {
            ...prevState.paymentInfo,
            expiry: {
              ...prevState.paymentInfo.expiry,
              year: value
            }
          }
        }))
        checkForErrors(paymentInfo)
      } else {
        this.setState((prevState) => ({ 
          paymentInfo: {
            ...prevState.paymentInfo,
            [name]: value
          }
        }))
        checkForErrors(paymentInfo)
      }
      
      checkForErrors(paymentInfo)
    }

    const onEnterPayment = () => {
      updateState('paymentDisplay', false)
      updateState('confirmationDisplay', true)
      updateState('paymentInformation', paymentInfo)
    }
    
    const onBackArrow = () => {
      updateState('paymentDisplay', false)
      updateState('shippingDisplay', true)
    }
    
    const closeModal = () => {
      updateState('paymentDisplay', false)
    }

    return (
        <div className={style.Container}>
          <div className={style.HeaderContainer}>
            <BackArrowButton 
              className={style.CartItemBtn} 
              onBack={onBackArrow}
            />
            <h2>Payment Information</h2>
            <div className={style.ExitButton}>
              <CartItemBtnPlus
                  adjustQty={closeModal}
                />
            </div>
          </div>
          <div className={style.FormContainer}>
            <div className={style.InputContainer}>
              {paymentInputObject.map((item) => (
                <div className={style.InputForm} key={item.id}>
                  <label form={item.id}>{item.label}</label>
                    <Input
                      type={item.type}
                      key={item.id}
                      id={item.id}
                      name={item.id}
                      inputHasFocus={inputHasFocus}
                      value={item.value}
                      max={item.max}
                      onChange={
                        item.name === 'card'
                          ? handleCCInputData
                          : handleChange
                      }
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
                onCheckout={onEnterPayment}
                buttonText={'Payment'}
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
              <ShippingInfo 
                shippingInformation={shippingInformation}
              />
            </div>
          </div>

        </div>
    )
  }
}

export default PaymentPage