import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ConsultaAgendada = () => {
    const navigate = useNavigate()
    const location = useLocation();
    return (
        <main>
            <div className='center-card'>
                <div className="card">
                <div className="buttons-container-mod">
                    <button onClick={() => navigate('/detalhe-consulta', {state:{TipoConsulta:"Nutricionista", DataConsulta: Date.now(), Setor: "Ala C", Andar: "13º Andar" }})} className="block">Consulta com nutricionista</button>
                    <button onClick={() => navigate('/detalhe-consulta', {state:{TipoConsulta:"Cardiologista", DataConsulta: Date.now(), Setor: "Ala C", Andar: "13º Andar" }})} className="block">Consulta com cardiologista</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ConsultaAgendada