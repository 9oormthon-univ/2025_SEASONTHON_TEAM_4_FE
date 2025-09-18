import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import left from '../../assets/left.png';
import { useSignup } from '../../data/SignupData.jsx';
import '../../styles/Signup.css';

const schema = yup.object().shape({
    year: yup
        .number()
        .typeError('년도를 입력해주세요!')
        .min(1900, '1900년 이후로 입력해주세요!')
        .max(new Date().getFullYear(), `${new Date().getFullYear()}년 이전으로 입력해주세요!`)
        .required('년도를 입력해주세요!'),
    month: yup
        .number()
        .typeError('월을 입력해주세요!')
        .min(1, '1월부터 12월까지 입력 가능합니다!')
        .max(12, '1월부터 12월까지 입력 가능합니다!')
        .required('월을 입력해주세요!'),
    day: yup
        .number()
        .typeError('일을 입력해주세요!')
        .min(1, '1일부터 31일까지 입력 가능합니다!')
        .max(31, '1일부터 31일까지 입력 가능합니다!')
        .required('일을 입력해주세요!'),
});

const SignUp_3 = () => {
    const navigate = useNavigate();
    const { data, updateSignup } = useSignup();

    // 기존 birth 데이터가 있다면 분리
    const existingDate = data?.birth ? new Date(data.birth) : null;
    const defaultYear = existingDate ? existingDate.getFullYear() : '';
    const defaultMonth = existingDate ? existingDate.getMonth() + 1 : '';
    const defaultDay = existingDate ? existingDate.getDate() : '';

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            year: defaultYear,
            month: defaultMonth,
            day: defaultDay,
        },
    });

    const onSubmit = (form) => {
        // 년/월/일을 합쳐서 날짜 문자열로 변환
        const birthDate = `${form.year}-${String(form.month).padStart(2, '0')}-${String(form.day).padStart(2, '0')}`;
        updateSignup({ birth: birthDate });
        navigate('/Signup_4');
    };

    return (
        <>
            <div className="title-bar after-first-page" onClick={() => navigate('/Signup_2')}>
                <img src={left} alt="left-button" />
            </div>

            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col gap-[32px]">
                        <div className="text-[28px] font-semibold">
                            <h1>생일은 언제야?</h1>
                        </div>

                        <div className="flex flex-col gap-[12px] w-full mt-[10px]">
                            <div className="flex gap-[8px] items-center">
                                <input
                                    type="number"
                                    placeholder="2010"
                                    {...register('year')}
                                    className="w-full rounded-[12px] p-[12px] px-[16px] text-center border-none outline-none text-[18px]"
                                />
                                <span className="text-[20px] text-[#8E8E8E]">/</span>
                                <input
                                    type="number"
                                    placeholder="01"
                                    {...register('month')}
                                    className="w-full rounded-[12px] p-[12px] px-[16px] text-center border-none outline-none text-[18px]"
                                />
                                <span className="text-[20px] text-[#8E8E8E]">/</span>
                                <input
                                    type="number"
                                    placeholder="01"
                                    {...register('day')}
                                    className="w-full rounded-[12px] p-[12px] px-[16px] text-center border-none outline-none text-[18px]"
                                />
                            </div>
                            
                            <div className="h-[20px] flex items-start ml-0.5">
                                {(errors.year || errors.month || errors.day) && (
                                    <p className="text-[#E11D48] text-[14px]">
                                        {errors.year?.message || errors.month?.message || errors.day?.message}
                                    </p>
                                )}
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

export default SignUp_3;
