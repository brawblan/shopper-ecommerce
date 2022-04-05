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
    newCardInformation: {
      card: {
        value: '',
        touched: false,
        onUpdate: (input) => {
          if (input.match(/\d/gi) && input.length && input.length <= 19) {
            let mask = input.split(' ').join('')
            if (mask.length) {
              mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ')
              this.setState((prevState) => ({
                newCardInformation: {
                  ...prevState.newCardInformation,
                  card: {
                    ...prevState.newCardInformation.card,
                    value: mask,
                    touched: true
                  }
                }
              }))
            } else {
              this.setState((prevState) => ({
                newCardInformation: {
                  ...prevState.newCardInformation,
                  card: {
                    ...prevState.newCardInformation.card,
                    value: '',
                    touched: true
                  }
                }
              }))
            }
          } else if (input.length <= 19) {
            this.setState((prevState) => ({
              newCardInformation: {
                ...prevState.newCardInformation,
                card: {
                  ...prevState.newCardInformation.card,
                  value: input,
                  touched: true
                }
              }
            }))
          }
        },
        error: [],
      },
      cardHolder: {
        value: '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newCardInformation: {
              ...prevState.newCardInformation,
              cardHolder: {
                ...prevState.newCardInformation.cardHolder,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      expiry: {
        value: {
          expiryMonth: '',
          expiryYear: ''
        },
        touched: false,
        onUpdate: (type, input) => {
          this.setState((prevState) => ({
            newCardInformation: {
              ...prevState.newCardInformation,
              expiry: {
                ...prevState.newCardInformation.expiry,
                value: {
                  ...prevState.newCardInformation.expiry.value,
                  [type]: input
                },
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      securityCode: {
        value: '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newCardInformation: {
              ...prevState.newCardInformation,
              securityCode: {
                ...prevState.newCardInformation.securityCode,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      }
    },
    inputHasFocus: ''
  }

  render() {
    const {data, cart, shippingInformation, updateState} = this.props
    const { newCardInformation, inputHasFocus } = this.state
    const {card, cardHolder, expiry, securityCode} = newCardInformation

    const paymentInputObject = [
      {
        label: 'Card Number',
        name: 'card',
        value: card.value,
        id: 'card',
        type: 'text',
        error: card.error,
      },
      {
        label: "CardHolder's Name",
        name: 'cardHolder',
        value: cardHolder.value,
        id: 'cardHolder',
        type: 'text',
        error: cardHolder.error,
      },
      {
        label: 'Expiry Date (MM/YY)',
        name: 'expiry',
        value: expiry.value,
        id: 'expiry',
        type: 'expiryDate',
        error: expiry.error,
      },
      {
        label: 'Security Code',
        name: 'securityCode',
        value: securityCode.value,
        id: 'securityCode',
        type: 'number',
        error: securityCode.error,
      },
    ]

    const checkForErrors = (request) => {
      const {card, cardHolder, expiry, securityCode} = request

      card.error = PaymentService.cardNumberValidation(card.value)
      cardHolder.error = PaymentService.onlyTextValidation(cardHolder.value)
      expiry.error = PaymentService.cardExpireValidation(expiry.value)
      securityCode.error = PaymentService.securityCodeValidation(3, securityCode.value)
      
      let noErrors = !card.error.length && 
                    !cardHolder.error.length &&
                    !expiry.error.length &&
                    !securityCode.error.length
      
      return noErrors
    }

    const handleBlur = () => {
      this.setState({inputHasFocus: ''})
    }
    
    const handleChange = ({ target: { name, value } }) => {
      if(name === 'expiryMonth') {
        expiry.onUpdate(name, value)
      } else if(name === 'expiryYear') {
        expiry.onUpdate(name, value)
      } else {
        newCardInformation[name].onUpdate(value)
      }
    }
    
    const onEnterPayment = () => {
      const formHasErrors = checkForErrors(newCardInformation)
      if(!formHasErrors) {
        this.setState({inputHasFocus: ''})
        return
      }

      const cardInformation = PaymentService.createPaymentObject(newCardInformation)
      updateState('paymentDisplay', false)
      updateState('confirmationDisplay', true)
      updateState('paymentInformation', cardInformation)
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
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                disabled={true}
              />
              {cart.map((item) => (
                <CartItem
                  data={item}
                  adjustQty={false}
                  deleteFromCart={false}
                  key={item.id}
                />
              ))}
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