import React, { Component } from 'react'
import { INIT_CREATE_ACCOUNT } from '../../../utils/initState'
import { checkPasswordMatch } from '../../../utils/createAccountValidations'
import style from './SignUp.module.scss'
import PasswordEye from '../../assets/PasswordEye'
import Button from '../../atoms/Button'
import Input from '../../molecules/Input'

class SignUp extends Component {
  emailError
  constructor(props) {
    super(props)
    this.state = {
      newUserInfo: INIT_CREATE_ACCOUNT,
      fill: 'grey',
      nothingDisplay: true,
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

    const canSeePassword = () => {
      const x = document.getElementById('password')
      const y = document.getElementById('confirmPassword')
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
        updateNestedState('createAccount', name, value)
      } else if (name === 'postcode') {
        if (value.length <= 5) {
          updateNestedState('createAccount', name, value)
        }
      }
    }

    const createAccountInputs = [
      {
        type: 'text',
        id: 'firstName',
        label: 'First Name *',
        error: error.firstNameError,
        value: createAccount.firstName,
      },
      {
        type: 'text',
        id: 'lastName',
        label: 'Last Name *',
        error: error.lastNameError,
        value: createAccount.lastName,
      },
      {
        type: 'password',
        id: 'password',
        label: 'Create Password *',
        svg: true,
        error: error.passwordError,
        value: createAccount.password,
      },
      {
        type: 'password',
        id: 'confirmPassword',
        label: 'Confirm Password *',
        error: checkPasswordMatch(
          createAccount.password,
          createAccount.confirmPassword,
        ),
        value: createAccount.confirmPassword,
      },
      {
        type: 'text',
        id: 'email',
        label: 'Your E-Mail Address *',
        error: error.emailError,
        value: createAccount.email,
      },
      {
        type: 'number',
        id: 'postcode',
        label: 'Zipcode *',
        value: createAccount.postcode,
      },
      {
        type: 'submit',
        id: 'submit',
        value: 'Create',
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
                    onBlur={handleSignUp}
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
                      onBlur={handleSignUp}
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
