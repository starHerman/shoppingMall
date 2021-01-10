import React from 'react'

const Rating = ({rating,numReviews,color}) => {
    return (
        <div className="rating">
            <span style={{color}}className={rating>1?"fas fa-star":rating>0.5?"fas fa-star-half-alt":"far fa-star"}></span>
            <span style={{color}}className={rating>2?"fas fa-star":rating>1.5?"fas fa-star-half-alt":"far fa-star"}></span>
            <span style={{color}}className={rating>3?"fas fa-star":rating>2.5?"fas fa-star-half-alt":"far fa-star"}></span>
            <span style={{color}}className={rating>4?"fas fa-star":rating>3.5?"fas fa-star-half-alt":"far fa-star"}></span>
            <span style={{color}}className={rating>5?"fas fa-star":rating>4.5?"fas fa-star-half-alt":"far fa-star"}></span>

            <span style={{marginLeft:"0.5rem"}}>{numReviews&& `${numReviews} reviews` }</span>

        </div>
    )
}
Rating.defaultProps={
    color:"gray"
}

export default Rating
