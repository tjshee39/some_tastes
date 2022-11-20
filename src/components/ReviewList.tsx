import '../App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../css/createReview.css';
import '../css/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { stringify } from 'querystring';

const ReviewList = ({ bno }: any) => {
    const [reviewDetail, setReviewDetail] = useState({
        rating: 0,
        review: '',
        regdate: '',
    });

    let state = {
        reviewList: [],
    };

    useEffect(() => {
        Axios.get(`http://localhost:8000/reviewList/${bno}`)
            .then((res) => {
                console.log('getDetail', res.data);

                return res.data;
            })
            .then((data) => {
                state = {
                    reviewList: data,
                };

                console.log(state);
            });
    }, []);

    let Reviews = ({ rating, content, regdate }: { rating: number; content: string; regdate: string }) => {
        return (
            <>
                <div className="area_review">
                    <div className="area_rating">111{rating}</div>
                    <div className="area_content">222{content}</div>
                    <div className="area_regdate">333{regdate}</div>
                </div>
            </>
        );
    };

    const { reviewList }: { reviewList: any } = state;

    return (
        <>
            {reviewList.map((v: any) => {
                return <Reviews rating={v.rating} content={v.content} regdate={v.regdate} key={v.rating} />;
            })}
        </>
    );
};

export default ReviewList;
