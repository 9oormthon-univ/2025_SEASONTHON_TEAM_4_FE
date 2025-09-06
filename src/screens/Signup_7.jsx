import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import "./Signup.css"
import "./Signup_7.css"
import left from '../assets/left.png'
import caresense from "../assets/caresense.png"
import dexcom from "../assets/dexcom.png"
import libre2 from "../assets/libre2.png"

const SignUp_7 = () => {
    const navigate = useNavigate()

    const schema = yup.object().shape({
        sensor: yup.string().oneOf(['caresense', 'dexcom', 'libre2']).required('센서를 선택해주세요!')
    })

    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    })

    const selected = watch('sensor')

    const onSubmit = (data) => {
        console.log('센서:', data.sensor)
        navigate('/Login')
    }

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
                    { id: 'libre2', label: 'Libre 2', img: libre2 },
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

            <button
            className="button-box"
            type="submit"
            disabled={!isValid}
            style={{ opacity: isValid ? 1 : 0.5 }}
            >시작하기</button>
                </form>
            </div>
        </>
    )
}

export default SignUp_7;
