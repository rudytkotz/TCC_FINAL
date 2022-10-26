import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const TipoConsulta = () => {
    const navigate = useNavigate()
    const location = useLocation();
    return (
        <main>
            <div className='center-card'>
                <div className="card">
                <div className="buttons-container-mod">
                    <button onClick={() => navigate('/consulta-agendada')} className="block">Consulta Agendada</button>
                    <button style={{background: "red"}} onClick={() => navigate('/')} className="block">Cancelar</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default TipoConsulta