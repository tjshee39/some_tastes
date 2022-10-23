import '../App.css';
import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailView from '../components/DetailView';

/**
 * RestaurantDetail class
 */

class RestaurantDetail extends Component {
    /**
     * @return { Component } Component
     */
    render() {
        return (
            <>
                <div className="App">
                    <DetailView />
                </div>
                ;
            </>
        );
    }
}

export default RestaurantDetail;
