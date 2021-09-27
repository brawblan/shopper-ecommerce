import React from 'react'
import Leaf from '../atoms/Leaf'

const NavigationLeaf = ({ active }) => {
  return (
    <div className={`Navigation Center ${active && 'Active'}`}>
      <Leaf fill={`${active ? '#FFFFFF' : '#5A5A75'}`} />
    </div>
  )
}

export default NavigationLeaf
