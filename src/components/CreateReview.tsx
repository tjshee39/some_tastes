import '../App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../css/createReview.css';
import '../css/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';

const CreateReview = () => {
    const [restaurant, setRestaurant] = useState('');
    const [rating, setRating] = useState(Number);
    const [content, setContent] = useState('');

    const { bno } = useParams();

    const getRating = (rating: React.SetStateAction<number>) => {
        setRating(rating);
    };

    useEffect(() => {
        Axios.get(`http://localhost:8000/restaurantDetail/${bno}`)
            .then((res) => {
                // console.log('getDetail', res.data);

                return res.data[0].restaurant;
            })
            .then((data) => {
                setRestaurant(data);
            });
    }, []);

    const handleChange = (e: any) => {
        setContent(e.target.value);
    };

    return (
        <>
            <div className="content">
                <div className="area_review">
                    <span className="info_restaurant">{restaurant}</span>
                    <div className="area_starRating">
                        <StarRating key={bno} value={rating} getRating={getRating} />
                    </div>
                    <form className="form_content">
                        <input
                            className="input_content"
                            type="text"
                            name="content"
                            onChange={handleChange}
                            placeholder="리뷰 내용을 작성하세요"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateReview;
