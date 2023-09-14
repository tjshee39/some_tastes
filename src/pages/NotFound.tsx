import '../App.css';
import '../css/fonts.css';
import '../css/notfound.css';
import React from 'react';
import ghost from '../assets/images/ghost_404.png';

const NotFound = () => {
    return (
        <>
            <div className="App">
                <div id="txt_404">404</div>
                <div id="txt_404_2">요청하신 페이지를 찾을 수 없습니다.</div>
                <div id="img_404">
                    <img src={ghost} className="img_ghost" />
                </div>
            </div>
        </>
    );
};

export default NotFound;
