import React from 'react'

const Leaf = ({ fill }) => {
  return (
    <svg
      width='25'
      height='27'
      viewBox='0 0 25 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.61439 16.4444C2.94928 8.14685 12.418 2 12.418 2C12.418 2 21.8865 8.1468 20.2216 16.4444C19.1068 22 12.418 22 12.418 22C12.418 22 5.72926 22 4.61439 16.4444Z'
        stroke={fill}
        strokeWidth='1.83626'
      />
      <path
        d='M12.4179 8.69726L12.4179 13.8723M12.418 25.25L12.418 17.6044M12.418 17.6044L16.418 15.1044M12.418 17.6044L12.4179 13.8723M12.4179 13.8723L8.91791 10.8723'
        stroke={fill}
        strokeWidth='1.83626'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Leaf
