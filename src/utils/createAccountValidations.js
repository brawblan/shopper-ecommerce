import { users } from './users'

export const userExists = (entryEmail) => {
  if (users.some(({ username }) => username === entryEmail)) {
    return 'This email is already in use. Please use another email.'
  }
}

export const validateEmail = (val) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      val,
    )
  ) {
    return ''
  }
  return 'Invalid email address'
}

export const validatePassword = (password, bool) => {
  if (bool) {
    if (!password.length) {
      return 'Password must be 8-20 characters, including: at least one capital letter, at least one lowercase letter, one number, and one special character - ! @ # $ % ^ & ( ) _ +'
    }
    if (password.length) {
      if (
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/.test(
          password,
        )
      ) {
        return ''
      }
      return 'Password must be 8-20 characters, including: at least one capital letter, at least one lowercase letter, one number, and one special character - ! @ # $ % ^ & ( ) _ +'
    }
  } else if (!bool) {
    if (!password.length) {
      return 'Please match password above'
    }
    return ''
  }
}

export const checkPasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match'
  }
  return ''
}

export const validateName = (name, type) => {
  if (/\b[A-Za-z][A-Za-z]+$/g.test(name)) {
    return ''
  }
  return `Please enter your ${type}. There can be no numbers`
}
