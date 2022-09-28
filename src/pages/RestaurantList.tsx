import '../App.css';
import React from 'react';
import { Component } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import '../css/restaurantList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import pencil from '../assets/images/pencil.png';

const Restaurants = ({ restaurant, photo, rating }: { restaurant: string; photo: string; rating: number }) => {
    return (
        <>
            <div className="content">
                <tr>
                    <td className="content_img">{photo}</td>
                </tr>
                <tr>
                    <td className="content_restaurant">{restaurant}</td>
                </tr>
                <tr>
                    <td className="content_review_rating">★{rating}</td>
                </tr>
            </div>
        </>
    );
};

/**
 * Restaurant class
 */

class RestaurantList extends Component {
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
                        <Link to="/createBoard">
                            <img src={pencil} title="음식점등록" className="btn_board_create" />
                        </Link>
                    </div>
                </div>
                <div className="container">
                    {restaurantList.map((v: any) => {
                        return (
                            <Restaurants
                                photo={v.photo}
                                restaurant={v.restaurant}
                                rating={v.rating}
                                key={v.restaurant}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

// function RestaurantList() {
//     return (
//         <>
//             <div className="App">
//                 <div className="area_btn">
//                     <div className="board_create">
//                         <Link to="/createBoard">
//                             <button className="btn_board_create">글작성</button>
//                         </Link>
//                     </div>
//                 </div>
//                 <Restaurant></Restaurant>
//             </div>
//         </>
//     );
// }

export default RestaurantList;
