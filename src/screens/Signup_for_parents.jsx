import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Signup.css";
import "../styles/Signup_2.css";

const Signup_for_parents = () => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm({
        mode: "onChange"
    });

    const checkCodeInDB = async (code) => {
        setIsChecking(true);
        try {
            const res = await fetch("/data/codes.json");
            const data = await res.json();
            const valid = data.codes.includes(code);
            setIsChecking(false);
            return valid || "존재하지 않는 코드입니다!";
        } catch (err) {
            setIsChecking(false);
            return "서버 오류가 발생했습니다!";
        }
    };

    const onSubmit = async (data) => {
        const valid = await checkCodeInDB(data.code);
        if (valid === true) {
            console.log('입력된 코드:', data.code);
            navigate("/Signup_success");
        } else {
            setError("code", { type: "manual", message: valid });
        }
    };

    return (
        <>
            <div className="title-bar"></div>
            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-area">
                        <h1>아이의</h1>
                        <h1>코드를 입력해주세요</h1>
                    </div>
                    <div className="lower-text-area">
                        <h3>마이페이지 &gt; 코드</h3>
                    </div>
                    <div>
                        <input
                            className="input-box"
                            type="text"
                            placeholder="이곳에 코드를 입력해주세요"
                            {...register("code", { required: "코드를 입력해주세요!" })}
                        />
                        {errors.code && <p className="error-message">{errors.code.message}</p>}
                    </div>
                    <button
                        className="button-box"
                        type="submit"
                        disabled={!isValid || isChecking}
                        style={{ opacity: !isValid || isChecking ? 0.5 : 1 }}
                    >
                        {isChecking ? "확인 중..." : "다음"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Signup_for_parents;
