import React from 'react'
import Chip from '../atoms/Chip'

const FloatingCartInfo = ({ qty }) => {
  return (
    <div className={`FloatingCartInfo`}>
      <div className='BodyText'>Shopping Bag</div>
      <Chip active={false} text={`${qty} items`} />
    </div>
  )
}

export default FloatingCartInfo
