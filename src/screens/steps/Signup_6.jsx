import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import left from '../../assets/left.png';
import { useSignup } from '../../data/SignupData.jsx';
import '../../styles/Signup.css';

const OPTIONS = [
    { code: 'NULL', label: '해당 없음' },
    { code: 'DM_1', label: '1형 당뇨' },
    { code: 'DM_2I', label: '2형 당뇨(인슐린 투여)' },
    { code: 'DM_2', label: '2형 당뇨(인슐린 미투여)' },
    { code: 'DM_P', label: '임신성 당뇨' },
];

// 옛날 라벨 → 코드 역매핑(호환용)
const LABEL_TO_CODE = Object.fromEntries(OPTIONS.map(o => [o.label, o.code]));

const schema = yup.object().shape({
    status: yup
        .string()
        .oneOf(OPTIONS.map(o => o.code))
        .required('선택지를 선택해주세요!'),
});

const SignUp_6 = () => {
    const navigate = useNavigate();
    const { data, updateSignup } = useSignup();

    // 스토어에 라벨이 저장돼 있었다면 코드로 변환
    const stored = data?.status;
    const defaultStatus = stored
        ? (OPTIONS.some(o => o.code === stored) ? stored : (LABEL_TO_CODE[stored] ?? 'NULL'))
        : 'NULL';

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: { status: defaultStatus },
    });

    const status = watch('status');

    const onSubmit = (form) => {
        // form.status에는 코드(NULL/DM_1/DM_2I/DM_2/DM_P)가 들어있음
        updateSignup({ status: form.status });
        navigate('/Signup_7');
    };

    return (
        <>
            <div className="title-bar after-first-page" onClick={() => navigate('/Signup_5')}>
                <img src={left} alt="left-button" />
            </div>

            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-col gap-[32px]">
                        <div className="text-[28px] font-semibold">
                            <h1>건강 상태를</h1>
                            <h1>알려줄래?</h1>
                        </div>

                        <div className="flex flex-col gap-[12px] w-full mt-[10px]">
                            {/* status는 코드값으로 제출됨 */}
                            <input type="hidden" {...register('status')} />

                            <div className="flex flex-col gap-[16px]">
                                {OPTIONS.map((opt) => (
                                    <button
                                        key={opt.code}
                                        type="button"
                                        className={`w-full h-[60px] rounded-[16px] px-[20px] flex items-center justify-between text-[16px] font-medium transition-all duration-200 ${
                                            status === opt.code 
                                                ? 'bg-[#E8F5F4] border-2 border-[#00BBA9] text-[#00BBA9] shadow-md' 
                                                : 'bg-white border-2 border-transparent text-[#CACACA] shadow-sm hover:shadow-md'
                                        }`}
                                        onClick={() => setValue('status', opt.code, { shouldValidate: true })}
                                    >
                                        <span>{opt.label}</span>
                                        {status === opt.code && (
                                            <div className="w-[24px] h-[24px] bg-[#00BBA9] rounded-full flex items-center justify-center">
                                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 4.5L4.5 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="h-[20px] flex items-start ml-0.5">
                                {errors.status && <p className="text-[#E11D48] text-[14px]">{errors.status.message}</p>}
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

export default SignUp_6;
