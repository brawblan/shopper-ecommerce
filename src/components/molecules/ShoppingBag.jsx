import React from 'react'
import Badge from '../atoms/Badge'

const ShoppingBag = ({ qty, cartLength, setCartState, cartDisplay }) => {
  return (
    <div
      className={`Navigation Center ${cartDisplay && 'Active'}`}
      onClick={setCartState}
    >
      <svg
        width='25'
        height='24'
        viewBox='0 0 25 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3.54297 16.1072V6.93726H21.543V16.1072C21.543 19.4209 18.8567 22.1072 15.543 22.1072H9.54297C6.22926 22.1072 3.54297 19.4209 3.54297 16.1072Z'
          stroke={`${cartDisplay ? '#FFFFFF' : '#5A5A75'}`}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.9066 10.9486V5.39861C16.9066 4.25614 16.4469 3.16045 15.6285 2.3526C14.8102 1.54475 13.7003 1.0909 12.543 1.0909C11.3856 1.0909 10.2757 1.54475 9.4574 2.3526C8.63906 3.16045 8.17932 4.25614 8.17932 5.39861V10.9486'
          stroke={`${cartDisplay ? '#FFFFFF' : '#5A5A75'}`}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      {qty > 0 && <Badge qty={cartLength} />}
    </div>
  )
}

export default ShoppingBag
