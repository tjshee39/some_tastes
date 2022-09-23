import '../App.css';
import '../css/fonts.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WriteRestaurant from '../components/WriteRestaurant';

function CreateBoard() {
    return (
        <>
            <div className="App">
                <div>
                    <WriteRestaurant />
                </div>
                <div>
                    <WriteRestaurant />
                </div>
            </div>
        </>
    );
}

export default CreateBoard;
