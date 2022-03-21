import React from 'react'

const Button = ({ text, disabled, onClick, width }) => {
  return (
    <button
      className={`Button ${disabled ? 'Disabled' : null}`}
      style={{'width': width + 'rem'}}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
