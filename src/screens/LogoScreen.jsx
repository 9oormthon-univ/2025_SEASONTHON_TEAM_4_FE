import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./LogoScreen.css";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import logo from "../assets/logo.png"
import kakao from "../assets/kakao.png"

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
            <div className="top-content">
                <div className={`logo ${step === "second" ? "logo-up" : ""}`}>
                    <img src={logo} alt="logo" className="logo-image" />
                </div>
                {step === "second" && (
                    <>
                        <h1 className="app-name">단짝</h1>
                        <h2 className="app-content">1형 당뇨인을 위한 AI 비서</h2>
                    </>
                )}
            </div>

            {step === "second" && (
                <div className="bottom-buttons">
                    <button
                        className="action-button kakao-login"
                        onClick={() => navigate("/Signup")}
                    >
                        <img src={kakao} alt="카카오 아이콘" className="kakao-icon" />
                        카카오 로그인
                    </button>
                    <button
                        className="action-button signup-button"
                        onClick={() => navigate("/Signup")}
                    >
                        회원가입
                    </button>
                    <button
                        className="action-button code-login"
                        onClick={() => navigate("/Signup-with-code")}
                    >
                        <span className="highlight">아이 코드</span>로 로그인하기
                    </button>
                </div>
            )}
        </div>
    );

}

export default LogoScreen