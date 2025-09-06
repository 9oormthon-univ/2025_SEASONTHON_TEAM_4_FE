import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import "./Signup.css"
import left from '../assets/left.png'

const SignUp_2 = () => {
    const navigate = useNavigate()

    const schema = yup.object().shape({
        gender: yup.string().oneOf(['female', 'male']).required('성별을 선택해주세요!')
    })

    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    })

    const selected = watch('gender')

    const onSubmit = (data) => {
        console.log('성별:', data.gender)
        navigate('/Signup_3') // 다음 단계로 이동하도록 수정
    }

    return (
        <>
            <div className="title-bar after-first-page" onClick={() => navigate('/Signup')}>
                <img src={left} alt="left-button" />
            </div>

            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-area">
                        <h1>성별을</h1>
                        <h1>선택해주세요!</h1>
                    </div>

                    <div className="gender-grid">
                        <label
                            htmlFor="gender-female"
                            className={`gender-card ${selected === 'female' ? 'selected' : ''}`}
                        >
                            <input
                                id="gender-female"
                                type="radio"
                                value="female"
                                {...register('gender')}
                                className="sr-only-radio"
                            />
                            <div className="emoji">👩🏻</div>
                            <div className="gender-label">여성</div>
                        </label>

                        <label
                            htmlFor="gender-male"
                            className={`gender-card ${selected === 'male' ? 'selected' : ''}`}
                        >
                            <input
                                id="gender-male"
                                type="radio"
                                value="male"
                                {...register('gender')}
                                className="sr-only-radio"
                            />
                            <div className="emoji">👦🏻</div>
                            <div className="gender-label">남성</div>
                        </label>
                    </div>

                    {errors.gender && <p className="error-message">{errors.gender.message}</p>}

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
    )
}

export default SignUp_2
