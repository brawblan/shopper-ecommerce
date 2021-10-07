import React from 'react'
import Leaf from '../atoms/Leaf'

const NavigationLeaf = ({ active, handlePageChange }) => {
  return (
    <div
      className={`Navigation Center ${active && 'Active'}`}
      onClick={() => handlePageChange('homePage')}
    >
      <Leaf fill={`${active ? '#FFFFFF' : '#5A5A75'}`} />
    </div>
  )
}

export default NavigationLeaf
