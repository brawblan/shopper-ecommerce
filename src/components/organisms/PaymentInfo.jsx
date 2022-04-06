import React from 'react'

const PaymentInfo = ({ paymentInformation }) => {
  const {card, cardHolder, expiry} = paymentInformation

  let valueDate
  if (Number(expiry.expiryMonth) < 10) {
    valueDate = `0${expiry.expiryMonth}/${Number(expiry.expiryYear) - 2000}`
  } else {
    valueDate = `${expiry.expiryMonth}/${Number(expiry.expiryYear) - 2000}`
  }

  return (
    <div className="ShippingInfo">
      <div>Card Holder Name: {cardHolder}</div>
      <div>Card Info: **** **** **** {card.slice(card.length - 4, card.length)}</div>
      <div>Card Exiration: {valueDate}</div>
    </div>
  )
}

export default PaymentInfo