import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
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
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col gap-[32px]">
                        <div className="text-[28px] font-semibold">
                            <h1>만나서 반가워!</h1>
                            <h1>단짝이와 시작해보자</h1>
                        </div>

                        <div className="flex flex-col gap-[12px] w-full mt-[10px]">
                            <p className="text-[#8E8E8E]">이메일</p>
                            <input
                                className="w-full border border-[#CACACA] rounded-[12px] p-[12px] px-[16px]"
                                type="email"
                                placeholder="사용하실 이메일을 입력해주세요"
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
                        </div>
                    </div>

                    <button
                        className="w-full h-[48px] bg-[#00BBA9] rounded-[12px] text-[#FFFFFF] font-semibold text-[18px] cursor-pointer mb-[20px]"
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
