import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/login.style.css'

const Login = () => {
    const navigate = useNavigate();

    return (
        <main>
            <div className="container-mod">
                <div className="content">
                    <h1>Por favor, escolha uma das opções abaixo </h1>
                </div>
                <div className="buttons-container-mod">
                    <button onClick={() => navigate('/reconhecimento')} className="block">Já tenho cadastro</button>
                    <button onClick={() => navigate('/recepcao')} className="block">Não tenho cadastro</button>
                    </div>
            </div>
        </main>
    )
}

export default Login