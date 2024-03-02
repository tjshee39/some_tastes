import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import '../App.css';
import '../css/detailView.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import addressLocation from '../assets/images/location.png';
import CreateReview from '../components/CreateReview';
import RivewList from './ReviewList';
import ReviewChart from './ReviewChart';
import Modal from '../components/common/Modal';

const REACT_APP_HOME_URL: string | undefined = process.env.REACT_APP_HOME_URL;

interface ModalInfo {
    title: string;
    message: string;
    onConfirm: () => void;
}

const DetailView = () => {
    const onConfirm = () => {
        setModalShow(false);
    };

    const [modalShow, setModalShow] = useState(false);
    const [modalInfo, setModalInfo] = useState<ModalInfo>({
        title: '',
        message: '',
        onConfirm: onConfirm,
    });

    const setModalData = (title: string, message: string, onConfirm: () => void) => {
        setModalInfo({
            title: title,
            message: message,
            onConfirm: onConfirm,
        });

        setModalShow(true);
    }

    const [detail, setDetail] = useState({
        restaurant: '',
        address: '',
        photo: '',
    });

    const { bno } = useParams();

    const getRestaurantDetail = () => {
        Axios.get(`/api/restaurantDetail/${bno}`)
        .then((res) => {
            res.data[0].photo = REACT_APP_HOME_URL + res.data[0].photo
            return res.data;
        })
        .then((data) => {
            setDetail({
                restaurant: data[0].restaurant,
                address: data[0].address,
                photo: data[0].photo,
            });
        });
    }

    useEffect(() => {
        getRestaurantDetail();
    }, []);

    const deleteRestaurant = () => {
        Axios.post(`/api/deleteRestaurant/${bno}`)
            .then(() => {
                const title:string = '알림';
                const message:string = '정상적으로 삭제되었습니다.';

                setModalData(title, message, onConfirm);

                location.href = '/';
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            {modalShow && (
                <Modal
                    title={modalInfo.title}
                    message={modalInfo.message}
                    onConfirm={modalInfo.onConfirm}
                />
            )}

            <div className="content">
                <div className="area_detail">
                    <div className="detail_photo">
                        <img src={detail.photo} className="photo" alt='식당' />
                    </div>
                    <div className="area_text">
                        <div className="detail_restaurant">{detail.restaurant}</div>
                        <div className="area_detail_address">
                            <div className="area_location_icon">
                                <img src={addressLocation} className="img_location" alt='위치 아이콘'/>
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
