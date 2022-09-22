import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardList from '../components/BoardList';

function ReviewBoard() {
    return (
        <div className="App">
            <BoardList></BoardList>
        </div>
    );
}

export default ReviewBoard;
