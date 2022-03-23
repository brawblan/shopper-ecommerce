import React, { Component } from 'react'
import BasicInput from '../atoms/BasicInput'
import Warning from '../atoms/Warning'
import Check from '../atoms/Check'
import {states} from '../../utils/dropdowns'

class Input extends Component {
  state = {
    inputHasFocus: this.props.inputHasFocus
  }

render() {
  const { type, initial, error, success, name, onBlur, onChange, value } = this.props
  const {inputHasFocus} = this.state

  const hasFocus = (e) => {
    this.setState({ inputHasFocus: e})
  }

  const handleBlur = (e) => {
    onBlur(e)
    this.setState({ inputHasFocus: '' })
  }

  return (
      <div
        className={`Input ${(inputHasFocus === name) && 'Focus'} ${initial && ''} ${error && 'Error'} ${
          success && 'Success'
        }`}
      >
        {type !== 'select' ? (
          <>
            <BasicInput type={type} onFocus={hasFocus} onBlur={handleBlur} onChange={onChange} name={name} value={value} />
            {error && <Warning />}
            {success && <Check />}
          </>
        ) : (
          <>
            <select className='BasicInput' onFocus={(e) => hasFocus(name)} onBlur={handleBlur} onChange={onChange} name={name} id="select">
              {states.map(({state}) => (
                <option value={state} key={state}>{state}</option>
              ))}
            </select>
          </>
        )}
      </div>
    )
  }

}

export default Input
