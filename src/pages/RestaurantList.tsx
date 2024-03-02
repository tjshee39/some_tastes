import '../App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../css/restaurantList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import pencil from '../assets/images/pencil.png';
import Restaurant from '../components/Restaurant';

interface Restaurants {
    bno: number;
    restaurant: string;
    address: string;
    photo: string;
    rating: number;
}

const RestaurantList = () => {
    const [restaurantList, setRestaurantList] = useState<Restaurants[]>([]);

    useEffect(() => {
        const getRestaurantList = () => {
            Axios.get(`/api/restaurantList`)
                .then((res) => {
                    setRestaurantList(res.data);
                })
                .catch((e) => {
                    console.error(e);
                });
        };

        getRestaurantList();
    }, []);

    return (
        <div className="App">
            <div className="area_btn">
                <div className="board_create">
                    <Link to="/postRestaurant/create">
                        <img src={pencil} className="btn_board_create" title="음식점 등록" alt='등록'/>
                    </Link>
                </div>
            </div>
            <div className="container">
                {restaurantList.map((restaurant) => (
                    <Restaurant key={restaurant.bno} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default RestaurantList;
