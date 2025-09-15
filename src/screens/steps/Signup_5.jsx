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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-area">
                        <h1>몸무게도</h1>
                        <h1>알려줄래?</h1>
                    </div>
                    <div className="lower-text-area">
                        <h3>자세한 분석을 위해 정확히 입력해주세요</h3>
                    </div>

                    <div className="number-input-field">
                        <button type="button" onClick={decreaseWeight}>
                            <img src={minus} alt="minus" />
                        </button>
                        <input
                            type="number"
                            {...register('weight')}
                            value={currentWeight}
                            readOnly
                        />
                        <button type="button" onClick={increaseWeight}>
                            <img src={plus} alt="plus" />
                        </button>
                        <span>kg</span>
                    </div>

                    {errors.weight && <p className="error-message">{errors.weight.message}</p>}

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

export default SignUp_5;
