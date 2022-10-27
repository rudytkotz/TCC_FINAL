import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/paciente.css"

const Paciente = () => {
    const navigate = useNavigate()
    const location = useLocation();
    return (
        <main>
            <div className='center-card'>
                <div className="card">
                    <div className="text">
                        <img src={location.state.photo} alt="" />
                        <h3>{location.state.name}</h3>
                        <p><b>Nº Carteira:</b> <span>{location.state.cardId}</span></p>
                        <p><b>Documento:</b> <span>{location.state.document}</span></p>
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