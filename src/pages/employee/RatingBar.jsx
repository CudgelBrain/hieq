import React, { useState } from "react";
import './rating.css';
import star from 'assets/images/star-grey.svg'
import starFilled from 'assets/images/star-solid.svg'
import deleteImg from 'assets/images/employee/delete.svg'

const StarRating = ({ name, setFieldValue, remove, itemIndex }) => {
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
                        className="p-0"
                        key={index}
                        onClick={() => { handleChange(index); setRating(index) }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        {index <= (hover || rating) ? <img src={starFilled} width="18" height="18" alt="" /> :
                            <img  src={star} width="18" height="18" alt="" />
                        }
                    </button>
                );
            })}
            {<button className="plus-btn ml-4" type="button" onClick={() => remove(itemIndex)}
                disabled={itemIndex < 3}
            ><img src={deleteImg}

                width="16" height="18" alt="" /></button>}
        </div>
    );
};

export default StarRating;

