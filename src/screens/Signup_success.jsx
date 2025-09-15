import "../styles/Signup.css"
import icon from "../assets/icon.png"
import {useNavigate} from "react-router-dom";

function Signup_success() {
        const navigator= useNavigate();
    return (
        <div>
            <div className="title-bar"></div>
                <div className="frame">
                    <div className="text-area">
                        <h1>축하합니다</h1>
                        <h1>가입 완료됐습니다</h1>
                    </div>
                        <img className="signup-success-img"
                             src={icon} alt="signup-success-img" />
                        <button className="button-box"
                        onClick={() => {navigator("/Login")}}>로그인</button>
                </div>
        </div>
    )
}

export default Signup_success;
