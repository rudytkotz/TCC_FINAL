import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/user/UserContext';
import "../styles/paciente.css"

const Paciente = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const user = useContext(UserContext)
    return (
        <main>
            <div className='center-card'>
                <div className="card">
                    <div className="text">
                        <img src={user.photo} alt="" />
                        <h3>{user.user?.Nome}</h3>
                        <p><b>Nº Carteira:</b> <span>{user.user?.NCarteira}</span></p>
                        <p><b>Documento:</b> <span>{user.user?.CPF}</span></p>
                    </div>
                    <div className='btn-group'>
                        <button onClick={() => navigate("/")} className='button-photo mr-1'>Cancelar</button>
                        <button onClick={() => navigate("/tipo-consulta", {state:{cardId:12212312312}})} className='button-photo'>Confirmar</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Paciente