import React from 'react'
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Stack from 'react-bootstrap/Stack';
import { UserData } from './Dashboard';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

type ClientData = {
  Nome: string,
  RG: string,
  NCarteira: string,
  Endereco: string,
  NResidencial: number,
  Complemento: string,
  Telefone: string,
  base64: Text | undefined,
  CPF: string,
}

const CadastroCliente = () => {
  const [user, setUser] = useState({} as UserData)
  const [token, setToken] = useState<string>()
  const [base64, setBase64] = useState<URL | RequestInfo>(new URL('/en-US/docs', "https://developer.mozilla.org/fr-FR/toto"))
  const [show, setShow] = useState(false);
  const webcamRef = React.useRef(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  var fd = new FormData();
  useEffect(() => {
    const hasToken = localStorage.getItem("@toten_atentimento_token")
    const user = JSON.parse(localStorage.getItem("@toten_atentimento_user")!)

    if (!hasToken) {
      navigate("/login")
    } else {
      setToken(hasToken)
    }

    setUser(user)
  }, [])

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: any) => handleStoreUser(data);
  const handleStoreUser = (ClientData: ClientData) => {
    fetch(base64)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], "rosto.jpeg");
            fd.append('file', file)
            const API_URL = `http://localhost:8080/faces?id=${ClientData.CPF}`
            fetch(API_URL, {method: 'POST', body: fd})
            .then(() => {
              const paciente = {
                data: {
                  Nome: ClientData.Nome,
                  RG: ClientData.RG,
                  NCarteira: ClientData.NCarteira,
                  Endereco: ClientData.Endereco,
                  NResidencial: ClientData.NResidencial,
                  Complemento: ClientData.Complemento,
                  Telefone: ClientData.Telefone,
                  base64: base64,
                  CPF: ClientData.CPF
                }
              }
              axios.post("http://localhost:80/api/pacientes", paciente)
            })
        }).then((() => alert("Cadastrado")))
  }

  function handleLogout() {
    localStorage.removeItem("@toten_atentimento_token")
    localStorage.removeItem("@toten_atentimento_user")
    navigate("/login")
  }
  const [imgSrc, setImgSrc] = React.useState<string>();
  const capture = React.useCallback(() => {
    const foto = webcamRef.current.getScreenshot();
    setBase64(foto)
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