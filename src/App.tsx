import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/images/logo.png';
import CreateBoard from './pages/CreateBoard';
import RestaurantList from './pages/RestaurantList';

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
                    <Route path="/createBoard" element={<CreateBoard />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
