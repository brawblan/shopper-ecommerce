import { ErrorMessage } from '../../utils/error-message.class'
import moment from 'moment'

export class PaymentService {
  static cardNumberValidation = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{11,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,]$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    }
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
        if (cardNumber) {
          return cardNumber &&
            /^[1-6]{1}[0-9]{14,15}$/i.test(
              cardNumber.replace(/[^\d]/g, '').trim(),
            )
            ? ''
            : [ErrorMessage.cardNumberError]
        }
      }
    }
    return [ErrorMessage.cardNumberError]
  }

  static onlyTextValidation = (value) => {
    if (value) {
      if (/^[a-z ,.'-]+$/gi.test(value)) {
        return []
      } else {
        return [ErrorMessage.cardHolderError]
      }
    } else {
      return [ErrorMessage.emptyCardHolderError]
    }
  }

  static cardExpireValidation = (value) => {
    if (value) {
      if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
        let today = new Date()
        const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0,
        ).getDate()}`
        let currentDate = moment(new Date(date))
        // let visaValue = value.split('/')
        let visaValue = [value.month, value.year]
        let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0)
        return currentDate < moment(visaDate)
          ? []
          : [ErrorMessage.enterDateError]
      } else {
        return [ErrorMessage.invalidDateError]
      }
    }
  }

  static securityCodeValidation = (min, value) => {
    return value && value.length < min ? [ErrorMessage.securityCodeError] : []
  }
}
