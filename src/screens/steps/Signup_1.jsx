import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
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
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: data?.name || "", // 공용 상태 값으로 기본값 세팅
        },
    });

    const onSubmit = (form) => {
        updateSignup({ name: form.name }); // 공용 상태에 병합 저장
        navigate("/Signup_2");             // 다음 단계로 이동 (라우트에 맞게 유지)
    };

    return (
        <>
            <div className="title-bar"></div>
            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-area">
                        <h1>안녕!</h1>
                        <h1>너의 이름을 알려줘</h1>
                    </div>

                    <div>
                        <input
                            className="input-box"
                            type="text"
                            placeholder="이곳에 이름을 입력해주세요"
                            {...register("name")}
                        />
                        {errors.name && <p className="error-message">{errors.name.message}</p>}
                    </div>

                    <button
                        className="button-box"
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
