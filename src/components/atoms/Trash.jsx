import React from 'react'

const Trash = ({ fill, deleteBtn, id }) => {
  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={() => deleteBtn(id)}
    >
      <path
        d='M3.54297 6H5.54297H21.543'
        stroke={fill}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.54297 6V4C8.54297 3.46957 8.75368 2.96086 9.12876 2.58579C9.50383 2.21071 10.0125 2 10.543 2H14.543C15.0734 2 15.5821 2.21071 15.9572 2.58579C16.3323 2.96086 16.543 3.46957 16.543 4V6M19.543 6V20C19.543 20.5304 19.3323 21.0391 18.9572 21.4142C18.5821 21.7893 18.0734 22 17.543 22H7.54297C7.01254 22 6.50383 21.7893 6.12876 21.4142C5.75368 21.0391 5.54297 20.5304 5.54297 20V6H19.543Z'
        stroke={fill}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.543 11V17'
        stroke={fill}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.543 11V17'
        stroke={fill}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Trash
