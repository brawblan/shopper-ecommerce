import React from 'react'
import BackArrow from '../atoms/BackArrow'

const BackArrowButton = ({onBack}) => {
  return (
    <div 
      className='BackArrowBtn'
      onClick={onBack}
    >
      <BackArrow fill='#51B1A6' />
    </div>
  )
}

export default BackArrowButton