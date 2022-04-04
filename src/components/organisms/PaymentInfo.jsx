import React from 'react'

const PaymentInfo = ({ paymentInformation }) => {
  const {card, cardHolder, expiry, securityCode} = paymentInformation

  return (
    <div className="ShippingInfo">
      <div>Card Holder Name: {cardHolder}</div>
            <div>Card Info: **** **** **** {card.slice(card.length - 4, card.length)}</div>
            <div>Card Exiration: {`${expiry.month}/${expiry.year}`}</div>
    </div>
  )
}

export default PaymentInfo