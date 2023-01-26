import React from 'react'
import {BsFillStarFill} from 'react-icons/bs'

const Rating = ({rating}: {rating: string | undefined}) => {

  return (
    <div className={rating === "1" ? "rating star1" : rating === "2" ? "rating star2" : rating === "3" ? "rating star3" : rating === "4" ? "rating star4" : "rating star5"}>
        <i><BsFillStarFill /></i>
        <i><BsFillStarFill /></i>
        <i><BsFillStarFill /></i>
        <i><BsFillStarFill /></i>
        <i><BsFillStarFill /></i>
    </div>
  )
}

export default Rating