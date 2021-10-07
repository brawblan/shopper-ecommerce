import React from 'react'
import NavigationLeaf from '../molecules/NavigationLeaf'
import ShoppingBag from '../molecules/ShoppingBag'
import NavigationUser from '../molecules/NavigationUser'

const NavigationButtons = ({
  qty,
  activeButton,
  handlePageChange,
  cartLength,
  cartDisplay,
  setCartState,
}) => {
  return (
    <div className={`NavBar Center`}>
      <NavigationLeaf
        active={activeButton.homePage}
        handlePageChange={handlePageChange}
      />
      <NavigationUser
        active={activeButton.accountPage}
        handlePageChange={handlePageChange}
      />
      <ShoppingBag
        qty={qty}
        active={activeButton.cartPage}
        handlePageChange={handlePageChange}
        cartLength={cartLength}
        setCartState={setCartState}
        cartDisplay={cartDisplay}
      />
    </div>
  )
}

export default NavigationButtons
