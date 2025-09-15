import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InitialOnboarding from "./screens/InitialOnboarding";
import { SignupProvider } from "./data/SignupData.jsx";
import Login from "./screens/Login.jsx";
import Signup_for_parents from "./screens/Signup_for_parents.jsx";
import Signup_0 from "./screens/steps/Signup_0.jsx";
import Signup_1 from "./screens/steps/Signup_1.jsx";
import SignUp_2 from "./screens/steps/Signup_2.jsx";
import Signup_3 from "./screens/steps/Signup_3.jsx";
import Signup_4 from "./screens/steps/Signup_4.jsx";
import Signup_5 from "./screens/steps/Signup_5.jsx";
import Signup_6 from "./screens/steps/Signup_6.jsx";
import Signup_7 from "./screens/steps/Signup_7.jsx";
import Signup_success from "./screens/Signup_success.jsx";
import Home from "./screens/Home.jsx";

export default function App() {
    return (
        <Router>
            <SignupProvider>
                <Routes>
                    <Route path="/" element={<InitialOnboarding />} />
                    <Route path="/signup" element={<Signup_0 />} />
                    <Route path="/signup_1" element={<Signup_1 />} />
                    <Route path="/signup_2" element={<SignUp_2 />} />
                    <Route path="/signup_3" element={<Signup_3 />} />
                    <Route path="/signup_4" element={<Signup_4 />} />
                    <Route path="/signup_5" element={<Signup_5 />} />
                    <Route path="/signup_6" element={<Signup_6 />} />
                    <Route path="/signup_7" element={<Signup_7 />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup_for_parents" element={<Signup_for_parents />} />
                    <Route path="/signup_success" element={<Signup_success />} />
                    <Route path="/Home" element={<Home />} />
                </Routes>
            </SignupProvider>
        </Router>
    );
}