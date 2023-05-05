import React, { useState } from "react";
import './rating.css';
import star from 'assets/images/star-grey.svg'
import starFilled from 'assets/images/star-solid.svg'

const StarRating = ({ name, setFieldValue}) => {  
    console.log(name)
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleChange = (newValue) => {
        console.log(newValue)
        setFieldValue(name, newValue);
      };
    
    
    console.log(rating)

    return (
        <div className="star-rating d-flex align-items-center">
            {[...Array(5)].map((el, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        onClick={() =>{ handleChange(index); setRating(index)}}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        {index <= (hover || rating) ? <img src={starFilled} width="18" height="18" alt="" /> :
                            <img src={star} width="18" height="18" alt="" />
                        }
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;

