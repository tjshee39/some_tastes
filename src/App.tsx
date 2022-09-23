import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/images/logo.png';
import CreateBoard from './pages/CreateBoard';
import ReviewBoard from './pages/ReviewBoard';

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
                    <Route path="/" element={<ReviewBoard />} />
                    <Route path="/createBoard" element={<CreateBoard />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
