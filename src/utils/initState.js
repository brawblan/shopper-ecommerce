export const INIT_DISPLAY = {
  homePage: '',
  accountPage: 'none',
  cartPage: 'none',
  shippingPage: 'none',
  paymentPage: 'none',
  confirmationPage: 'none',
  productPage: 'none',
}

export const INIT_NAVBAR = {
  homePage: true,
  accountPage: false,
  cartPage: false,
}

export const INIT_SIGN_IN_STATE = {
  username: '',
  password: '',
  invalidUsername: '',
  invalidPassword: '',
  signedIn: false,
}

export const INIT_CREATE_ACCOUNT = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  zipcode: '',
}

export const INIT_CHECKOUT_DISABLED = {
  signInBtn: true,
  signUpBtn: true,
  cartCheckout: true,
  promoCodeBtn: false,
  shippingCheckout: true,
  paymentCheckout: true,
}

export const INIT_SHIPPING_INFORMATION = {
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
}

export const INIT_PAYMENT_INFORMATION = {
  card: '',
  cardHolder: '',
  expiry: {
    expiryMonth: '',
    expiryYear: '',
  },
  securityCode: '',
}
