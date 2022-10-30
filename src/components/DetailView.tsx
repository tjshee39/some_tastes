import '../App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../css/detailView.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import addressLocation from '../assets/images/location.png';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

/**
 * RestaurantDetail class
 */

const DetailView = () => {
    const [detail, setDetail] = useState({
        restaurant: '',
        address: '',
        photo: '',
    });

    const { bno } = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:8000/restaurantDetail/${bno}`)
            .then((res) => {
                console.log('getDetail', res.data);

                return res.data;
            })
            .then((data) => {
                setDetail({
                    restaurant: data[0].restaurant,
                    address: data[0].address,
                    photo: data[0].photo,
                });
            });
    }, []);

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
                    <Link to={`/updateRestaurant/${bno}`}>
                        <div className="area_button">
                            <button className="board_update">수정</button>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default DetailView;
