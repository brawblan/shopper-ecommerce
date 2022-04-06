import React, { Component } from 'react'
import style from './SignUp.module.scss'
import PasswordEye from '../../assets/PasswordEye'
import Button from '../../atoms/Button'
import Input from '../../molecules/Input'
import {ErrorMessage} from '../../../utils/error-message.class.js'
import {CreateAccountService} from '../../../services/create-account-service/create-account.service'

class SignUp extends Component {
  state = {
    fill: 'grey',
    nothingDisplay: true,
    formHasErrors: true,
    newUserInfo: {
      firstName: {
        value: '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newUserInfo: {
              ...prevState.newUserInfo,
              firstName: {
                ...prevState.newUserInfo.firstName,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      lastName: {
        value: '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newUserInfo: {
              ...prevState.newUserInfo,
              lastName: {
                ...prevState.newUserInfo.lastName,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      password: {
        value: '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newUserInfo: {
              ...prevState.newUserInfo,
              password: {
                ...prevState.newUserInfo.password,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      confirmPassword: {
        value: '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newUserInfo: {
              ...prevState.newUserInfo,
              confirmPassword: {
                ...prevState.newUserInfo.confirmPassword,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      email: {
        value: '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newUserInfo: {
              ...prevState.newUserInfo,
              email: {
                ...prevState.newUserInfo.email,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      city: {
        value: '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newUserInfo: {
              ...prevState.newUserInfo,
              city: {
                ...prevState.newUserInfo.city,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      state: {
        value: '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newUserInfo: {
              ...prevState.newUserInfo,
              state: {
                ...prevState.newUserInfo.state,
                value: input,
                touched: true
              }
            }
          }))
        },
        error: [],
      },
      zipcode: {
        value: '',
        touched: false,
        onUpdate: (input) => {
          if(input.length <= 5) {
            this.setState((prevState) => ({
              newUserInfo: {
                ...prevState.newUserInfo,
                zipcode: {
                  ...prevState.newUserInfo.zipcode,
                  value: input,
                  touched: true
                }
              }
            }))
          }
        },
        error: [],
      },
    }
  }

  addNothing = () => {
    this.setState({ nothingDisplay: !this.state.nothingDisplay })
  }

  render() {
    const {      
      users,
      isDisabled,
      toggleSwitch,
    } = this.props

    const {newUserInfo, formHasErrors} = this.state
    const {firstName, lastName, password, confirmPassword, email, city, state, zipcode} = newUserInfo

    const canSeePassword = () => {
      const x = document.querySelector('input[name="password"]')
      const y = document.querySelector('input[name="confirmPassword"]')

      if (x.type === 'password') {
        x.type = 'text'
        y.type = 'text'
      } else {
        x.type = 'password'
        y.type = 'password'
      }
      if (this.state.fill === 'grey') {
        this.setState({ fill: 'black' })
      } else {
        this.setState({ fill: 'grey' })
      }
    }

    const handleChange = ({ target: { name, value } }) => {
      newUserInfo[name].onUpdate(value)
    }

    const checkForErrors = (request) => {
      const {firstName, lastName, password, confirmPassword, email, zipcode} = request

      firstName.error = CreateAccountService.validateName(firstName.value, 'first name')
      lastName.error = CreateAccountService.validateName(lastName.value, 'last name')
      password.error = CreateAccountService.validatePassword(password.value, true)
      confirmPassword.error = CreateAccountService.validatePassword(password.value, false, confirmPassword.value)
      email.error = CreateAccountService.validateEmail(email.value)
      city.error = CreateAccountService.validateName(city.value, 'city')
      state.error = CreateAccountService.validateName(state.value, 'state')
      zipcode.error = (zipcode.value > 0 && zipcode.value < 99999) ? [] : [ErrorMessage.zipcodeError]
      
      let noErrors = !firstName.error.length && 
                    !lastName.error.length &&
                    !password.error.length &&
                    !email.error.length &&
                    !zipcode.error.length
      this.setState({formHasErrors: !noErrors})
    }

    const createAccountInputs = [
      {
        type: 'text',
        id: 'firstName',
        label: 'First Name *',
        value: firstName.value,
        error: firstName.error,
        touched: firstName.touched
      },
      {
        type: 'text',
        id: 'lastName',
        label: 'Last Name *',
        value: lastName.value,
        error: lastName.error,
        touched: lastName.touched
      },
      {
        type: 'password',
        id: 'password',
        label: 'Create Password *',
        value: password.value,
        error: password.error,
        touched: password.touched,
        svg: true,
      },
      {
        type: 'password',
        id: 'confirmPassword',
        label: 'Confirm Password *',
        value: confirmPassword.value,
        error: confirmPassword.error,
        touched: confirmPassword.touched
      },
      {
        type: 'text',
        id: 'email',
        label: 'Your E-Mail Address *',
        value: email.value,
        error: email.error,
        touched: email.touched
      },
      {
        type: 'text',
        id: 'city',
        label: 'City *',
        value: city.value,
        error: city.error,
        touched: city.touched
      },
      {
        type: 'select',
        id: 'state',
        label: 'State *',
        value: state.value,
        error: state.error,
        touched: state.touched
      },
      {
        type: 'number',
        id: 'zipcode',
        label: 'Zipcode *',
        value: zipcode.value,
        error: zipcode.error,
        touched: zipcode.touched
      },
    ]

    const onCreateAccount = (e) => {
      e.preventDefault()
      
      checkForErrors({firstName, lastName, password, confirmPassword, email, city, state, zipcode})

      if (!formHasErrors) {
        const newUser = CreateAccountService.createUserObject({firstName, lastName, password, confirmPassword, email, city, state, zipcode})
        this.props.handleSignInBtn('homepageScreen', [newUser])
      }
    }

    return (
      <div
        className={style.SignUpContainer}
        style={{ display: users.signedIn }}
      >
        <form className={style.SignUpForm}>
          {createAccountInputs.map((item) => (
            <div className={style.InputForm} key={item.id}>
              <label form={item.id}>{item.label}</label>
              <>
                {!item.svg ? (
                  <Input
                    className={
                      item.type === 'submit'
                        ? isDisabled.signUpBtn
                          ? style.DisabledBtn
                          : style.CheckoutBtn
                        : style.InputBox
                    }
                    type={item.type}
                    key={item.id}
                    id={item.id}
                    name={item.id}
                    value={item.value}
                    disabled={
                      item.type === 'submit' ? isDisabled.signUpBtn : false
                    }
                    onChange={handleChange}
                    onBlur={handleChange}
                    autoComplete='off'
                    success={!item.error.length && item.touched}
                    error={!!item.error.length}
                    />
                    ) : (
                      <>
                    <Input
                      className={style.InputBox}
                      type={item.type}
                      key={item.id}
                      id={item.id}
                      name={item.id}
                      onChange={handleChange}
                      onBlur={handleChange}
                      autoComplete='off'
                      success={!item.error.length && item.touched}
                      error={!!item.error.length}
                      />
                    <PasswordEye
                      style={`${style.Checkbox} ${!!item.error.length && style.Error}`}
                      onClick={canSeePassword}
                      fill={this.state.fill}
                    />
                  </>
                )}
              </>
              <div className={style.Error}>{item.error}</div>
            </div>
          ))}          
        </form>
        <Button
          text={'Create Account'}
          disabled={
            !(firstName.touched &&
              lastName.touched &&
              password.touched &&
              confirmPassword.touched &&
              email.touched &&
              city.touched &&
              state.touched &&
              zipcode.touched  
            )
          }
          type='submit'
          onClick={onCreateAccount}
        />
        <button onClick={this.addNothing} className={style.FacebookBtn}>
          sign up with Facebook
        </button>
        <p
          className={
            this.state.nothingDisplay ? style.Nothing : style.Something
          }
        >
          This button doesn't do anything.
        </p>
        <div className={style.SignIn}>
          <p>Already have an account?</p>
          <Button text={'Sign In'} disabled={false} onClick={toggleSwitch} />
        </div>
      </div>
    )
  }
}

export default SignUp
