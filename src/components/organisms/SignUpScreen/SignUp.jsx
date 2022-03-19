import React, { Component } from 'react'
import { INIT_CREATE_ACCOUNT } from '../../../utils/initState'
import { userExists, checkPasswordMatch } from '../../../utils/createAccountValidations'
import style from './SignUp.module.scss'
import PasswordEye from '../../assets/PasswordEye'
import Button from '../../atoms/Button'
import Input from '../../molecules/Input'
import {ErrorMessage} from '../../../utils/error-message.class.js'

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
        surname: [],
        password: [],
        email: [],
        postcode: [],
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
      if (name !== 'postcode') {
        this.setState((prevState) => ({ 
          newUserInfo: {
            ...prevState.newUserInfo,
            [name]: value
          }
        }))
      } else if (name === 'postcode') {
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
      const {firstName, surname, password, email, postcode} = request
      console.log('email:', email);

      errorMessage.firstName = firstName.length ? [] : [ErrorMessage.firstNameError]
      errorMessage.surname = surname.length ? [] : [ErrorMessage.surnameError]
      errorMessage.password = password.length ? [] : [ErrorMessage.passwordError]
      errorMessage.email = email.length ? [] : [ErrorMessage.emailError]
      errorMessage.postcode = postcode.length <= 5 ? [] : [ErrorMessage.postcodeError]
      
      let noErrors = !errorMessage.firstName.length && 
                    !errorMessage.surname.length &&
                    !errorMessage.password.length &&
                    !errorMessage.email.length &&
                    !errorMessage.postcode.length
      this.setState({formHasErrors: noErrors})
      console.log(formHasErrors, noErrors);
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
        id: 'surname',
        label: 'Last Name *',
        error: errorMessage.surname,
        value: newUserInfo.surname,
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
        id: 'postcode',
        label: 'Zipcode *',
        value: newUserInfo.postcode,
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
      this.props.onClick('homepageScreen')
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
            // onClick={onClick}
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
