import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import LogoScreen from "./screens/LogoScreen.jsx";
import Signup from "./screens/Signup.jsx";
import Signup_2 from "./screens/Signup_2.jsx";
import Signup_3 from "./screens/Signup_3.jsx";
import Signup_4 from "./screens/Signup_4.jsx";
import Signup_5 from "./screens/Signup_5.jsx";
import Signup_6 from "./screens/Signup_6.jsx";
import Signup_7 from "./screens/Signup_7.jsx";
import Login from "./screens/Login.jsx";
import "/src/App.css";
import Signup_for_parents from "./screens/Signup_for_parents.jsx";

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<LogoScreen />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Signup_2" element={<Signup_2 />} />
                    <Route path="/Signup_3" element={<Signup_3 />} />
                    <Route path="/Signup_4" element={<Signup_4 />} />
                    <Route path="/Signup_5" element={<Signup_5 />} />
                    <Route path="/Signup_6" element={<Signup_6 />} />
                    <Route path="/Signup_7" element={<Signup_7/>} />
                    <Route path="/Signup_for_parents" element={<Signup_for_parents/>} />
                    <Route path="/Login" element={<Login />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;