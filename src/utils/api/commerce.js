const COMMERCE_URL = 'https://api.chec.io/v1/products'
const url = process.env.REACT_APP_CHEC_PUBLIC_KEY
const apiHeaders = {
  'Content-Type': 'application/json',
  'X-Authorization': 'pk_test_33918c53bbd1ba27f0befe0a2e5370ecbedf6d87c3913',
  'Access-Control-Allow-Origin': '*'
}

class CommerceAPI {
  async fetchCommerceApiData() {
    localStorage.clear()
    return new Promise(async (success, failure) => {
      try {
        const res = await fetch(`${COMMERCE_URL}`, {
          headers: apiHeaders,
        })
        if (res.ok) {
          const json = await res.json()
          const data = json.data.map((item) => {

            return {
              id: item.id,
              desc: item.description,
              image: item.media.source,
              name: item.name,
              price: item.price.formatted_with_symbol,
              category: item.categories[0].name,
              available: item.inventory.available,
              inCart: false,
            }
          })
          success({ res, data })
        } else {
          failure({ error: 'Invalid http request' })
        }
      } catch (error) {
        failure(error)
      }
    })
  }
}

export default CommerceAPI
