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
    height: yup
        .number()
        .typeError('숫자를 입력해주세요!')
        .min(1, '1cm 이상 선택해주세요!')
        .max(200, '200cm 이하로 선택해주세요!')
        .required('키를 선택해주세요!'),
});

const SignUp_4 = () => {
    const navigate = useNavigate();
    const { data, updateSignup } = useSignup();

    const defaultHeight = data?.height ?? 123;

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
            height: defaultHeight,
        },
    });

    // 기본값으로도 즉시 유효하게 만들고 싶다면 초기 검증 트리거
    useEffect(() => {
        setValue('height', defaultHeight, { shouldValidate: true });
    }, [defaultHeight, setValue]);

    const currentHeight = Number(watch('height', defaultHeight));

    const increaseHeight = () => {
        if (currentHeight < 200) {
            setValue('height', currentHeight + 1, { shouldValidate: true });
        }
    };

    const decreaseHeight = () => {
        if (currentHeight > 1) {
            setValue('height', currentHeight - 1, { shouldValidate: true });
        }
    };

    const onSubmit = (form) => {
        updateSignup({ height: Number(form.height) }); // 공용 상태에 병합 저장
        navigate('/Signup_5');
    };

    return (
        <>
            <div className="title-bar after-first-page" onClick={() => navigate('/Signup_3')}>
                <img src={left} alt="left-button" />
            </div>

            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col gap-[32px]">
                        <div className="text-[28px] font-semibold">
                            <h1>너의 키는</h1>
                            <h1>몇 cm야?</h1>
                        </div>
                        
                        <p className="text-[20px] font-medium text-[#8E8E8E] leading-[28.9px]">
                            자세한 분석을 위해 정확히 입력해주세요
                        </p>

                        <div className="flex flex-col w-full mt-[10px]">
                            <div className="number-input-field py-[30px]">
                                <button type="button" onClick={decreaseHeight} className='mr-4'>
                                    <img src={minus} alt="minus" />
                                </button>
                                <input
                                    className='text-[36px] text-black font-bold'
                                    type="number"
                                    {...register('height')}
                                    value={currentHeight}
                                    readOnly
                                />
                                <span className='text-[28px] text-[#71727A] font-bold self-end mb-[0.5px] pb-[2px]'>cm</span>
                                <button type="button" onClick={increaseHeight} className='ml-4'>
                                    <img src={plus} alt="plus" />
                                </button>
                            </div>
                            
                            <div className="h-[20px] flex items-start ml-0.5">
                                {errors.height && <p className="text-[#E11D48] text-[14px]">{errors.height.message}</p>}
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

export default SignUp_4;
