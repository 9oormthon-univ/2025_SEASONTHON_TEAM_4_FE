import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSignup } from '../../data/SignupData.jsx';
import '../../styles/Signup.css';
import '../../styles/Signup_4.css';
import left from '../../assets/left.png';
import plus from '../../assets/plus.png';
import minus from '../../assets/minus.png';

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-area">
                        <h1>너의 키는</h1>
                        <h1>몇 cm야?</h1>
                    </div>
                    <div className="lower-text-area">
                        <h3>자세한 분석을 위해 정확히 입력해주세요</h3>
                    </div>

                    <div className="number-input-field">
                        <button type="button" onClick={decreaseHeight}>
                            <img src={minus} alt="minus" />
                        </button>
                        <input
                            type="number"
                            {...register('height')}
                            value={currentHeight}
                            readOnly
                        />
                        <button type="button" onClick={increaseHeight}>
                            <img src={plus} alt="plus" />
                        </button>
                        <span>cm</span>
                    </div>

                    {errors.height && <p className="error-message">{errors.height.message}</p>}

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

export default SignUp_4;
