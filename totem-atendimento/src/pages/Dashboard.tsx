import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

export type UserData = {
    username: string
}

function Dashboard() {
    const [user, setUser] = useState({} as UserData)
    const navigate = useNavigate();
    useEffect(() => {
        const hasToken = localStorage.getItem("@toten_atentimento_token")
        const user = JSON.parse(localStorage.getItem("@toten_atentimento_user")!)
        if (!hasToken) {
            navigate("/login")
        }

        setUser(user)
    }, [])

    function handleLogout() {
        localStorage.removeItem("@toten_atentimento_token")
        localStorage.removeItem("@toten_atentimento_user")
        navigate("/login")
    }
    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/#/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                    <span className="fs-4">Dashboard</span>
                </a>

                <ul className="nav nav-pills">
                    <Stack direction="horizontal" gap={1}>
                        <li className="nav-item"><Button onClick={() => navigate("/cliente/cadastrar")} variant="primary">Cadastrar Cliente</Button></li>
                        <li className="nav-item"><Button onClick={handleLogout} variant="danger">Sair do Sistema</Button></li>
                    </Stack>
                </ul>
            </header>
            <div className="px-4 py-5 my-5 text-center">
                <img className="d-block mx-auto mb-4" src="https://jardeltur.com.br/wp-content/uploads/2019/09/icone-atendimento.png" alt="" width="72" height="57" />
                <h1 className="display-5 fw-bold">Sistema de Atendimento</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Bem vindo <b>{user.username}</b>, bom trabalho!</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
