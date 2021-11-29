import React from 'react'

const Button = ({ text, disabled, onClick }) => {
  return (
    <button
      className={`Button ${disabled ? 'Disabled' : null}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
