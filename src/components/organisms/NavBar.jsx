import React from 'react'
import NavigationButtons from './NavigationButtons'

const NavBar = ({
  qty,
  activeButton,
  handlePageChange,
  cartLength,
  cartDisplay,
  setCartState,
}) => {
  return (
    <div className='DesktopNav Center'>
      <span>
        <h1>Shopper App</h1>
      </span>
      <NavigationButtons
        qty={qty}
        activeButton={activeButton}
        handlePageChange={handlePageChange}
        cartLength={cartLength}
        setCartState={setCartState}
        cartDisplay={cartDisplay}
      />
    </div>
  )
}

export default NavBar
