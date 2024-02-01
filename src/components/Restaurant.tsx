import '../App.css';
import React from 'react';
import '../css/restaurantList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

interface Restaurant {
    bno: number;
    restaurant: string;
    address: string;
    photo: string;
    rating: number;
}

const Restaurant = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <>
            <Link to={`/restaurantDetail/${restaurant.bno}`}>
                <div className="content">
                    <tr>
                        <td>
                            <img src={location.origin + restaurant.photo} className="content_img" />
                        </td>
                    </tr>
                    <tr>
                        <td className="content_restaurant">{restaurant.restaurant}</td>
                    </tr>
                    <tr>
                        <td className="content_review_rating">★{restaurant.rating}</td>
                    </tr>
                </div>
            </Link>
        </>
    );
};

export default Restaurant;
