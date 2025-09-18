import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import "../styles/Signup_2.css";
import { validateParentCode } from "../utils/api";

const Signup_for_parents = () => {
    const navigate = useNavigate();
    const [isChecking] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm({
        mode: "onChange"
    });

    const onSubmit = async (data) => {
        try {
            // 서버에 부모 코드 검증 요청 시도
            const result = await validateParentCode(data.code);
            
            if (result.valid) {
                console.log('입력된 코드:', data.code);
                navigate("/parent/home");
            } else {
                setError("code", { type: "manual", message: "유효하지 않은 코드입니다" });
            }
        } catch (error) {
            console.error('코드 검증 중 오류:', error);
            setError("code", { type: "manual", message: "코드 검증 중 오류가 발생했습니다" });
        }
    };

    return (
        <>
            <div className="title-bar"></div>
            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col gap-[32px]">
                        <div className="text-[28px] font-semibold">
                            <h1>아이의</h1>
                            <h1>코드를 입력해주세요</h1>
                        </div>
                        
                        <div className="text-[16px] font-medium text-[#4B4B4B] leading-[28.9px]">
                            마이페이지 &gt; 코드
                        </div>

                        <div className="flex flex-col gap-[12px] w-full mt-[10px]">
                            <input
                                className="w-full border border-[#CACACA] rounded-[12px] p-[12px] px-[16px]"
                                type="text"
                                placeholder="이곳에 코드를 입력해주세요"
                                {...register("code", { required: "코드를 입력해주세요!" })}
                            />
                            <div className="h-[20px] flex items-start ml-0.5">
                                {errors.code && <p className="text-[#E11D48] text-[14px]">{errors.code.message}</p>}
                            </div>
                        </div>
                    </div>

                    <button
                        className="w-full h-[48px] bg-[#00BBA9] rounded-[12px] text-[#FFFFFF] font-semibold text-[18px] cursor-pointer mb-[20px]"
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
