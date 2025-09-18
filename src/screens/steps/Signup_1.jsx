import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useSignup } from "../../data/SignupData.jsx";
import "../../styles/Signup.css";
import "../../styles/Signup_2.css";

const schema = yup.object().shape({
    name: yup
        .string()
        .min(1, "이름을 최소 1글자 이상 입력해주세요!")
        .max(8, "이름은 최대 8글자까지 입력할 수 있어요!")
        .required("이름을 입력해주세요!"),
});

const Signup_1 = () => {
    const navigate = useNavigate();
    const { data, updateSignup } = useSignup();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: data?.name || "", // 공용 상태 값으로 기본값 세팅
        },
    });

    const nameValue = watch("name") || "";

    const onSubmit = (form) => {
        updateSignup({ name: form.name }); // 공용 상태에 병합 저장
        navigate("/Signup_2");             // 다음 단계로 이동 (라우트에 맞게 유지)
    };

    return (
        <>
            <div className="title-bar"></div>
            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col gap-[32px]">
                        <div className="text-[28px] font-semibold">
                            <h1>너의 이름을 알려줘</h1>
                        </div>

                        <div className="flex flex-col gap-[12px] w-full mt-[10px]">
                            <div className="relative">
                                <input
                                    className="w-full border border-[#CACACA] rounded-[12px] p-[12px] px-[16px] pr-[60px]"
                                    type="text"
                                    placeholder="이름을 입력해주세요"
                                    {...register("name")}
                                />
                                <span className="absolute right-[16px] top-1/2 transform -translate-y-1/2 text-[#8E8E8E] text-[14px]">
                                    {nameValue.length}/8
                                </span>
                            </div>
                            <div className="h-[20px] flex items-start ml-0.5">
                                {errors.name && <p className="text-[#E11D48] text-[14px]">{errors.name.message}</p>}
                            </div>
                        </div>
                    </div>

                    <button
                        className="w-full h-[48px] bg-[#00BBA9] rounded-[12px] text-[#FFFFFF] font-semibold text-[18px] cursor-pointer mb-[20px]"
                        type="submit"
                        disabled={!isValid}
                        style={{ opacity: isValid ? 1 : 0.5 }}
                    >
                        다음
                    </button>
                </form>
            </div>
        </>
    );
};

export default Signup_1;
