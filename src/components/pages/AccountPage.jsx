import React from 'react'
import style from './AccountPage.module.scss'
import NavigationLeaf from '../molecules/NavigationLeaf'
import Chip from '../atoms/Chip'
import Badge from '../atoms/Badge'
import FloatingCartInfo from '../molecules/FloatingCartInfo'
import Button from '../atoms/Button'
import ProductCard from '../molecules/ProductCard'
import CategoryCard from '../molecules/CategoryCard'
import CartItem from '../organisms/CartItem'
import Input from '../molecules/Input'

const AccountPage = ({ data }) => {
  return (
    <div className={style.Container}>
      Account Page
      <div>
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
      </div>
    </div>
  )
}

export default AccountPage
