import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.png";
import logo3 from "../assets/logo3.png";

function InitialOnboarding() {
    const [IsSplash, setIsSplash] = useState(true);
    const [up, setUp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => setUp(true), 700);
        return () => clearTimeout(t);
    }, []);

    const handleTransitionEnd = () => {
        if (up) setIsSplash(false);
    };

    return (
        <div className="screen">
            {IsSplash ? (
                <div className="screen-1">
                    <img
                        src={logo3} alt="logo"
                        className={`logo ${up ? "up" : ""} w-[120px]`}
                        onTransitionEnd={handleTransitionEnd}
                    />
                </div>
            ) : (
                <div className="screen-2">
                    <div className="logo-layer">
                        <img src={logo} alt="logo" className="logo up w-[125px]" />
                    </div>
                    <div className="top-content">
                        <h1 className="app-name">단짝이</h1>
                        <p className="app-content">건강을 지켜주는 든든한 짝꿍</p>
                    </div>
                    <div className="bottom-buttons">
                        <button className="action-button primary"
                                onClick={()=>{navigate("/signup")}}>회원가입</button>
                        <button className="action-button secondary"
                                onClick={()=>{navigate("/login")}}>로그인</button>
                        <button className="action-button third"
                                onClick={()=>{navigate("/parent/signup")}}><span className="highlight">아이 코드</span>로 로그인하기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InitialOnboarding;
