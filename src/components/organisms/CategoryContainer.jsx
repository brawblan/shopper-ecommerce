import React from 'react'
import style from '../pages/Homepage.module.scss'
import image from '../assets/images/mainbackground.png'

import CategoryCard from '../molecules/CategoryCard'

const CategoryContainer = ({ data, categoryDisplay, onClick, background }) => {
  const newData = data.map((item) => ({
    category: item.category,
    image: item.image,
    id: item.id,
  }))

  const newNewArr = (arr, key) => [
    ...new Map(arr.map((item) => [item[key], item])).values(),
  ]

  const categoryData = newNewArr(newData, 'category')

  return (
    <div className={style.CategoryContainer}>
      <CategoryCard
        data={{ category: 'All', image: image }}
        categoryDisplay={categoryDisplay}
        key={`category_all`}
        onClick={onClick}
        background={background}
      />
      {categoryData.map((item) => (
        <CategoryCard
          data={item}
          categoryDisplay={categoryDisplay}
          key={`category_${item.id}`}
          onClick={onClick}
          background={background}
        />
      ))}
    </div>
  )
}

export default CategoryContainer
