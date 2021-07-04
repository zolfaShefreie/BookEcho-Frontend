import './App.css';
import Routes from "./components/routers"
import Navbar from "./components/navbar"
import {BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Routes/>
            </BrowserRouter>
        </div>
    );
}

export default App;
