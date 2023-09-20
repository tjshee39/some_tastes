import '../App.css';
import '../css/fonts.css';
import React from 'react';
import { Component, useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/postRestaurant.css';
import restaurant from '../assets/images/restaurant.png';
import address from '../assets/images/location.png';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

// 허용가능한 확장자 목록
const ALLOW_FILE_EXTENSION = 'jpg,jpeg,png';
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB

// 파일명으로부터 확장자 반환
const removeFileName = (originalFileName: string): string => {
    // 마지막 '.'의 위치를 통해 확장자 확인
    const lastIndex = originalFileName.lastIndexOf('.');

    // 파일 이름에 '.'이 존재하지 않음
    if (lastIndex < 0) {
        return '';
    }

    // 마지막 '.'부터 파일명(문자열)의 끝부분까지 잘라 확장자 구함
    // 확장자를 소문자로 변경
    return originalFileName.substring(lastIndex + 1).toLowerCase();
};

// 선택한 파일의 확장자가 업로드 가능한지 확인
const fileExtensionValid = ({ name }: { name: string }): boolean => {
    // 파일 확장자
    const extension = removeFileName(name);

    // const ALLOW_FILE_EXTENSION = 'jpg,jpeg,png';
    // 선택한 파일의 확장자가 'ALLOW_FILE_EXTENSION'에 포함되지 않음
    if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') {
        return false;
    }
    // 업로드 가능한 파일
    return true;
};

const UpdateRestaurant = () => {
    const [detail, setDetail] = useState({
        restaurant: '',
        photo: '',
        // fileName: '',
    });

    const [detailAddress, setAddress] = useState('');

    const [fileInfo, setFile] = useState({
        file: '',
        fileName: '',
    });

    const [imageUrl, setImageUrl] = useState<any>(null);
    const imageRef = useRef<any>(null);

    const { bno } = useParams();

    useEffect(() => {
        Axios.get(`/api/restaurantDetail/${bno}`)
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                setDetail({
                    restaurant: data[0].restaurant,
                    photo: data[0].photo,
                });

                setAddress(data[0].address);
            });
    }, []);

    const handleChange = (e: any) => {
        setAddress(e.target.value);
    };

    const SelectImage = (props: any) => {
        const onChangeImage = (e: any) => {
            const reader = new FileReader();
            const file = imageRef.current.files[0];

            // 파일 확장자 체크
            if (!fileExtensionValid(file)) {
                file.value = '';
                alert(`이미지를 업로드 해주세요. [${ALLOW_FILE_EXTENSION}]`);
                return;
            }

            // 파일 용량 체크
            if (file.size > FILE_SIZE_MAX_LIMIT) {
                file.value = '';
                alert('업로드 가능한 최대 용량은 5MB 입니다.');
                return;
            }

            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageUrl(reader.result);

                setFile({
                    file: e.target.files[0],
                    fileName: e.target.value,
                });
            };
        };

        return (
            <>
                <form className="form_photo" encType="multipart/form-data">
                    <img src={imageUrl ? imageUrl : detail.photo} className="select_img" />
                    <label htmlFor="file">이미지 업로드</label>
                    <input
                        className="btn_img_upload"
                        type="file"
                        name="file"
                        id="file"
                        accept="image/jpeg, image/png, image/jpg"
                        ref={imageRef}
                        onChange={onChangeImage}
                    />
                </form>
            </>
        );
    };

    const update = () => {
        if (detail.restaurant === '' || detailAddress === '') {
            alert('모든 항목을 작성해주세요');
        } else {
            const formData = new FormData();
            formData.append('restaurant', detail.restaurant);
            formData.append('address', detailAddress);
            formData.append('photo', fileInfo.file);
            formData.append('existingPhoto', detail.photo);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };

            Axios.post(`/api/updateRestaurant/${bno}`, formData, config)
                .then((res) => {
                    alert('음식점 수정 완료');

                    location.href = `/restaurantDetail/${bno}`;
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    };

    return (
        <>
            <div className="App">
                <div className="area_upload_img">
                    <SelectImage />
                </div>
                <div className="area_restaurant">
                    <div>
                        <img src={restaurant} className="img_restaurant" />
                    </div>
                    <form className="form_restaurant">
                        <input className="input_box" type="text" name="restaurant" value={detail.restaurant} readOnly />
                    </form>
                </div>
                <div className="area_address">
                    <div>
                        <img src={address} className="img_address" />
                    </div>
                    <form className="form_address">
                        <input
                            className="input_box"
                            type="text"
                            name="address"
                            placeholder={detailAddress}
                            onChange={handleChange}
                        />
                    </form>
                </div>
                <div className="area_btn">
                    <button className="btn_restaurant_register" onClick={update}>
                        수정
                    </button>
                </div>
            </div>
        </>
    );
};

export default UpdateRestaurant;
