import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useRef} from "react";
import "./Signup.css"
import "./Signup_3.css"
import left from '../assets/left.png'
import date from '../assets/date.png'

const SignUp_3 = () => {
    const navigate = useNavigate()
    const dateInputRef = useRef(null)

    const schema = yup.object().shape({
        birth: yup.date().required('생일을 선택해주세요!')
    })

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    })

    const onSubmit = (data) => {
        console.log('생일:', data.birth)
        navigate('/Signup_4')
    }

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
                            {...register('birth')}
                            ref={(e) => {
                                register('birth').ref(e)
                                dateInputRef.current = e
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
    )
}

export default SignUp_3