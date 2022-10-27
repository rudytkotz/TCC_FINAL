import React, {useEffect} from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useLocation, useNavigate } from 'react-router-dom';

const DetalheConsulta = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
          navigate('/')
        }, 20000);
        return () => clearTimeout(timer);
      }, []);

    const navigate = useNavigate()
    const location = useLocation();
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
                                <td>{location.state.DataConsulta}</td>
                                <td>{location.state.Setor}</td>
                                <td>{location.state.Andar}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button onClick={() => navigate('/')} variant="primary">Finalizar Atendimento</Button>
                </div>
            </div>
        </main>
    )
}

export default DetalheConsulta