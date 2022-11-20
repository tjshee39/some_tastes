import '../App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from 'react-icons/fa';
import '../css/createReview.css';
import { prototype } from 'stream';

const StarRating = (props: any) => {
    const [rating, setRating] = useState<any>(null);
    const [hover, setHover] = useState<any>(null);

    // CreateReview로 rating 전송
    useEffect(() => {
        props.getRating(rating);
    }, [rating]);

    const onChangeHandler = (e: any) => {};

    return (
        <>
            <div className="content">
                <div className="area_starRating">
                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                            <label>
                                <input
                                    className="rating"
                                    type="radio"
                                    name="star"
                                    value={ratingValue}
                                    onChange={(e) => onChangeHandler(e)}
                                    onClick={() => setRating(ratingValue)}
                                />
                                <FaStar
                                    key={rating}
                                    className="star"
                                    color={ratingValue <= (hover || rating) ? '#f8bd11' : '#e4e5e9'}
                                    size={40}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default StarRating;
