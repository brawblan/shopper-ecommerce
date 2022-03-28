import React, { Component } from 'react'
import style from './SignIn.module.scss'
import PasswordEye from '../../assets/PasswordEye'
import Button from '../../atoms/Button'
import Input from '../../molecules/Input'

class Validate {
  constructor(userInfo, userTyped, usersArr) {
    this.userInfo = userInfo
    this.userTyped = userTyped
    this.usersArr = usersArr
  }

  static validate = (userInfo, userTyped, usersArr) => {
    let error = []
    switch (userInfo) {
      case 'username':
        usersArr.filter(({ username }) => error.push(username === userTyped))
        break
      case 'password':
        usersArr.filter(({ password }) => error.push(password === userTyped))
        break
      default:
        break
    }
    return error
  }

  static usernamePasswordMatch = (usersArr, inputUsername, inputPassword) => {
    const currentUser = usersArr.filter((user) => {
      if(user.username === inputUsername && user.password === inputPassword) {
        return user
      }
    })
    return currentUser
  }
}

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fill: 'grey',
      userInfo: this.props.users,
      usernameTouched: false,
      passwordTouched: false,
    }
  }

  render() {
    const { username, password, invalidUsername, invalidPassword } =
      this.state.userInfo
    const { usernameTouched, passwordTouched } = this.state
    const {
      isDisabled,
      updateNestedState,
      updateState,
      onClick,
      users,
      toggleSwitch,
      usersArr,
    } = this.props

    const canSeePassword = () => {
      const x = document.querySelector('input[name="password"]')
      if (x.type === 'password') {
        x.type = 'text'
      } else {
        x.type = 'password'
      }
      if (this.state.fill === 'grey') {
        this.setState({ fill: 'black' })
      } else {
        this.setState({ fill: 'grey' })
      }
    }

    const usernameValidate = Validate.validate('username', username, usersArr)
    const passwordValidate = Validate.validate('password', password, usersArr)

    const signInInputs = [
      {
        type: 'text',
        label: 'Username',
        id: 'username',
        error: invalidUsername,
      },
      {
        type: 'password',
        label: 'Password',
        id: 'password',
        error: invalidPassword,
        svg: true,
      },
    ]

    const handleChange = ({ target: { name, value } }) => {
      this.setState((prevState) => ({
        userInfo: {
          ...prevState.userInfo,
          [name]: value,
        },
      }))
      if (name === 'username') {
        this.setState({ usernameTouched: true })
      }
      if (name === 'password') {
        this.setState({ passwordTouched: true })
      }
      updateNestedState('signIn', name, value)
      signInValidation()
    }

    const signInValidation = () => {
      let indexOfUsernameValidate = usernameValidate.indexOf(true)
      let indexOfPasswordValidate = passwordValidate.indexOf(true)

      if (!usernameValidate.includes(true)) {
        this.setState((prevState) => ({
          userInfo: {
            ...prevState.userInfo,
            invalidUsername: 'Username cannot be found',
          },
        }))
      } else {
        this.setState((prevState) => ({
          userInfo: {
            ...prevState.userInfo,
            invalidUsername: '',
          },
        }))
      }
      if (!passwordValidate.includes(true)) {
        this.setState((prevState) => ({
          userInfo: {
            ...prevState.userInfo,
            invalidPassword: 'Password cannot be found',
          },
        }))
      } else {
        this.setState((prevState) => ({
          userInfo: {
            ...prevState.userInfo,
            invalidPassword: '',
          },
        }))
      }

      if (indexOfPasswordValidate !== indexOfUsernameValidate) {
        updateNestedState('isDisabled', 'signInBtn', true)
        this.setState((prevState) => ({
          userInfo: {
            ...prevState.userInfo,
            invalidPassword: 'Password and Username do not match',
          },
        }))
      } else if (
        indexOfPasswordValidate === indexOfUsernameValidate &&
        indexOfPasswordValidate !== -1 &&
        indexOfUsernameValidate !== -1
      ) {
        updateNestedState('isDisabled', 'signInBtn', false)
        return (
          usernameValidate.includes(true) && passwordValidate.includes(true)
        )
      }
    }

    const onSignIn = (e) => {
      e.preventDefault()
      const validation = signInValidation()
      if (validation) {
        const currentUser = Validate.usernamePasswordMatch(usersArr, username, password)
        updateState('shippingInformation', currentUser)
        onClick(e, currentUser)
      }
    }

    return (
      <div
        className={style.SignInContainer}
        style={{ display: users.signedIn }}
      >
        <form className={style.SignUpForm} onSubmit={onSignIn}>
          {signInInputs.map((item) => (
            <div className={style.InputForm} key={item.type}>
              <label form={item.id}>{item.label}</label>
              <>
                {!item.svg ? (
                  <Input
                    type={item.type}
                    id={item.id}
                    name={item.id}
                    value={item.value}
                    className={
                      item.type === 'submit'
                        ? isDisabled.signInBtn
                          ? style.DisabledBtn
                          : style.CheckoutBtn
                        : style.InputBox
                    }
                    key={item.id}
                    onChange={handleChange}
                    onBlur={signInValidation}
                    autoComplete={'off'}
                    initial={!usernameTouched}
                    success={!item.error && usernameTouched}
                    error={item.error}
                  />
                ) : (
                  <>
                    <Input
                      type={item.type}
                      id={item.id}
                      name={item.id}
                      value={item.value}
                      className={
                        item.type === 'submit'
                          ? isDisabled.signInBtn
                            ? style.DisabledBtn
                            : style.CheckoutBtn
                          : style.InputBox
                      }
                      key={item.id}
                      onChange={handleChange}
                      onBlur={signInValidation}
                      autoComplete={'off'}
                      initial={!passwordTouched}
                      success={!item.error && passwordTouched}
                      error={item.error}
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
            text={'Sign In'}
            disabled={
              invalidUsername.length ||
              invalidPassword.length ||
              !username.length ||
              !password.length
            }
            onClick={onSignIn}
            type='submit'
          />
        </form>
        <p>Don't have an account?</p>
        <Button
          text={'Create Account'}
          disabled={false}
          onClick={toggleSwitch}
        />
      </div>
    )
  }
}

export default SignIn
