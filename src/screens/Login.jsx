import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

const schema = yup.object().shape({
    email: yup.string().email("이메일 형식이 아닙니다").required("이메일은 필수입니다"),
    password: yup
        .string()
        .min(8, "비밀번호는 최소 8자리 이상")
        .matches(/[0-9]/, "숫자를 최소 1개 포함해야 합니다")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "특수문자를 최소 1개 포함해야 합니다")
        .required("비밀번호는 필수입니다"),
});

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (form) => {
        try {
            setErrMsg("");
            setLoading(true);

            // 정적 JSON에서 검증 (Vite: public/data/users.json -> /data/users.json)
            const res = await fetch("../../public/data/users.json");
            if (!res.ok) throw new Error("사용자 목록을 불러오지 못했습니다.");
            const data = await res.json();

            const ok = Array.isArray(data.users) && data.users.some(
                (u) => u.email === form.email && u.password === form.password
            );
            if (!ok) throw new Error("이메일/비밀번호가 올바르지 않습니다");

            // 토큰/세션 흉내
            localStorage.setItem("token", "dev-mock-token");
            navigate("/Home_kid"); // 로그인 성공 후 이동
        } catch (e) {
            setErrMsg(e.message || "로그인 중 오류가 발생했습니다.");
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
                        <h1>반가워요!</h1>
                        <h1>로그인 해주세요</h1>
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

                    {errMsg && <p className="error-message">{errMsg}</p>}

                    <button
                        className="button-box"
                        type="submit"
                        disabled={!isValid || loading}
                        style={{ opacity: isValid && !loading ? 1 : 0.5 }}
                    >
                        {loading ? "로그인 중..." : "로그인"}
                    </button>
                </form>
            </div>
        </>
    );
}
