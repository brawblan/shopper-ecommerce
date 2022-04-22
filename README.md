# [Devslopes Web Academy: Module 11 Shopper App eCommerce API](https://bb-shopper-ecommerce.netlify.app){:target="_blank"}

## UI Created BY:
This UI was found using the FIGMA community search.
It was created by Harum Shidiqi. You can find more of his work on his [portfolio](https://nohan.studio/#intro){:target="_blank"}

## Tech Used:
![HTML5](https://camo.githubusercontent.com/d63d473e728e20a286d22bb2226a7bf45a2b9ac6c72c59c0e61e9730bfe4168c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f48544d4c352d4533344632363f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465)
![CSS3](https://camo.githubusercontent.com/3a0f693cfa032ea4404e8e02d485599bd0d192282b921026e89d271aaa3d7565/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f435353332d3135373242363f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465)
![SASS](https://camo.githubusercontent.com/8849f369ac031cc842a4ab4248c7f7db6a4b593cad1f2d1c01d3aeb6f0f8dca7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f536173732d4343363639393f7374796c653d666f722d7468652d6261646765266c6f676f3d73617373266c6f676f436f6c6f723d7768697465)
![JavaScript](https://camo.githubusercontent.com/93c855ae825c1757f3426f05a05f4949d3b786c5b22d0edb53143a9e8f8499f6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d3332333333303f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d463744463145)
![ReactJS](https://camo.githubusercontent.com/268ac512e333b69600eb9773a8f80b7a251f4d6149642a50a551d4798183d621/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642)
![Netlify](https://camo.githubusercontent.com/92dde1e7c42c013a5fce4dfeee0843f06710bfd38a610885e33a273c7eca0d22/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e65746c6966792d3030433742373f7374796c653d666f722d7468652d6261646765266c6f676f3d6e65746c696679266c6f676f436f6c6f723d7768697465)
![NPM](https://camo.githubusercontent.com/55037e0ff8e2c9df84ad631c3d0443a7316776ede7459a5872ccb336d7df2781/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e706d2d4342333833373f7374796c653d666f722d7468652d6261646765266c6f676f3d6e706d266c6f676f436f6c6f723d7768697465)

## Requirements
You are going to build a full-stack project. This is a critical portfolio piece that will help you land your first freelance projects and ultimately a full-time job.
Shopper is a full-stack application that is similar to Amazon.com.
You can use the interface and code you created in the Code Commerce app or you can build this all from scratch.

### Front-end
- Build a homepage that shows product images, titles, and prices
- Each item should have an Add to Cart button
- There should be a navigation bar with a cart icon
- The cart icon should update based on how many items are in it (ie 3, 5, 10)
- Menu item for Login/Signup
- User can sign up and log in
- Each item should have a details page that has an Image, Title, Description, and price. - A user can add to the cart as well as change the quantity.
- All images in this project should be cached locally so they aren't downloaded each time

### Back-end
#### For the backend, you will use the open-source Node API CommerceJS
- Get started HERE (Follow the 3 steps in Account Setup)
- From your Dashboard you will need to:
- 1). Create 5 different product categories
- 2). Create 5 different products in each of those categories
- Each product needs an image, title, description, quantity and price
- Note: You are using this pre-built back-end API to give your front-end the data you need. You should not have to write any backend code.

### Full-Stack
- You must get your front-end to "talk" to the CommerceJS API. This means downloading products, parsing the JSON, and then showing that UI in the app
- You CANNOT use their SDK or CDN. You must use a standard HTTP library such as Fetch or Axios and you must parse the JSON yourself. All http request examples can be found in the documentation.
- Use Postman or similar tool to test API calls are working.
- End result: A user should be able to use your front end just as they might use Amazon.com. i.e.:

- Display items
- Sort by category
- Product search
- Add items to cart
- Update cart item quantity
- Remove items from cart
- Proceed to checkout (price summary + tax zone rate (available through the API).
http and UI error handling. (i.e. UI handling for: user entered quantity that exceeds quantity in DB. Products failed to load. Error adding item to cart, etc)
- All API actions are found in the CommerceJS API documentation and the data is saved on the backend
