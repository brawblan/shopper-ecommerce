import React from 'react'

const ShippingInfo = ({ shippingInformation }) => {
  const {firstName, lastName, address, city, state, zipcode} = shippingInformation

  return (
    <div className="ShippingInfo">
      <p>{`${firstName} ${lastName}`}</p>
      <p>{`${address}`}</p>
      <p>{`${city}, ${state} ${zipcode}`}</p>
    </div>
  )
}

export default ShippingInfo
