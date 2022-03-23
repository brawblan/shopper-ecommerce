import React from 'react'

const BasicInput = ({ type, onBlur, onChange, onFocus, name, value }) => {
  return (
    <input
      className={`BodyText BasicInput`}
      type={type}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={(e) => onFocus(name)}
    />
  )
}

export default BasicInput
