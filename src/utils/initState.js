import CommerceAPI from '../utils/api/commerce'
const products = new CommerceAPI()
export const INIT_PRODUCT_DATA = products.fetchCommerceApiData().then(
  (res) => {
    if (res && res.res.ok) {
      return res.data
    } else {
      return 'error'
    }
  },
  (error) => {
    console.log(error)
  },
)

export const INIT_DISPLAY = {
  homepageScreen: '',
  shippingScreen: 'none',
  paymentScreen: 'none',
  confirmationScreen: 'none',
}
