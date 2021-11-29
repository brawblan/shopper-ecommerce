import React from 'react'

const BasicInput = ({ type, onBlur, onChange, name }) => {
  return (
    <input
      className={`BodyText BasicInput`}
      type={type}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}

export default BasicInput
