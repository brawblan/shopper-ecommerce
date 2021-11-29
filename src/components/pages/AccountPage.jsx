import React from 'react'
import style from './AccountPage.module.scss'
import SignIn from '../organisms/SignInScreen/SignIn'
import SignUp from '../organisms/SignUpScreen/SignUp'
import NavigationLeaf from '../molecules/NavigationLeaf'
import Chip from '../atoms/Chip'
import Badge from '../atoms/Badge'
import FloatingCartInfo from '../molecules/FloatingCartInfo'
import Button from '../atoms/Button'
import ProductCard from '../molecules/ProductCard'
import CategoryCard from '../molecules/CategoryCard'
import Input from '../molecules/Input'
import CartItem from '../organisms/CartItem'

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
}) => {
  return (
    <div className={style.Container}>
      <h2>Account Page</h2>
      <div>
        {isSignedIn ? (
          <>
            <div>{`Welcome back ${signIn.username}`}</div>
            <Button
              text={'Sign Out'}
              disabled={!isSignedIn}
              onClick={handleSignOut}
            />
            <div className='TestDisplay'>
              <NavigationLeaf active={true} qty={3} />
              <NavigationLeaf active={false} qty={0} />
              <Chip active={true} text={'TextT'} />
              <Chip active={false} text={'TextF'} />
              <Badge qty={2} def={true} />
              <Badge qty={2} def={false} />
              <FloatingCartInfo qty={2} />
              <Button text={'Button'} disabled={false} />
              <Button text={'Button'} disabled={true} />
              <ProductCard data={data} />
              <CategoryCard data={data[0]} />
              <CartItem data={data[0]} />
              <Input type={'text'} error />
              <Input type={'number'} success />
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
