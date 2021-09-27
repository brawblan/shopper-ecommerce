import React from 'react'
import NavigationLeaf from '../molecules/NavigationLeaf'
import ShoppingBag from '../molecules/ShoppingBag'
import NavigationUser from '../molecules/NavigationUser'

const NavigationBar = ({ qty }) => {
  return (
    <div className={`NavBar Center`}>
      <NavigationLeaf active={false} />
      <NavigationUser active={false} />
      <ShoppingBag qty={qty} active={true} />
    </div>
  )
}

export default NavigationBar
