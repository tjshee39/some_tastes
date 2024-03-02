import '../App.css';
import React from 'react';
import '../css/restaurantList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const REACT_APP_HOME_URL: string | undefined = process.env.REACT_APP_HOME_URL;

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
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <img 
                                        src={`${REACT_APP_HOME_URL}${restaurant.photo}`} 
                                        className="content_img"
                                        alt='식당사진'
                                    />
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="content_restaurant">{restaurant.restaurant}</td>
                            </tr>
                            <tr>
                                <td className="content_review_rating">★{restaurant.rating}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Link>
        </>
    );
};

export default Restaurant;
