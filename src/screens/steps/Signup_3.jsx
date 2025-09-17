import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useSignup } from '../../data/SignupData.jsx';
import '../../styles/Signup.css';
import '../../styles/Signup_3.css';
import left from '../../assets/left.png';

const validDate = (y, m, d) => {
    const year = Number(y), month = Number(m), day = Number(d);
    if (!year || !month || !day) return false;
    if (month < 1 || month > 12) return false;
    const last = new Date(year, month, 0).getDate(); // 해당 월의 마지막 날
    return day >= 1 && day <= last;
};

const schema = yup.object({
    year: yup
        .string()
        .required('연도를 입력해 주세요')
        .matches(/^\d{4}$/, '연도는 4자리 숫자예요'),
    month: yup
        .string()
        .required('월을 입력해 주세요')
        .matches(/^\d{1,2}$/, '월은 1~2자리 숫자예요')
        .test('mm-range', '월은 1~12 사이예요', (v) => {
            const n = Number(v);
            return n >= 1 && n <= 12;
        }),
    day: yup
        .string()
        .required('일을 입력해 주세요')
        .matches(/^\d{1,2}$/, '일은 1~2자리 숫자예요')
        .test('dd-range', '존재하지 않는 날짜예요', function (v) {
            const { year, month } = this.parent;
            return validDate(year, month, v);
        }),
}).required();

const pad2 = (v) => (v && v.length === 1 ? `0${v}` : v);

const SignUp_3 = () => {
    const navigate = useNavigate();
    const { data, updateSignup } = useSignup();

    // 기존 birth(YYYY-MM-DD)가 있다면 분리해 기본값으로 세팅
    const [yy, mm, dd] = (data?.birth || '').split('-') || [];

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            year: yy || '',
            month: mm || '',
            day: dd || '',
        },
    });

    const yearRef = useRef(null);
    const monthRef = useRef(null);
    const dayRef = useRef(null);

    // 자리수 채우기 및 자동 포커스 이동
    const handleChangeLen = (e, maxLen, nextRef) => {
        const onlyNum = e.target.value.replace(/\D/g, '');
        if (onlyNum !== e.target.value) {
            // 숫자만 유지
            e.target.value = onlyNum;
            setValue(e.target.name, onlyNum, { shouldValidate: true, shouldDirty: true });
        }
        if (onlyNum.length >= maxLen && nextRef?.current) {
            nextRef.current.focus();
            nextRef.current.select?.();
        }
    };

    const handleBlurPad = (name) => (e) => {
        const v = e.target.value;
        // month/day는 1자리면 0패딩
        if (name !== 'year') {
            const padded = pad2(v);
            if (padded !== v) setValue(name, padded, { shouldValidate: true });
        }
    };

    const onSubmit = ({ year, month, day }) => {
        const y = year;
        const m = pad2(month);
        const d = pad2(day);
        const iso = `${y}-${m}-${d}`;
        updateSignup({ birth: iso });
        navigate('/Signup_4');
    };

    const year = watch('year');
    const month = watch('month');

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

                    {/* 분리 입력 UI */}
                    <div className="input-box date-split">
                        <div className="date-field">
                            <label htmlFor="year" className="sr-only">연도</label>
                            <input
                                id="year"
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                placeholder="YYYY"
                                maxLength={4}
                                {...register('year')}
                                ref={yearRef}
                                onChange={(e) => handleChangeLen(e, 4, monthRef)}
                                onBlur={handleBlurPad('year')}
                            />
                            <span className="sep">/</span>
                        </div>

                        <div className="date-field">
                            <label htmlFor="month" className="sr-only">월</label>
                            <input
                                id="month"
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                placeholder="MM"
                                maxLength={2}
                                {...register('month')}
                                ref={monthRef}
                                onChange={(e) => handleChangeLen(e, 2, dayRef)}
                                onBlur={handleBlurPad('month')}
                            />
                            <span className="sep">/</span>
                        </div>

                        <div className="date-field">
                            <label htmlFor="day" className="sr-only">일</label>
                            <input
                                id="day"
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                placeholder="DD"
                                maxLength={2}
                                {...register('day')}
                                ref={dayRef}
                                onChange={(e) => handleChangeLen(e, 2, null)}
                                onBlur={handleBlurPad('day')}
                            />
                        </div>
                    </div>

                    {/* 에러 메시지 (우선순위: day -> month -> year -> 전체) */}
                    <div className="error-message">
                        {errors.day?.message || errors.month?.message || errors.year?.message}
                    </div>

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
