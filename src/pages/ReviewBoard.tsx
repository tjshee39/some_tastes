import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardList from '../components/BoardList';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import CreateBoard from './CreateBoard';

function ReviewBoard() {
    return (
        <>
            <div className="App">
                <div className="area_btn">
                    <div className="board_create">
                        <Link to="/createBoard">
                            <button className="btn_board_create">글작성</button>
                        </Link>
                    </div>
                </div>
                <BoardList></BoardList>
            </div>
        </>
    );
}

export default ReviewBoard;
