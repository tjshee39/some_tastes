import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../App.css';
import '../css/createReview.css';
import '../css/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarRating from './StarRating';
import Modal from '../components/common/Modal';

interface ModalInfo {
    title: string;
    message: string;
    onConfirm: () => void;
}

const CreateReview = ({ bno }: any) => {
    const onConfirm = () => {
        setModalShow(false);
    };

    const createReviewConfirm = () => {
        setModalShow(false);
        location.href = `/restaurantDetail/${bno}`;
    }

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

    const [restaurant, setRestaurant] = useState('');
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');
    let reload = true;

    const getRating = (rating: React.SetStateAction<any>) => {
        setRating(rating);
    };

    const getRestaurantDetail = () => {
        Axios.get(`/api/restaurantDetail/${bno}`)
        .then((res) => {
            return res.data[0].restaurant;
        })
        .then((data) => {
            setRestaurant(data);
        });
    }

    useEffect(() => {
        getRestaurantDetail();
    }, []);

    const handleChange = (e: any) => {
        setContent(e.target.value);
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            write();
        }

        if (!reload) e.preventDefault();
    };

    const write = async () => {
        if (rating == null || rating == '') {
            reload = false;
            onKeyPress;

            const title:string = '알림';
            const message:string = '점수를 선택하지 않으셨어요!';

            setModalData(title, message, onConfirm);
        } else if (content == '') {
            const title:string = '알림';
            const message:string = '리뷰 내용을 작성해주세요.';

            setModalData(title, message, onConfirm);
        } else if (content.length > 100) {
            const title:string = '알림';
            const message:string = '리뷰는 최대 100글자까지 작성할 수 있습니다.';

            setModalData(title, message, onConfirm);
        } else {
            let data = {
                bno: bno,
                restaurant: '',
                content: '',
                rating: 0,
            };

            data.restaurant = restaurant;
            data.content = content;
            data.rating = parseInt(rating);

            await Axios.post('/api/createReview', data)
                .then((res) => {
                    return res;
                })
                .then((data) => {
                    const title:string = '알림';
                    const message:string = '리뷰 등록 완료';

                    setModalData(title, message, createReviewConfirm);

                    setContent('');
                    setRating('');

                    return;
                })
                .catch((e) => {
                    console.error(e);
                });
        }
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
                <div className="area_create_review">
                    <span className="info_restaurant">🍴{restaurant}🍴</span>
                    <div className="area_starRating">
                        <StarRating key={bno} value={rating} getRating={getRating} />
                    </div>
                    <form className="form_content">
                        <textarea
                            className="input_content"
                            name="content"
                            onChange={handleChange}
                            placeholder="리뷰 내용을 작성하세요✍"
                            // onKeyDown={onKeyPress}
                        />
                    </form>
                    <div className="area_btn">
                        <button className="btn_review_register" onClick={write}>
                            리뷰작성
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateReview;
