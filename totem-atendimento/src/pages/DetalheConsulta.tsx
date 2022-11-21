import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { useLocation, useNavigate } from 'react-router-dom';
import { parseISO } from 'date-fns';
import axios from 'axios';
import { UserContext } from '../contexts/user/UserContext';

const DetalheConsulta = () => {
    const user = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation();

    const formattedDate = format(
        parseISO(location.state.DataConsulta),
        "'Dia' dd 'de' MMMM', às ' HH:mm'h'"
        , { locale: ptBR });

        function finalizaConsulta(){
            const consulta = {
                data: {
                    TipoConsulta: location.state.TipoConsulta,
                    DataConsulta: location.state.DataConsulta,
                    Setor: location.state.Setor,
                    Andar: location.state.Andar,
                    cpf: user.user?.CPF,
                }
              }

              axios.post(`${import.meta.env.VITE_API_URL}/api/consulta-agendadas`, consulta).then(() => {
                navigate('/')
              })
        }

    return (
        <main>
            <div className='center-card'>
                <div className="card">
                    <h1>Detalhe da sua consulta</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Data</th>
                                <th>Setor</th>
                                <th>Andar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{location.state.TipoConsulta}</td>
                                <td>{formattedDate}</td>
                                <td>{location.state.Setor}</td>
                                <td>{location.state.Andar}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button onClick={() => finalizaConsulta()} variant="primary">Finalizar Atendimento</Button>
                </div>
            </div>
        </main>
    )
}

export default DetalheConsulta