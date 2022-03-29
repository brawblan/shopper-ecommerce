import { users } from '../../utils/users'
import { ErrorMessage } from '../../utils/error-message.class'

export class CreateAccountService {
  static userExists = (entryEmail) => {
    if (users.some(({ username }) => username === entryEmail)) {
      return [ErrorMessage.emailAlreadyInUseError]
    }
    return []
  }

  static validateEmail = (val) => {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        val,
      )
    ) {
      return [ErrorMessage.invalidEmail]
    }
    return []
    // this.userExists(val)
  }

  static validatePassword = (password, bool, confirmPassword) => {
    if (bool) {
      if (!password.length) {
        return [ErrorMessage.passwordCreationError]
      }
      if (password.length) {
        if (
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/.test(
            password,
          )
        ) {
          return []
        }
        return [ErrorMessage.passwordCreationError]
      }
    } else if (!bool) {
      if (!confirmPassword.length || password !== confirmPassword) {
        return [ErrorMessage.passwordMatchError]
      }
      return []
    }
  }

  static validateName = (name, type) => {
    if (type === 'state') {
      if (name === 'List of States') {
        return [ErrorMessage.stateSelectionError]
      }
    }
    if (/\b[A-Za-z][A-Za-z]+$/g.test(name)) {
      return []
    }
    return [`Please enter your ${type}. There can be no numbers`]
  }

  static createUserObject = (userData) => {
    const { firstName, lastName, password, email, city, state, zipcode } =
      userData
    const payload = {
      username: firstName.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      email: email.value,
      city: city.value,
      state: state.value.toUpperCase(),
      zipcode: zipcode.value,
    }

    return payload
  }
}
