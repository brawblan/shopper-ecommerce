import React from 'react'

const Badge = ({ def, qty }) => {
  return (
    <div className={`Badge Center SmallText ${def ? 'Default' : null}`}>
      {qty}
    </div>
  )
}

export default Badge
