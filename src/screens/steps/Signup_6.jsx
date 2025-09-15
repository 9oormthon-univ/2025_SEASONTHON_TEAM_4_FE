import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../../data/SignupData.jsx';
import '../../styles/Signup.css';
import left from '../../assets/left.png';
import check from '../../assets/check.png';

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-area">
                        <h1>건강 상태를</h1>
                        <h1>알려줄래?</h1>
                    </div>
                    <div className="lower-text-area">
                        <h3>자세한 분석을 위해 정확히 입력해주세요</h3>
                    </div>

                    {/* status는 코드값으로 제출됨 */}
                    <input type="hidden" {...register('status')} />

                    <div className="select-box-wrapper">
                        {OPTIONS.map((opt) => (
                            <button
                                key={opt.code}
                                type="button"
                                className={`select-box ${status === opt.code ? 'active' : ''}`}
                                onClick={() => setValue('status', opt.code, { shouldValidate: true })}
                            >
                                {opt.label}
                                {status === opt.code && <img src={check} alt="check" className="check-icon" />}
                            </button>
                        ))}
                    </div>

                    {errors.status && <p className="error-message">{errors.status.message}</p>}

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

export default SignUp_6;
