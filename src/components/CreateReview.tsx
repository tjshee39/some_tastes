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
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');

    const { bno } = useParams();

    const getRating = (rating: React.SetStateAction<any>) => {
        setRating(rating);

        console.log('별점:', rating);
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

    const write = async () => {
        if (rating == null) {
            alert('점수를 선택하지 않으셨어요!');
        } else if (content == '') {
            alert('리뷰 내용을 작성해주세요');
        } else {
            let data = {
                restaurant: '',
                content: '',
                rating: 0,
            };

            data.restaurant = restaurant;
            data.content = content;
            data.rating = parseInt(rating);

            console.log('dd:', data);

            await Axios.post('http://localhost:8000/createReview', data)
                .then((res) => {
                    console.log(res);
                    alert('리뷰 등록 완료');
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    };

    return (
        <>
            <div className="content">
                <div className="area_re view">
                    <span className="info_restaurant">🍴{restaurant}🍴</span>
                    <div className="area_starRating">
                        <StarRating key={bno} value={rating} getRating={getRating} />
                    </div>
                    <form className="form_content">
                        <input
                            className="input_content"
                            type="text"
                            name="content"
                            onChange={handleChange}
                            placeholder="리뷰 내용을 작성하세요✍"
                        />
                    </form>
                    <div className="area_btn">
                        <button className="btn_review_register" onClick={write}>
                            리뷰작성
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateReview;
