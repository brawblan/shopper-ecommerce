import React, { Component } from 'react'
import CartItemBtnPlus from '../molecules/CartItemBtnPlus'
import BackArrowButton from '../molecules/BackArrowButton'
import style from './PaymentPage.module.scss'

class ShippingPage extends Component {
  state = {
    formHasErrors: false,
  }

  render() {
    const {updateState} = this.props
    // const { shippingInfo, shippingInputError } = this.state
    
    // const closeModal = () => {
    //   updateState('shippingDisplay', false)
    // }

    // const shippingInputObject = [
    //   {
    //     type: 'text',
    //     id: 'firstName',
    //     label: 'First Name *',
    //     error: shippingInputError.firstName,
    //     value: '',
    //   },
    //   {
    //     type: 'text',
    //     id: 'surname',
    //     label: 'Last Name *',
    //     error: shippingInputError.lastName,
    //     value: '',
    //   },
    //   {
    //     type: 'text',
    //     id: 'address',
    //     label: 'Address *',
    //     error: shippingInputError.address,
    //     value: '',
    //   },
    //   {
    //     type: 'text',
    //     id: 'city',
    //     label: 'City *',
    //     error: shippingInputError.city,
    //     value: '',
    //   },
    //   {
    //     type: 'text',
    //     id: 'state',
    //     label: 'State *',
    //     error: shippingInputError.state,
    //     value: '',
    //   },
    //   {
    //     type: 'text',
    //     id: 'zipcode',
    //     label: 'Zipcode *',
    //     error: shippingInputError.zipcode,
    //     value: '',
    //   },
    // ]

    // const handleChange = ({ target: { name, value } }) => {
    //   if (name !== 'postcode') {
    //     this.setState((prevState) => ({ 
    //       shippingInfo: {
    //         ...prevState.shippingInfo,
    //         [name]: value
    //       }
    //     }))
    //   } else if (name === 'postcode') {
    //     if (value.length <= 5) {
    //       this.setState((prevState) => ({ 
    //         shippingInfo: {
    //           ...prevState.shippingInfo,
    //           [name]: value
    //         }
    //       }))
    //     }
    //   }
    //   checkForErrors(shippingInfo)
    // }

    // const checkForErrors = (request) => {
    //   const {firstName, surname, zipcode} = request

    //   shippingInputError.firstName = firstName.length ? [] : [ErrorMessage.firstNameError]
    //   shippingInputError.lastName = surname.length ? [] : [ErrorMessage.surnameError]
    //   shippingInputError.zipcode = zipcode.length <= 5 ? [] : [ErrorMessage.postcodeError]
      
    //   let noErrors = !shippingInputError.firstName.length && 
    //                 !shippingInputError.lastName.length &&
    //                 !shippingInputError.zipcode.length
    //   this.setState({formHasErrors: noErrors})
    // }

    // const onCheckout = () => {
    //   updateState('shippingDisplay', false)
    // }
    
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
      </div>
    )
  }
}

export default ShippingPage