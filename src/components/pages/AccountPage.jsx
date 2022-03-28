import React from 'react'
import style from './AccountPage.module.scss'
import SignIn from '../organisms/SignInScreen/SignIn'
import SignUp from '../organisms/SignUpScreen/SignUp'
import Button from '../atoms/Button'

const AccountPage = ({
  updateNestedState,
  updateState,
  createAccount,
  isDisabled,
  signIn,
  usersArr,
  data,
  handleSignInBtn,
  isSignedIn,
  handleSignUp,
  handleHomeScreenBtn,
  updateDoubleNestedState,
  toggle,
  toggleSwitch,
  handleSignOut,
  shippingInformation
}) => {
  return (
    <div className={style.Container}>
      <h2>Account Page</h2>
      <div>
        {isSignedIn ? (
          <>
            <div className={style.Header}>
              {`Welcome, ${shippingInformation.firstName} ${shippingInformation.lastName}!`}
              <div>Explore our store to fill your house plant needs.</div>
              <Button
                text={'Sign Out'}
                disabled={!isSignedIn}
                onClick={handleSignOut}
              />
            </div>
          </>
        ) : (
          <>
            {toggle ? (
              <SignIn
                toggleSwitch={toggleSwitch}
                usersArr={usersArr}
                users={signIn}
                isDisabled={isDisabled}
                createAccount={createAccount}
                updateNestedState={updateNestedState}
                updateState={updateState}
                onClick={handleSignInBtn}
              />
            ) : (
              <SignUp
                toggleSwitch={toggleSwitch}
                users={signIn}
                error={''}
                createAccount={createAccount}
                isDisabled={isDisabled}
                handleSignInBtn={handleSignInBtn}
                handleSignUp={handleSignUp}
                backToSignIn={handleHomeScreenBtn}
                updateNestedState={updateNestedState}
                updateDoubleNestedState={updateDoubleNestedState}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AccountPage
