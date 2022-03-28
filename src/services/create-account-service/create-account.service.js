import { users } from '../../utils/users'
import { ErrorMessage } from '../../utils/error-message.class'

export class CreateAccountService {
  static userExists = (entryEmail) => {
    if (users.some(({ username }) => username === entryEmail)) {
      return [ErrorMessage.emailAlreadyInUseError]
    }
    return ''
  }

  static validateEmail = (val) => {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        val,
      )
    ) {
      return [ErrorMessage.invalidEmail]
    }
    this.userExists(val)
  }

  static validatePassword = (password, bool) => {
    if (bool) {
      if (!password.length) {
        return [ErrorMessage.passwordError]
      }
      if (password.length) {
        if (
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/.test(
            password,
          )
        ) {
          return ''
        }
        return [ErrorMessage.passwordError]
      }
    } else if (!bool) {
      if (!password.length) {
        return [ErrorMessage.passwordMatchError]
      }
      return ''
    }
  }

  static checkPasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return 'Passwords do not match'
    }
    return ''
  }

  static validateName = (name, type) => {
    if (/\b[A-Za-z][A-Za-z]+$/g.test(name)) {
      return ''
    }
    return `Please enter your ${type}. There can be no numbers`
  }
}
