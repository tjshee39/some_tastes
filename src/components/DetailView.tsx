import '../App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../css/detailView.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import addressLocation from '../assets/images/location.png';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CreateReview from '../components/CreateReview';
import RivewList from './ReviewList';
import ReviewChart from './ReviewChart';

/**
 * DetailView
 */

const DetailView = () => {
    const [detail, setDetail] = useState({
        restaurant: '',
        address: '',
        photo: '',
    });

    const { bno } = useParams();

    useEffect(() => {
        Axios.get(`/api/restaurantDetail/${bno}`)
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                setDetail({
                    restaurant: data[0].restaurant,
                    address: data[0].address,
                    photo: location.origin + data[0].photo,
                });
            });
    }, []);

    const deleteRestaurant = () => {
        Axios.post(`/api/deleteRestaurant/${bno}`)
            .then(() => {
                alert('정상적으로 삭제되었습니다.');

                location.href = '/';
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <div className="content">
                <div className="area_detail">
                    <div className="detail_photo">
                        <img src={detail.photo} className="photo" />
                    </div>
                    <div className="area_text">
                        <div className="detail_restaurant">{detail.restaurant}</div>
                        <div className="area_detail_address">
                            <div className="area_location_icon">
                                <img src={addressLocation} className="img_location" />
                            </div>
                            <div className="detail_address">{detail.address}</div>
                        </div>
                    </div>
                    <div className="area_button">
                        <Link to={`/postRestaurant/${bno}`}>
                            <button className="board_update">수정</button>
                        </Link>
                        <button className="board_delete" onClick={deleteRestaurant}>
                            삭제
                        </button>
                    </div>
                </div>
                <div className="area_createReview">
                    <CreateReview key={bno} bno={bno} />
                </div>
                <div className="area_reviewChart">
                    <ReviewChart key={bno} bno={bno} />
                </div>
                <div className="area_reviews">
                    <RivewList key={bno} bno={bno} />
                </div>
            </div>
        </>
    );
};

export default DetailView;
