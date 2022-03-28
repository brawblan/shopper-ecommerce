import React, { Component } from 'react'
import { INIT_CREATE_ACCOUNT } from '../../../utils/initState'
import { userExists, checkPasswordMatch } from '../../../utils/createAccountValidations'
import style from './SignUp.module.scss'
import PasswordEye from '../../assets/PasswordEye'
import Button from '../../atoms/Button'
import Input from '../../molecules/Input'
import {ErrorMessage} from '../../../utils/error-message.class.js'
import {CreateAccountService} from '../../../services/create-account-service/create-account.service'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newUserInfo: INIT_CREATE_ACCOUNT,
      fill: 'grey',
      nothingDisplay: true,
      formHasErrors: true,
      errorMessage: {
        firstName: [],
        lastName: [],
        password: [],
        email: [],
        zipcode: [],
      }
    }
  }

  addNothing = () => {
    this.setState({ nothingDisplay: !this.state.nothingDisplay })
  }

  render() {
    const {
      handleSignUp,
      createAccount,
      error,
      users,
      isDisabled,
      updateNestedState,
      updateDoubleNestedState,
      toggleSwitch,
    } = this.props

    const {newUserInfo, errorMessage, formHasErrors} = this.state

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
      if (name !== 'zipcode') {
        this.setState((prevState) => ({ 
          newUserInfo: {
            ...prevState.newUserInfo,
            [name]: value
          }
        }))
      } else if (name === 'zipcode') {
        if (value.length <= 5) {
          this.setState((prevState) => ({ 
            newUserInfo: {
              ...prevState.newUserInfo,
              [name]: value
            }
          }))
        }
      }
      checkForErrors(newUserInfo)
    }

    const checkForErrors = (request) => {
      const {firstName, lastName, password, confirmPassword, email, zipcode} = request

      errorMessage.firstName = CreateAccountService.validateName(firstName, 'first name')
      errorMessage.lastName = CreateAccountService.validateName(lastName, 'last name')
      errorMessage.password = CreateAccountService.validatePassword(password, true)
      errorMessage.confirmPassword = CreateAccountService.validatePassword(confirmPassword, false)
      errorMessage.email = CreateAccountService.validateEmail(email)
      errorMessage.zipcode = zipcode.length <= 5 ? [] : [ErrorMessage.zipcodeError]
      
      let noErrors = !errorMessage.firstName.length && 
                    !errorMessage.lastName.length &&
                    !errorMessage.password.length &&
                    !errorMessage.email.length &&
                    !errorMessage.zipcode.length
      this.setState({formHasErrors: noErrors})
    }

    const createAccountInputs = [
      {
        type: 'text',
        id: 'firstName',
        label: 'First Name *',
        error: errorMessage.firstName,
        value: newUserInfo.firstName,
      },
      {
        type: 'text',
        id: 'lastName',
        label: 'Last Name *',
        error: errorMessage.lastName,
        value: newUserInfo.lastName,
      },
      {
        type: 'password',
        id: 'password',
        label: 'Create Password *',
        svg: true,
        error: errorMessage.password,
        value: newUserInfo.password,
      },
      {
        type: 'password',
        id: 'confirmPassword',
        label: 'Confirm Password *',
        error: checkPasswordMatch(
          createAccount.password,
          createAccount.confirmPassword,
        ),
        value: newUserInfo.confirmPassword,
      },
      {
        type: 'text',
        id: 'email',
        label: 'Your E-Mail Address *',
        error: errorMessage.email,
        value: newUserInfo.email,
      },
      {
        type: 'number',
        id: 'zipcode',
        label: 'Zipcode *',
        value: newUserInfo.zipcode,
      },
    ]

    const onCreateAccount = (e) => {
      e.preventDefault()
      updateDoubleNestedState(
        'usersArr',
        'username',
        createAccount.email,
        'password',
        createAccount.password,
        true,
      )
      this.props.handleSignInBtn('homepageScreen', [newUserInfo])
    }

    return (
      <div
        className={style.SignUpContainer}
        style={{ display: users.signedIn }}
      >
        <form className={style.SignUpForm} onSubmit={onCreateAccount}>
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
                    autoComplete='none'
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
                      onBlur={(e) => checkForErrors(newUserInfo)}
                      autoComplete='off'
                    />
                    <PasswordEye
                      style={style.Checkbox}
                      onClick={canSeePassword}
                      fill={this.state.fill}
                    />
                  </>
                )}
              </>
              <div className={style.Error}>{item.error}</div>
            </div>
          ))}
          <Button
            text={'Create Account'}
            disabled={formHasErrors}
            type='submit'
          />
        </form>
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
