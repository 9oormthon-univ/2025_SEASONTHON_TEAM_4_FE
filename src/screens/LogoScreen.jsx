import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./LogoScreen.css";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import logo from "../assets/logo.png"

function LogoScreen () {
    const navigate = useNavigate();
    const [step, setStep] = useState("first");

    useEffect(() => {
        const timer = setTimeout(() => {
            setStep("second");
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`screen ${step === "first" ? "screen-1" : "screen-2"}`}>
            <div
                className={`logo ${step === "second" ? "logo-up" : ""}`}
            >
                <img src={logo} alt="logo" className="logo-image" />
            </div>

            {step === "second" && (
                <div className="content">
                    <h2 className="app-name">Glucare</h2>
                    <div className="button-container">
                        <button
                            className="action-button"
                            onClick={() => navigate("/Signup")}
                        >
                            회원가입
                        </button>
                        <button
                            className="action-button"
                            onClick={() => navigate("/Login")}
                        >
                            로그인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LogoScreen