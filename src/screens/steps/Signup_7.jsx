// src/screens/steps/SignUp_7.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../../data/SignupData.jsx';
import '../../styles/Signup.css';
import '../../styles/Signup_7.css';
import left from '../../assets/left.png';
import caresense from '../../assets/caresense.png';
import dexcom from '../../assets/dexcom.png';
import libre2 from '../../assets/libre2.png';

const ID_TO_CODE = { caresense: 'CA', dexcom: 'DC', libre2: 'FL' };
const CODE_TO_ID = { CA: 'caresense', DC: 'dexcom', FL: 'libre2' };

const schema = yup.object().shape({
    sensor: yup.string().oneOf(['caresense', 'dexcom', 'libre2']).required('센서를 선택해주세요!')
});

const SignUp_7 = () => {
    const navigate = useNavigate();
    const { data, updateSignup, resetSignup } = useSignup();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            // 스토어에 코드(CA/DC/FL)로 저장돼 있다면 라디오 id로 변환해 기본 선택
            sensor: CODE_TO_ID[data?.sensor] || ''
        }
    });

    const selected = watch('sensor');

    const onSubmit = async (form) => {
        setApiError('');
        setLoading(true);
        try {
            // 라디오 값(id) → 서버로 보낼 코드(CA/DC/FL) 변환
            const code = ID_TO_CODE[form.sensor];

            // 스토어에는 코드로 반영(선택)
            updateSignup({ sensor: code });

            // 최종 payload: 지금까지 모은 모든 값 + 센서 코드
            const payload = { ...data, sensor: code };

            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const msg = await res.text().catch(() => '');
                throw new Error(msg || '회원가입 요청 실패');
            }

            // 성공 처리: 상태 초기화 후 로그인 화면으로 이동
            resetSignup?.();
            navigate('/Signup_success');
        } catch (e) {
            setApiError(e.message || '전송 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="title-bar after-first-page" onClick={() => navigate('/Signup_6')}>
                <img src={left} alt="left-button" />
            </div>

            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-area">
                        <h1>센서를 연결해줘!</h1>
                    </div>

                    <div className="sensor-grid">
                        {[
                            { id: 'caresense', label: 'CareSense', img: caresense },
                            { id: 'dexcom', label: 'Dexcom', img: dexcom },
                            { id: 'libre2', label: 'Libre 2', img: libre2 }
                        ].map((sensor) => (
                            <label
                                key={sensor.id}
                                htmlFor={sensor.id}
                                className={`sensor-card ${selected === sensor.id ? 'selected' : ''}`}
                            >
                                <input
                                    id={sensor.id}
                                    type="radio"
                                    value={sensor.id}
                                    {...register('sensor')}
                                    className="sr-only-radio"
                                />
                                <img src={sensor.img} alt={sensor.label} className="sensor-img" />
                                <div className="sensor-label">{sensor.label}</div>
                            </label>
                        ))}
                    </div>

                    {errors.sensor && <p className="error-message">{errors.sensor.message}</p>}
                    {apiError && <p className="error-message">{apiError}</p>}

                    <button
                        className="button-box"
                        type="submit"
                        disabled={!isValid || loading}
                        style={{ opacity: isValid && !loading ? 1 : 0.5 }}
                    >
                        {loading ? '시작 중...' : '시작하기'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default SignUp_7;
