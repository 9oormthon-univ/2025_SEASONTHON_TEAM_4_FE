import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useSignup } from '../../data/SignupData.jsx';
import '../../styles/Signup.css';
import '../../styles/Signup_3.css';
import left from '../../assets/left.png';
import date from '../../assets/date.png';

const schema = yup.object().shape({
    birth: yup.date().typeError('생일을 선택해주세요!').required('생일을 선택해주세요!'),
});

const SignUp_3 = () => {
    const navigate = useNavigate();
    const dateInputRef = useRef(null);
    const { data, updateSignup } = useSignup();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            // HTML date input은 'YYYY-MM-DD' 문자열을 사용
            birth: data?.birth || '',
        },
    });

    const onSubmit = (form) => {
        updateSignup({ birth: form.birth }); // 공용 상태에 병합 저장
        navigate('/Signup_4');
    };

    // register에서 ref를 분리해 dateInputRef에 같이 연결
    const { ref: birthRef, ...birthReg } = register('birth');

    return (
        <>
            <div className="title-bar after-first-page" onClick={() => navigate('/Signup_2')}>
                <img src={left} alt="left-button" />
            </div>

            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-area">
                        <h1>생일은 언제야?</h1>
                    </div>

                    <div className="input-box">
                        <input
                            type="date"
                            {...birthReg}
                            ref={(el) => {
                                birthRef(el);
                                dateInputRef.current = el;
                            }}
                            className="date-input"
                        />
                        <img
                            src={date}
                            alt="date-icon"
                            className="date-icon"
                            onClick={() => dateInputRef.current && dateInputRef.current.showPicker()}
                        />
                    </div>

                    {errors.birth && <p className="error-message">{errors.birth.message}</p>}

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

export default SignUp_3;
