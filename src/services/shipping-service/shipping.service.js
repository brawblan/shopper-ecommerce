import { ErrorMessage } from '../../utils/error-message.class'

export class ShippingService {
  static nameValidation = (name, value) => {
    if (!value.length) {
      if (name === 'firstName') return [ErrorMessage.firstNameError]
      if (name === 'lastName') return [ErrorMessage.lastNameError]
      if (name === 'city') return [ErrorMessage.cityError]
    }

    return ''
  }

  static addressValidation = (value) => {
    if (value) {
      if (/\d(\s\w+){2,}/i.test(value)) {
        return ''
      } else {
        return [ErrorMessage.addressError]
      }
    } else {
      return [ErrorMessage.addressError]
    }
  }

  static stateValidation = (value) => {
    if (!value.length) {
      return [ErrorMessage.stateSelectionError]
    } else if (value === 'List of States') {
      console.log(value);
      return [ErrorMessage.stateSelectionError]
    }
    return ''
  }

  static zipcodeValidation = (value) => {
    if (value.length !== 5) {
      return [ErrorMessage.zipcodeError]
    }
    return ''
  }

  static createShippingObject = (request) => {
    const {firstName, lastName, zipcode, address, city, state} = request
    const payload = {
      firstName: firstName.value, 
      lastName: lastName.value,
      zipcode: zipcode.value,
      address: address.value, 
      city: city.value,
      state: state.value
    }

    return payload
  }
}
