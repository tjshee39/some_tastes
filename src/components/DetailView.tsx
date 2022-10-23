import '../App.css';
import React from 'react';
import '../css/detailView.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

/**
 * RestaurantDetail class
 */

const DetailView = () => {
    const location = useLocation();
    const restaurant = location.state.restaurant;
    const address = location.state.address;
    const photo = location.state.photo;
    console.log(location);

    return (
        <>
            <div className="content">
                <div className="area_detail">
                    <div className="detail_restaurant">{restaurant}</div>
                    <div className="detail_address">{address}</div>
                    <div className="detail_photo">
                        <img src={photo} className="photo" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailView;
