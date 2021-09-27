import React from 'react'
import BasicInput from '../atoms/BasicInput'
import Warning from '../atoms/Warning'
import Check from '../atoms/Check'

const Input = ({ type, error, success }) => {
  return (
    <div className={`Input ${error && 'Error'} ${success && 'Success'}`}>
      <BasicInput type={type} />
      {error && <Warning />}
      {success && <Check />}
    </div>
  )
}

export default Input
