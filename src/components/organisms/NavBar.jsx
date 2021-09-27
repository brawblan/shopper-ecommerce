import React from 'react'
import NavigationBar from './NavigationBar'

const NavBar = ({ qty }) => {
  return (
    <div className='DesktopNav Center'>
      <span>
        <h1>Shopper App</h1>
      </span>
      <NavigationBar qty={qty} />
    </div>
  )
}

export default NavBar
