import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/images/logo.png';
import CreateRestaurant from './pages/CreateRestaurant';
import PostRestaurant from './pages/PostRestaurant';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetail from './pages/RestaurantDetail';
import UpdateRestaurant from './pages/UpdateRestaurant';
import NotFound from './pages/NotFound';

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="App">
                    <div className="banner">
                        <Link to="/">
                            <img src={logo} className="App-logo" />
                        </Link>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={<RestaurantList />} />
                    <Route path="/restaurantList" element={<RestaurantList />} />
                    <Route path="/createRestaurant/:status" element={<CreateRestaurant />} />
                    <Route path="/postRestaurant/:status" element={<PostRestaurant />} />
                    <Route path="/restaurantDetail/:bno" element={<RestaurantDetail />} />
                    <Route path="/updateRestaurant/:bno" element={<UpdateRestaurant />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
