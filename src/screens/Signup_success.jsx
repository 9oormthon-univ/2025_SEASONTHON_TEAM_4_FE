import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.png";
import "../styles/Signup.css";

function Signup_success() {
    const navigator = useNavigate();
    
    return (
        <>
            <div className="title-bar"></div>
            <div className="frame">
                <div className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col gap-[32px]">
                        <div className="text-[28px] font-semibold">
                            <h1>축하합니다</h1>
                            <h1>가입 완료됐습니다</h1>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center flex-1 mt-[40px]">
                            <img 
                                className="max-w-[200px] h-auto animate-pulse"
                                src={icon} 
                                alt="signup-success-img" 
                            />
                        </div>
                    </div>

                    <button 
                        className="w-full h-[48px] bg-[#00BBA9] rounded-[12px] text-[#FFFFFF] font-semibold text-[18px] cursor-pointer mb-[20px]"
                        onClick={() => {navigator("/Login")}}
                    >
                        로그인
                    </button>
                </div>
            </div>
        </>
    )
}

export default Signup_success;
