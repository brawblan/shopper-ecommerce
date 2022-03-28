import React from 'react'

const BasicInput = ({ type, onBlur, onChange, onFocus, name, value, max }) => {
  return (
    <input
      className={`BodyText BasicInput`}
      type={type}
      name={name}
      min={'1'}
      max={'99999'}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={(e) => onFocus(name)}
    />
  )
}

export default BasicInput
