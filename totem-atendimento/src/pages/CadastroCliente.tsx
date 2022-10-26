import React from 'react'
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Stack from 'react-bootstrap/Stack';
import { UserData } from './Dashboard';
import { Row, Col } from 'react-bootstrap';

type ClientData = {
  Nome: string,
  RG: string,
  NCarteira: string,
  Endereco: string,
  NResidencial: number,
  Complemento: string,
  Telefone: string,
  base64: string | undefined,
  CPF: string,
}

const CadastroCliente = () => {
  const [user, setUser] = useState({} as UserData)
  const [token, setToken] = useState<string>()
  const [show, setShow] = useState(false);
  const webcamRef = React.useRef(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = localStorage.getItem("@toten_atentimento_token")
    const user = JSON.parse(localStorage.getItem("@toten_atentimento_user")!)
    console.log(user)
    console.log(hasToken)
    if (!hasToken) {
      navigate("/login")
    } else {
      setToken(hasToken)
    }

    setUser(user)
  }, [])

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: any) => handleLogin(data);
  const handleLogin = (ClientData: ClientData) => {
    ClientData.base64 = imgSrc
    axios.post("http://localhost:80/api/pacientes", ClientData, {
      headers: {
        'Authorization': `Bearer ${token?.replace('"', '')}` 
      }
    })
    console.log(ClientData)
  }

  function handleLogout() {
    localStorage.removeItem("@toten_atentimento_token")
    localStorage.removeItem("@toten_atentimento_user")
    navigate("/login")
  }
  const [imgSrc, setImgSrc] = React.useState<string>();
  const capture = React.useCallback(() => {
    const foto = webcamRef.current.getScreenshot();
    setImgSrc(foto);
}, [webcamRef, setImgSrc]);

  return (<>
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/#/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
          <span className="fs-4">Cadastro de Cliente</span>
        </a>

        <ul className="nav nav-pills">
          <Stack direction="horizontal" gap={1}>
            <li className="nav-item"><Button onClick={() => navigate("/cliente/cadastrar")} variant="primary">Cadastrar Cliente</Button></li>
            <li className="nav-item"><Button onClick={handleLogout} variant="danger">Sair do Sistema</Button></li>
          </Stack>
        </ul>
      </header>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Row>
        <button className='button-photo mb-3' onClick={handleShow} >Tirar Foto</button>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3" controlId="formBasicNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control {...register("Nome", { required: true })} type="text" placeholder="Digite um nome" />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3" controlId="formBasicCpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control {...register("CPF", { required: true })} type="text" placeholder="Digite um cpf" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3" controlId="formBasicRg">
              <Form.Label>RG</Form.Label>
              <Form.Control {...register("RG", { required: true })} type="text" placeholder="Digite um RG" />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3" controlId="formBasicNCarteira">
              <Form.Label>Nº Carteira</Form.Label>
              <Form.Control {...register("NCarteira", { required: true })} type="text" placeholder="Digite um nº de carteira" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3" controlId="formBasicEndereco">
              <Form.Label>Endereco</Form.Label>
              <Form.Control {...register("Endereco", { required: true })} type="text" placeholder="Digite um endereço" />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3" controlId="formBasicResidencial">
              <Form.Label>Nº Residencial</Form.Label>
              <Form.Control {...register("NResidencial", { required: true })} type="text" placeholder="Digite o nº residencial" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3" controlId="formBasicComplemento">
              <Form.Label>Complemento</Form.Label>
              <Form.Control {...register("Complemento")} type="text" placeholder="Digite um complemento" />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3" controlId="formBasicTelefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control {...register("Telefone")} type="text" placeholder="Digite um telefone" />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </div>
    <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
      <div className="col-md-12 text-center">
        <span className="mb-3 mb-md-0 text-muted">© 2022 Sistema de Atendimento</span>
      </div>
    </footer>
    <Modal show={show} className="modal-lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Capture a foto do cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>
        {!imgSrc ? <Webcam audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
        />: <img src={imgSrc} alt="" />}
        </Modal.Body>
        <Modal.Footer>
          {!imgSrc ? <><Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={capture}>
            Capturar Foto
          </Button> </>: <><Button variant="danger" onClick={() => setImgSrc("")}>
            Capturar Novamente
          </Button>
          <Button variant="success" onClick={handleClose}>
            Salvar Foto
          </Button> </>}
          
        </Modal.Footer>
      </Modal>
  </>
  )
}

export default CadastroCliente