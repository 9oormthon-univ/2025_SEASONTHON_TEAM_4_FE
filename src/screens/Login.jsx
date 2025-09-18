import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../styles/Signup.css";
import { loginUser } from "../utils/api";

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

    const onSubmit = async (formData) => {
        try {
            setErrMsg("");
            setLoading(true);

            // 서버 로그인 요청 시도
            const result = await loginUser(formData.email, formData.password);
            
            if (result.success) {
                // 토큰 저장
                localStorage.setItem("token", result.token);
                navigate("/kid/home"); // 로그인 성공 후 이동
            } else {
                throw new Error("이메일/비밀번호가 올바르지 않습니다");
            }
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
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col gap-[32px]">
                        <div className="text-[28px] font-semibold">
                            <h1>반가워요!</h1>
                            <h1>로그인 해주세요</h1>
                        </div>

                        <div className="flex flex-col gap-[12px] w-full mt-[10px]">
                            <p className="text-[#8E8E8E]">이메일</p>
                            <input
                                className="w-full border border-[#CACACA] rounded-[12px] p-[12px] px-[16px]"
                                type="email"
                                placeholder="이메일을 입력해주세요"
                                {...register("email")}
                            />
                            <div className="h-[20px] flex items-start ml-0.5">
                                {errors.email && <p className="text-[#E11D48] text-[14px]">{errors.email.message}</p>}
                            </div>

                            <p className="text-[#8E8E8E]">비밀번호</p>
                            <input
                                className="w-full border border-[#CACACA] rounded-[12px] p-[12px] px-[16px]"
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                {...register("password")}
                            />
                            <div className="h-[20px] flex items-start ml-0.5">
                                {errors.password && <p className="text-[#E11D48] text-[14px]">{errors.password.message}</p>}
                            </div>

                            <div className="h-[20px] flex items-start ml-0.5">
                                {errMsg && <p className="text-[#E11D48] text-[14px]">{errMsg}</p>}
                            </div>
                        </div>
                    </div>

                    <button
                        className="w-full h-[48px] bg-[#00BBA9] rounded-[12px] text-[#FFFFFF] font-semibold text-[18px] cursor-pointer mb-[20px]"
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
