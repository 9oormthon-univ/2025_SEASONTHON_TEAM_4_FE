import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import "./Signup.css"
import left from '../assets/left.png'
import check from '../assets/check.png'

const SignUp_6 = () => {
    const navigate = useNavigate()

    const schema = yup.object().shape({
        status: yup
            .string()
            .typeError("선택지를 선택해주세요!")
            .required("선택지를 선택해주세요!")
    })

    const { register, handleSubmit, formState: { errors, isValid }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            status:"해당 없음"
        }
    })

    const status = watch("status")
    const options = [
        "해당 없음",
        "1형 당뇨",
        "2형 당뇨(인슐린 투여)",
        "2형 당뇨(인슐린 미투여)",
        "임신성 당뇨"
    ]

    const onSubmit = (data) => {
        console.log("건강 상태:", data.status)
        navigate('/Signup_7')
    }

    return (
        <>
            <div className="title-bar after-first-page" onClick={() => navigate('/Signup_6')}>
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

                    <div className="select-box-wrapper">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`select-box ${status === option ? "active" : ""}`}
                                onClick={() => setValue("status", option, { shouldValidate: true })}
                            >
                                {option}
                                {status === option && <img src={check} alt="check" className="check-icon" />}
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
    )
}

export default SignUp_6
