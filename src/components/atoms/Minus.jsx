import React from 'react'

const Minus = ({ fill, minusBtn, id }) => {
  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      xmlns='http://www.w3.org/2000/svg'
      onClick={() => minusBtn(id, '-')}
    >
      <path
        d='M5.54297 12H19.543'
        stroke={fill}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Minus
