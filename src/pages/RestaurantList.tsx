import '../App.css';
import React, { useState } from 'react';
import { Component } from 'react';
import Axios from 'axios';
import $ from 'jquery';
import '../css/restaurantList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import pencil from '../assets/images/pencil.png';

/**
 * RestaurantList class
 */

class RestaurantList extends Component {
    API_BASE_URL = process.env.REACT_APP_HOME_URL;

    Restaurants = ({
        bno,
        restaurant,
        address,
        photo,
        rating,
    }: {
        bno: number;
        restaurant: string;
        address: string;
        photo: string;
        rating: number;
    }) => {
        return (
            <>
                <Link to={`/restaurantDetail/${bno}`}>
                    <div className="content">
                        <tr>
                            <td>
                                <img src={photo} className="content_img" />
                            </td>
                        </tr>
                        <tr>
                            <td className="content_restaurant">{restaurant}</td>
                        </tr>
                        <tr>
                            <td className="content_review_rating">★{rating}</td>
                        </tr>
                    </div>
                </Link>
            </>
        );
    };

    state = {
        restaurantList: [],
    };

    getList = () => {
        Axios.get('/api/restaurantList', {})
            .then((res) => {
                console.log('node_env', process.env.NODE_ENV);
                console.log('mode', process.env.REACT_APP_MODE);
                const { data } = res;
                data.forEach((restaurant: any) => {
                    restaurant.photo = this.API_BASE_URL + restaurant.photo;
                });
                this.setState({
                    restaurantList: data,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    // 컴포넌트 인스턴스가 생성되어 DOM에 삽입될 때 호출
    // 화면 렌더링 되자마자 실행
    componentDidMount() {
        this.getList();

        if (process.env.REACT_APP_MODE != 'prod') {
            $('.board_create').hide();
        }
    }

    /**
     * @return { Component } Component
     */
    render() {
        // restaurants 리스트를 파라미터로 넘겨받아 반복할 element return
        const { restaurantList }: { restaurantList: any } = this.state;

        return (
            <div className="App">
                <div className="area_btn">
                    <div className="board_create">
                        <Link to="/postRestaurant/create">
                            <img src={pencil} className="btn_board_create" title="음식점 등록" />
                        </Link>
                    </div>
                </div>
                <div className="container">
                    {restaurantList.map((v: any) => {
                        return (
                            <this.Restaurants
                                bno={v.bno}
                                restaurant={v.restaurant}
                                address={v.address}
                                photo={v.photo}
                                rating={v.rating}
                                key={v.bno}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default RestaurantList;
