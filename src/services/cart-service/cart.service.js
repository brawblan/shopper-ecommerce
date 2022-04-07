export class CartService {
  static getSubTotal = (data) => {
    const subtotal = data.reduce((acc, { price, qty }) => {
      return acc + price * qty
    }, 0)
    return subtotal.toFixed(2)
  }

  static getTaxes = (subtotal) => {
    const localTax = 0.085
    const taxes = Math.ceil(subtotal * localTax * 100) / 100
    return taxes.toFixed(2)
  }

  static getTotal = (subtotal, taxes) => {
    const total = subtotal + taxes
    return total.toFixed(2)
  }

  static getPriceAsNumber = (price) => {
    const purifiedPrice = price.replace(/[$]/g, '')
    return Number(purifiedPrice)
  }

  static createCartPriceInfo = (data) => {
    const newData = data.map(({ id, price, qty }) => {
      const purifiedPrice = this.getPriceAsNumber(price)
      return { id, price: purifiedPrice, qty }
    })

    return newData
  }
}
