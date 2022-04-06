import React, { Component } from 'react'
import BasicInput from '../atoms/BasicInput'
import Warning from '../atoms/Warning'
import Check from '../atoms/Check'
import {states} from '../../utils/dropdowns'
import { expMonth, expYear } from '../../utils/dropdowns'

class Input extends Component {
  state = {
    inputHasFocus: this.props.inputHasFocus
  }

render() {
  const { type, max, initial, error, success, name, onBlur, onChange, value } = this.props
  const {inputHasFocus} = this.state

  const hasFocus = (name) => {
    this.setState({ inputHasFocus: name})
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
        {type !== 'select' && type !== 'expiryDate' && (
          <>
            <BasicInput type={type} max={max} onFocus={hasFocus} onBlur={handleBlur} onChange={onChange} name={name} value={value} />
            {error && <Warning />}
            {success && <Check />}
          </>
        )} 
        {type === 'select' && (
          <>
            <select value={value} className='BasicInput' onFocus={(e) => hasFocus(name)} onBlur={handleBlur} onChange={onChange} name={name} id="select">
              {states.map(({state}) => (
                <option value={state} key={state}>{state}</option>
              ))}
            </select>
          </>
        )}
        {type === 'expiryDate' && (
          <div className='InputBaseLabel'>
            <select
              className='SelectRoot'
              name={'expiryMonth'}
              id={name}
              
              onFocus={(e) => hasFocus(name)} 
              onBlur={handleBlur}
              onChange={onChange}
              >
              {expMonth.map((month) => (
                <option value={month} key={month}>{month}</option>
                ))}
            </select>
            <select
              className='SelectRoot'
              name={'expiryYear'}
              id={name}
              
              onFocus={(e) => hasFocus(name)} 
              onBlur={handleBlur}
              onChange={onChange}
            >
              {expYear.map((year) => (
                <option value={year} key={year}>{year}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    )
  }

}

export default Input
