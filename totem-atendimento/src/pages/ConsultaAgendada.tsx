import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/user/UserContext';
import { differenceInDays, format, parseISO } from 'date-fns';

export type queryList = {
    attributes: {
        Andar: string,
        DataConsulta: number | Date,
        Setor: string,
        TipoConsulta: string,
        paciente: {
            data: {
                id: number
            }
        }
    },
    id: number,
}

const ConsultaAgendada = () => {
    const [consultas, setConsultas] = useState<queryList[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const user = useContext(UserContext)

    useEffect(() => {
        const getConsultas = async () => {
            
            const users = await axios.get(`${import.meta.env.VITE_API_URL}/api/consultas?populate=paciente`);
            const listaFiltrada = listarConsultas(users.data.data)
            setConsultas(listaFiltrada);
            setIsLoaded(true)
        };

        getConsultas();
    }, []);

    function listarConsultas(consultas: queryList[]){
        const filtered = consultas.filter(consulta => {
            return consulta.attributes?.paciente?.data?.id === user.userId ? consulta : null
        })

        const validUserQueue = filtered.filter(c => {
            const date = new Date(c.attributes.DataConsulta)
            const contagemDias = differenceInDays(date, new Date())
            return contagemDias <= 3 ? c : null
        })
        return validUserQueue
    }

    const navigate = useNavigate()
    if(!isLoaded) {
        return (
            <main>
                <div className='center-card'>
                    <div className="card">
                    <button key="recepcao" onClick={() => {}} className="block">Carregando consultas</button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main>
            <div className='center-card'>
                <div className="card">
                    { isLoaded &&
                        <div className="buttons-container-mod">
                        {consultas.length === 0 ? <button key="recepcao" onClick={() => navigate('/recepcao')} className="block">Sem consultas disponiveis</button> : consultas.map((consulta: queryList) => {
                            return <button key={consulta.id} onClick={() => navigate('/detalhe-consulta', { state: { TipoConsulta: consulta.attributes.TipoConsulta, DataConsulta: consulta.attributes.DataConsulta, Setor: consulta.attributes.Setor, Andar: consulta.attributes.Andar } })} className="block">Consulta com {consulta.attributes.TipoConsulta}</button>
                        })}
                    </div>
                    }
                </div>
            </div>
        </main>
    )
}

export default ConsultaAgendada