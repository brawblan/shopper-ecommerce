import React from 'react'
import User from '../atoms/User'

const NavigationUser = ({ active, handlePageChange }) => {
  return (
    <div
      className={`Navigation Center ${active && 'Active'}`}
      onClick={() => handlePageChange('accountPage')}
    >
      <User fill={`${active ? '#FFFFFF' : '#5A5A75'}`} />
    </div>
  )
}

export default NavigationUser
