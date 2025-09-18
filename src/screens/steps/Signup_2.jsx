import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import left from '../../assets/left.png';
import { useSignup } from '../../data/SignupData.jsx';
import '../../styles/Signup.css';

const schema = yup.object().shape({
    gender: yup.string().oneOf(['female', 'male']).required('성별을 선택해주세요!'),
});

const SignUp_2 = () => {
    const navigate = useNavigate();
    const { data, updateSignup } = useSignup();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            gender: data?.gender || '', // 저장된 값으로 기본값 유지
        },
    });

    const selected = watch('gender');

    const onSubmit = (form) => {
        updateSignup({ gender: form.gender }); // 공용 상태에 병합 저장
        navigate('/Signup_3');                 // 다음 단계로 이동
    };

    return (
        <>
            <div
                className="title-bar after-first-page"
                onClick={() => navigate('/Signup_1')} // 이전 단계로
                role="button"
                tabIndex={0}
            >
                <img src={left} alt="left-button" />
            </div>

            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col gap-[32px]">
                        <div className="text-[28px] font-semibold">
                            <h1>성별을 선택해줘</h1>
                        </div>

                        <div className="text-[20px] font-medium text-[#8E8E8E]">
                            성별에 따라 영양성분이 다를 수 있어요.
                        </div>

                        <div className="flex flex-col gap-[12px] w-full mt-[10px]">
                            <div className="gender-grid">
                                <label
                                    htmlFor="gender-female"
                                    className={`gender-card ${selected === 'female' ? 'selected' : ''}`}
                                >
                                    <input
                                        id="gender-female"
                                        type="radio"
                                        value="female"
                                        {...register('gender')}
                                        className="sr-only-radio"
                                    />
                                    <div className="emoji">👩🏻</div>
                                    <div className="gender-label">여성</div>
                                </label>

                                <label
                                    htmlFor="gender-male"
                                    className={`gender-card ${selected === 'male' ? 'selected' : ''}`}
                                >
                                    <input
                                        id="gender-male"
                                        type="radio"
                                        value="male"
                                        {...register('gender')}
                                        className="sr-only-radio"
                                    />
                                    <div className="emoji">👦🏻</div>
                                    <div className="gender-label">남성</div>
                                </label>
                            </div>
                            
                            <div className="h-[20px] flex items-start ml-0.5">
                                {errors.gender && <p className="text-[#E11D48] text-[14px]">{errors.gender.message}</p>}
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

export default SignUp_2;
