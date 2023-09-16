import '../App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../css/reviewList.css';
import '../css/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewList = ({ bno }: any) => {
    const [reviewDetail, setReviewDetail] = useState({
        rating: 0,
        review: '',
        regdate: '',
    });

    let [reviewList, setReviewList]: any[] = useState([
        {
            rno: 0,
            restaurant: '',
            bno: 0,
            rating: 0,
            regdate: '',
            available: '',
            review: '',
        },
    ]);

    useEffect(() => {
        Axios.get(`/api/reviewList/${bno}`)
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                setReviewList(data);
            });
    }, []);

    const Reviews = ({ rating, review, regdate }: { rating: number; review: string; regdate: string }) => {
        return (
            <>
                <div className="area_review">
                    <div className="area_rating">
                        <span id="rating">★ </span>
                        {rating}
                    </div>
                    <div className="area_regdate">{regdate}</div>
                    <div className="area_content">{review}</div>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="review_container">
                {reviewList.map((v: any) => {
                    return <Reviews rating={v.rating} review={v.review} regdate={v.regdate} key={v.rating} />;
                })}
            </div>
        </>
    );
};

export default ReviewList;
