import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from 'images/logo.png';
import BoardList from 'components/BoardList';

function App() {
    return (
        <div className="App">
            <div className="banner">
                <img src={logo} className="logo_img" />
            </div>
            <BoardList></BoardList>
        </div>
    );
}

export default App;
