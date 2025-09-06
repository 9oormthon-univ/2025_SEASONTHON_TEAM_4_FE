import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {useNavigate} from "react-router-dom";
import "./Signup.css";
import "./Signup_2.css"

const SignUp = () => {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string()
            .min(1, "이름을 최소 1글자 이상 입력해주세요!")
            .max(8, "이름은 최대 8글자까지 입력할 수 있어요!")
            .required("을 입력해주세요!"),
    })

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    const onSubmit = (data) => {
        console.log('이름:', data.name);
        navigate("/Signup_2");
    }

    return (
        <>
            <div className="title-bar"></div>
            <div className="frame">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-area">
                        <h1>안녕!</h1>
                        <h1>너의 이름을 알려줘</h1>
                    </div>
                    <div>
                        <input className="input-box"
                               type="text"
                               placeholder="이곳에 이름을 입력해주세요"
                               {...register("name")}/>
                        {errors.name && <p className="error-message">{errors.name.message}</p>}
                    </div>
                    <button className="button-box"
                            type="submit"
                            disabled={!isValid}
                            style={{ opacity: isValid ? 1 : 0.5 }}>다음</button>
                </form>
            </div>
        </>
    );
};

export default SignUp;