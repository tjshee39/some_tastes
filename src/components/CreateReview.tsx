import '../App.css';
import React, { useState, useEffect, KeyboardEvent } from 'react';
import Axios from 'axios';
import '../css/createReview.css';
import '../css/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarRating from './StarRating';

const CreateReview = ({ bno }: any) => {
    const [restaurant, setRestaurant] = useState('');
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');
    let reload = true;

    const getRating = (rating: React.SetStateAction<any>) => {
        setRating(rating);
    };

    useEffect(() => {
        Axios.get(`/api/restaurantDetail/${bno}`)
            .then((res) => {
                return res.data[0].restaurant;
            })
            .then((data) => {
                setRestaurant(data);
            });
    }, []);

    const handleChange = (e: any) => {
        setContent(e.target.value);
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            write();
        }

        if (reload == false) {
            e.preventDefault();
        }
    };

    const write = async () => {
        if (rating == null || rating == '') {
            reload = false;
            onKeyPress;
            alert('점수를 선택하지 않으셨어요!');
        } else if (content == '') {
            alert('리뷰 내용을 작성해주세요');
        } else {
            let data = {
                bno: bno,
                restaurant: '',
                content: '',
                rating: 0,
            };

            data.restaurant = restaurant;
            data.content = content;
            data.rating = parseInt(rating);

            await Axios.post('/api/createReview', data)
                .then((res) => {
                    return res;
                })
                .then((data) => {
                    alert('리뷰 등록 완료');
                    setContent('');
                    setRating('');

                    location.href = `/restaurantDetail/${bno}`;
                    return;
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    };

    return (
        <>
            <div className="content">
                <div className="area_create_review">
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
                            onKeyDown={onKeyPress}
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
