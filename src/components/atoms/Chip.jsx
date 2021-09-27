import React from 'react'

const Chip = ({ active, text }) => {
  return (
    <div className={`Chip Center SmallText ${active ? 'Active' : null}`}>
      {text}
    </div>
  )
}

export default Chip
