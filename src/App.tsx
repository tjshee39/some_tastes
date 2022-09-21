import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from 'images/logo.png';
import CreateBoard from 'pages/CreateBoard';
import ReviewBoard from 'pages/ReviewBoard';

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="App">
                    <div className="banner">
                        <img src={logo} className="logo_img" />
                    </div>
                    <div className="area_btn">
                        <div className="review_board">
                            <Link to="/reviewBoard">
                                <button className="btn_review_board">메인</button>
                            </Link>
                        </div>
                        <div className="board_create">
                            <Link to="/createBoard">
                                <button className="btn_board_create">글작성</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Routes>
                    <Route path="/reviewBoard" element={<ReviewBoard />} />
                    <Route path="/createBoard" element={<CreateBoard />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
