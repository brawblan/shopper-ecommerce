import React from 'react'
import User from '../atoms/User'

const NavigationUser = ({ active }) => {
  return (
    <div className={`Navigation Center ${active && 'Active'}`}>
      <User fill={`${active ? '#FFFFFF' : '#5A5A75'}`} />
    </div>
  )
}

export default NavigationUser
