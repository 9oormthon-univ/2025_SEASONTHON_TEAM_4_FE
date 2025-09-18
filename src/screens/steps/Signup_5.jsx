import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import left from '../../assets/left.png';
import minus from '../../assets/minus.png';
import plus from '../../assets/plus.png';
import { useSignup } from '../../data/SignupData.jsx';
import '../../styles/Signup.css';
import '../../styles/Signup_4.css';

const schema = yup.object().shape({
    weight: yup
        .number()
        .typeError('숫자를 입력해주세요!')
        .min(1, '1kg 이상 선택해주세요!')
        .max(200, '200kg 이하로 선택해주세요!')
        .required('몸무게를 선택해주세요!'),
});

const SignUp_5 = () => {
    const navigate = useNavigate();
    const { data, updateSignup } = useSignup();

    const defaultWeight = data?.weight ?? 50;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            weight: defaultWeight,
        },
    });

    // 초기값도 즉시 유효 처리
    useEffect(() => {
        setValue('weight', defaultWeight, { shouldValidate: true });
    }, [defaultWeight, setValue]);

    const currentWeight = Number(watch('weight', defaultWeight));

    const increaseWeight = () => {
        if (currentWeight < 200) {
            setValue('weight', currentWeight + 1, { shouldValidate: true });
        }
    };

    const decreaseWeight = () => {
        if (currentWeight > 1) {
            setValue('weight', currentWeight - 1, { shouldValidate: true });
        }
    };

    const onSubmit = (form) => {
        updateSignup({ weight: Number(form.weight) }); // 공용 상태에 저장
        navigate('/Signup_6');
    };

    return (
        <>
            <div className="title-bar after-first-page" onClick={() => navigate('/Signup_4')}>
                <img src={left} alt="left-button" />
            </div>

            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col gap-[32px]">
                        <div className="text-[28px] font-semibold">
                            <h1>몸무게도</h1>
                            <h1>알려줄래?</h1>
                        </div>
                        
                        <p className="text-[20px] font-medium text-[#8E8E8E] leading-[28.9px]">
                            자세한 분석을 위해 정확히 입력해주세요
                        </p>

                        <div className="flex flex-col w-full mt-[10px]">
                            <div className="number-input-field py-[30px]">
                                <button type="button" onClick={decreaseWeight} className='mr-4'>
                                    <img src={minus} alt="minus" />
                                </button>
                                <input
                                    className='text-[36px] text-black font-bold'
                                    type="number"
                                    {...register('weight')}
                                    value={currentWeight}
                                    readOnly
                                />
                                <span className='text-[28px] text-[#71727A] font-bold self-end mb-[0.5px] pb-[2px]'>kg</span>
                                <button type="button" onClick={increaseWeight} className='ml-4'>
                                    <img src={plus} alt="plus" />
                                </button>
                            </div>
                            
                            <div className="h-[20px] flex items-start ml-0.5">
                                {errors.weight && <p className="text-[#E11D48] text-[14px]">{errors.weight.message}</p>}
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

export default SignUp_5;
