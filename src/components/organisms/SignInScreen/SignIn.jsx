import React, { Component } from 'react'
import style from './SignIn.module.scss'
import PasswordEye from '../../assets/PasswordEye'
import Button from '../../atoms/Button'
import Input from '../../molecules/Input'
import { ErrorMessage } from '../../../utils/error-message.class'
import {SignInService} from '../../../services/sign-in-service/sign-in.service'

class SignIn extends Component {
  state = {
    fill: 'grey',
    userInfo: this.props.users,
    newUserInfo: {
      username: {
        value: '',
        touched: false,
        onUpdate: (input) => {
          this.setState((prevState) => ({
            newUserInfo: {
              ...prevState.newUserInfo,
              username: {
                ...prevState.newUserInfo.username,
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
      }
    }
  }
  
  render() {
    const { newUserInfo } = this.state
    const {username, password} = newUserInfo
    const {
      isDisabled,
      users,
      toggleSwitch,
      usersArr,
      onClick
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

    const signInInputs = [
      {
        type: 'text',
        label: 'Username',
        value: username.value ?? '',
        id: 'username',
        error: username.error,
      },
      {
        type: 'password',
        label: 'Password',
        value: password.value ?? '',
        id: 'password',
        error: password.error,
        svg: true,
      },
    ]

    const handleChange = ({ target: { name, value } }) => {
      if (name === 'username') {
        username.onUpdate(value)
      }
      if (name === 'password') {
        password.onUpdate(value)
      }
    }

    const validateForm = (request) => {
      const {username: {value: usernameValue}, password: {value: passwordValue}} = request
      const usernameValidation = SignInService.checkIfUsernameExists(usersArr, usernameValue)
      const passwordValidation = SignInService.checkIfPasswordExists(usersArr, passwordValue)
      
      return {usernameValidation, passwordValidation}
    }
    
    const onSignIn = (e) => {
      e.preventDefault()
      const validate = validateForm({username, password})
      const {usernameValidation, passwordValidation} = validate
      
      this.setState((prevState) => ({
        newUserInfo: {
          ...prevState.newUserInfo,
          username: {
            ...prevState.newUserInfo.username,
            error: usernameValidation ? [] : [ErrorMessage.usernameError]
          },
          password: {
            ...prevState.newUserInfo.password,
            error: passwordValidation ? [] : [ErrorMessage.passwordError]
          }
        }
      }))

      if (usernameValidation && passwordValidation) {
        const logInValidation = SignInService.usernameAndPasswordMatch(usersArr, username, password)
        
        if (logInValidation.length) {
          const user = SignInService.getUser(usersArr, username.value)
          onClick('', user)
        } else if (!logInValidation.length) {
          this.setState((prevState) => ({
            newUserInfo: {
              ...prevState.newUserInfo,
              username: {
                ...prevState.newUserInfo.username,
                error: [ErrorMessage.usernamePasswordMatchError]
              },
              password: {
                ...prevState.newUserInfo.password,
                error: [ErrorMessage.usernamePasswordMatchError]
              }
            }
          }))
        }
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
                    onBlur={handleChange}
                    autoComplete={'off'}
                    initial={!username.touched}
                    success={!item.error && username.touched}
                    error={!!item.error.length}
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
                      onBlur={handleChange}
                      autoComplete={'off'}
                      initial={!password.touched}
                      success={!item.error && password.touched}
                      error={!!item.error.length}
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
              !(username.touched &&
              password.touched)
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
