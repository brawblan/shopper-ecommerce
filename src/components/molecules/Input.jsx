import React from 'react'
import BasicInput from '../atoms/BasicInput'
import Warning from '../atoms/Warning'
import Check from '../atoms/Check'

const Input = ({ type, initial, error, success, name, onBlur, onChange }) => {
  return (
    <div
      className={`Input ${initial && ''} ${error && 'Error'} ${
        success && 'Success'
      }`}
    >
      <BasicInput type={type} onBlur={onBlur} onChange={onChange} name={name} />
      {error && <Warning />}
      {success && <Check />}
    </div>
  )
}

export default Input
