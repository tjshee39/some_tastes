import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailView from '../components/DetailView';

const RestaurantDetail = () => {
    return (
        <>
            <div className="App">
                <DetailView />
            </div>
        </>
    );
};

export default RestaurantDetail;
