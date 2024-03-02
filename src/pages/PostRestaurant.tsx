import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import '../App.css';
import '../css/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/postRestaurant.css';
import restaurant from '../assets/images/restaurant.png';
import address from '../assets/images/location.png';
import defaultImage from '../assets/images/default_image.png';
import RestaurantSearchModal from '../components/RestaurantSearchModal';
import Modal from '../components/common/Modal';

interface ModalInfo {
    title: string;
    message: string;
    onConfirm: () => void;
}

interface RestaurantSearchModalInfo {
    onConfirm: () => void;
}

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

const PostRestaurant = () => {
    const status = useParams().status;
    const API_BASE_URL = process.env.REACT_APP_HOME_URL;

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
        photo: defaultImage,
        address: '',
        // fileName: '',
    });

    const [fileInfo, setFile] = useState({
        file: '',
        fileName: '',
    });

    const [imageUrl, setImageUrl] = useState<any>(null);
    const imageRef = useRef<any>(null);

    const [txtRestaurant, setTxtRestaurant] = useState('');
    const [restaurantReadOnly, setRestaurantReadOnly] = useState<boolean>(false);
    const [txtAddress, setTxtAddress] = useState('주소를 입력하세요');
    const [btnTitle, setBtnTitle] = useState('등록');

    const searchRestaurantDone = () => {
        setRestaurantSearchModalShow(false)
    }
    const [restaurantSearchModalShow, setRestaurantSearchModalShow] = useState(false);
    const [restaurantSearchModalInfo, setRestaurantSearchModalInfo]
        = useState<RestaurantSearchModalInfo>({
            onConfirm: searchRestaurantDone,
        });

    useEffect(() => {
        if (status != 'create') {
            Axios.get(`/api/restaurantDetail/${status}`)
                .then((res) => {
                    return res.data[0];
                })
                .then((data) => {
                    setDetail({
                        restaurant: data.restaurant,
                        photo: API_BASE_URL + data.photo,
                        address: data.address,
                    });

                    setTxtRestaurant(data.restaurant);
                    setRestaurantReadOnly(true);
                    setTxtAddress(data.address);
                    setBtnTitle('수정');
                });
        }
    }, []);

    const handleChange = (e: any) => {
        const { value, name } = e.target;
        setTxtRestaurant(value);

        setDetail({
            ...detail,
            [name]: value,
        });
    };

    const SelectImage = (props: any) => {
        // const [imageUrl, setImageUrl] = useState<any>(null);
        // const imageRef = useRef<any>(null);

        const onChangeImage = (e: any) => {
            const reader = new FileReader();
            const file = imageRef.current.files[0];

            // 파일 확장자 체크
            if (!fileExtensionValid(file)) {
                file.value = '';
                const title:string = '알림';
                const message:string = `이미지를 업로드 해주세요. [${ALLOW_FILE_EXTENSION}]`;

                setModalData(title, message, onConfirm);

                return;
            }

            // 파일 용량 체크
            if (file.size > FILE_SIZE_MAX_LIMIT) {
                file.value = '';
                const title:string = '알림';
                const message:string = '업로드 가능한 최대 용량은 5MB 입니다.';

                setModalData(title, message, onConfirm);

                return;
            }

            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageUrl(reader.result);

                setFile({
                    file: e.target.files[0],
                    fileName: e.target.value,
                });

                setDetail({
                    ...detail,
                    photo: e.target.value,
                });
            };
        };

        return (
            <>
                <form className="form_photo" encType="multipart/form-data">
                    <img src={imageUrl ? imageUrl : detail.photo} className="select_img" alt='선택한 이미지'/>
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

    const validCheck = (restaurant: string, address: string, photo: string) => {
        if (restaurant === '') {
            const title:string = '알림';
            const message:string = '식당명을 입력해주세요.';

            setModalData(title, message, onConfirm);

            return false;
        }

        if (address === '') {
            const title:string = '알림';
            const message:string = '식당 위치를 입력해주세요.';

            setModalData(title, message, onConfirm);

            return false;
        }

        if (photo === '/default_image.png') {
            const title:string = '알림';
            const message:string = '식당 이미지를 등록해주세요.';

            setModalData(title, message, onConfirm);

            return false;
        }

        return true;
    };

    const post = () => {
        if (validCheck(detail.restaurant, detail.address, detail.photo)) {
            const formData = new FormData();
            formData.append('restaurant', detail.restaurant);
            formData.append('address', detail.address);
            formData.append('photo', fileInfo.file);
            formData.append('existingPhoto', detail.photo);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };

            if (status == 'create') {
                Axios.get('/api/existRestaurant', {
                    params: { restaurant: detail.restaurant }
                }).then((res) => {
                    return res.data[0];
                }).then((data) => {
                    const count = data.COUNT;
                    if (count != 0) {
                        const title:string = '알림';
                        const message:string = '이미 등록된 음식점입니다.';

                        setModalData(title, message, onConfirm);
                    } else {
                        Axios.post('/api/createRestaurant', formData, config)
                        .then((res) => {
                            if (res.data != 'undefined') {
                                const title:string = '알림';
                                const message:string = '음식점 등록 완료';

                                setModalData(title, message, onConfirm);

                                location.href = '/';
                            } else {
                                const title:string = '알림';
                                const message:string = '동일한 음식점이 등록되어있습니다.';

                                setModalData(title, message, onConfirm);
                            }
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                    }
                });
            } else {
                Axios.post(`/api/updateRestaurant/${status}`, formData, config)
                    .then((res) => {
                        const title:string = '알림';
                        const message:string = '음식점 수정 완료';

                        setModalData(title, message, onConfirm);

                        location.href = `/restaurantDetail/${status}`;
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            }
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

            {restaurantSearchModalShow && (
                <RestaurantSearchModal
                    onConfirm={restaurantSearchModalInfo.onConfirm}
                />
            )}

            <div className="App">
                <div className="area_upload_img">
                    <SelectImage />
                </div>
                <div className="area_restaurant">
                    <div>
                        <img src={restaurant} className="img_restaurant" alt='식당'/>
                    </div>
                    <form className="form_restaurant">
                        <input
                            id="input_restaurant"
                            className="input_box"
                            type="text"
                            name="restaurant"
                            onChange={handleChange}
                            placeholder="음식점을 입력하세요"
                            value={txtRestaurant}
                            readOnly={restaurantReadOnly}
                            onClick={() => setRestaurantSearchModalShow(true)}
                        />
                    </form>
                </div>
                <div className="area_address">
                    <div>
                        <img src={address} className="img_address" alt='주소아이콘'/>
                    </div>
                    <form className="form_address">
                        <input
                            id="input_address"
                            className="input_box"
                            type="text"
                            name="address"
                            placeholder={txtAddress}
                            onChange={handleChange}
                        />
                    </form>
                </div>
                <div className="area_btn">
                    <button
                        className="btn_restaurant_register"
                        onClick={post}
                        id="btn_post"
                    >
                        { btnTitle }
                    </button>
                </div>
            </div>
        </>
    );
};

export default PostRestaurant;
