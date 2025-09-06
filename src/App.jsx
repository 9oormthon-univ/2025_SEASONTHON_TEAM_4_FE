import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import LogoScreen from "./screens/LogoScreen.jsx";
import Signup from "./screens/Signup.jsx";
import Login from "./screens/Login.jsx";
import "/src/App.css";

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<LogoScreen />} />
                    <Route path="/" element={<Signup />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;