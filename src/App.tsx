import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/images/logo.png';
import CreateRestaurant from './pages/CreateRestaurant';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetail from './pages/RestaurantDetail';

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="App">
                    <div className="banner">
                        <Link to="/">
                            <img src={logo} className="logo_img" />
                        </Link>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={<RestaurantList />} />
                    <Route path="/restaurantList" element={<RestaurantList />} />
                    <Route path="/createRestaurant" element={<CreateRestaurant />} />
                    <Route path="/restaurantDetail/:bno" element={<RestaurantDetail />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
