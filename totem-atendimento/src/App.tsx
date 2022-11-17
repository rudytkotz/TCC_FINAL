import { HashRouter, Route, Routes } from 'react-router-dom'
import CadastroCliente from './pages/CadastroCliente'
import ConsultaAgendada from './pages/ConsultaAgendada'
import Dashboard from './pages/Dashboard'
import DetalheConsulta from './pages/DetalheConsulta'
import Home from './pages/Home'
import Login from './pages/Login'
import LoginFuncionario from './pages/LoginFuncionario'
import NotFound from './pages/NotFound'
import Paciente from './pages/Paciente'
import Recepcao from './pages/Recepcao'
import Reconhecimento from './pages/Reconhecimento'
import TipoConsulta from './pages/TipoConsulta'

export function App() {
  return (
    <Routes>
      <Route path="/"  element={<Login />} />
      <Route path="/recepcao"  element={<Recepcao />} />
      <Route path="/reconhecimento"  element={<Reconhecimento />} />
      <Route path="/paciente"  element={<Paciente />} />
      <Route path="/tipo-consulta"  element={<TipoConsulta />} />
      <Route path="/consulta-agendada"  element={<ConsultaAgendada />} />
      <Route path="/detalhe-consulta"  element={<DetalheConsulta />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginFuncionario />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cliente/cadastrar" element={<CadastroCliente />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}
