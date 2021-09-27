import React from 'react'

const Button = ({ text, disabled }) => {
  return (
    <button className={`Button ${disabled ? 'Disabled' : null}`}>{text}</button>
  )
}

export default Button
