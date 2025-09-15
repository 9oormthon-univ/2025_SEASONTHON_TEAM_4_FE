import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../data/SignupData.jsx";
import "../../styles/Signup.css";

const schema = yup.object().shape({
    email: yup.string().email("이메일 형식이 아닙니다").required("이메일은 필수입니다"),
    password: yup
        .string()
        .min(8, "비밀번호는 최소 8자리 이상")
        .matches(/[0-9]/, "숫자를 최소 1개 포함해야 합니다")
        .matches(/[!@#$%^&*(),.?\":{}|<>]/, "특수문자를 최소 1개 포함해야 합니다")
        .required("비밀번호는 필수입니다"),
});

const Signup_0 = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { data, updateSignup } = useSignup();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        // 공용 상태에 저장된 값으로 기본값 채워서 뒤로가도 유지
        defaultValues: {
            email: data.email || "",
            password: data.password || "",
        },
    });

    const onSubmit = async (form) => {
        try {
            setLoading(true);
            updateSignup(form);
            navigate("/signup_1");
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="title-bar"></div>

            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-area">
                        <h1>처음 뵙겠습니다!</h1>
                        <h1>단짝이입니다</h1>
                    </div>

                    <div>
                        <p className="label">이메일</p>
                        <input
                            className="input-box"
                            type="email"
                            placeholder="이메일을 입력해주세요"
                            {...register("email")}
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}

                        <p className="label">비밀번호</p>
                        <input
                            className="input-box"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            {...register("password")}
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>

                    <button
                        className="button-box"
                        type="submit"
                        disabled={!isValid || loading}
                        style={{ opacity: isValid && !loading ? 1 : 0.5 }}
                    >
                        {loading ? "가입 중..." : "다음"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Signup_0;
