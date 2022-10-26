import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import '../styles/login.style.css'

type AuthData = {
    identifier: string,
    password: string
}

const LoginFuncionario = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => handleLogin(data);

    const handleLogin = (credential: AuthData) => {
        axios.post("http://localhost:80/api/auth/local", credential)
        .then((res) => {
            localStorage.setItem('@toten_atentimento_user', JSON.stringify(res.data.user));
            localStorage.setItem('@toten_atentimento_token', JSON.stringify(res.data.jwt));
            navigate('/dashboard')
        })
        .catch(err => {
            alert("Houve um erro ao fazer login!")
            localStorage.removeItem('@toten_atentimento_user')
            localStorage.removeItem('@toten_atentimento_token')
        })
    }

    return (
        <div id='form-login-funcionario'>
            <div className="container-mod">
                <div id="loginFunc">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form__group">
                            <input {...register("identifier", { required: true })} className="form__input" placeholder='Usuário' />
                        </div>
                        <div className="form__group">
                            <input {...register("password", { required: true })} type="password" className="form__input" placeholder='Senha' />
                        </div>
                        <div className="buttons-container-mod">
                            <button type='submit' className="block">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginFuncionario