import '../App.css';
import React, { useState } from 'react';
import { Component } from 'react';
import Axios from 'axios';
import '../css/restaurantList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import pencil from '../assets/images/pencil.png';

/**
 * RestaurantList class
 */

class RestaurantList extends Component {
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
        Axios.get('http://localhost:8000/restaurantList', {})
            .then((res) => {
                const { data } = res;
                this.setState({
                    restaurantList: data,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    // 컴포넌트 인스턴스가 생성되어 DOM에 삽입될 때 호출
    // 화면이 출력되자마자 렌더링 해야하는 데이터를 가져올 때 해당 메서드 안에 axios 사용  (??????)
    componentDidMount() {
        this.getList();
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
