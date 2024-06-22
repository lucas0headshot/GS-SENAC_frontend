import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {   InputGroup,
    Col,
    Button,
    Row,
    Container,
    Card,
    Form,} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cargo:'',
    cpf: '',
    rg: '',
    endereco: '',
    ctps: '',
    salarioContratual: '',
    cargaHoraria: '',
    fonePessoal: '',
    foneRecados: '',
    titulo: '',
    carteiraReservista: '',
    dataNascimento: '',
    pis: '',
    registroProfissional: '',
    email: '',
    sindicato: '',
    setor: '',
    cnh: '',
    dataAdmissao: '',
    racaCor: '',
    religiao: '',
    doadorSangue: false,
    nacionalidade: '',
    redeSocial: '',
    areaAtuacao: '',
    matricula: '',
    idiomas: '',
    horaExtra: '',
    horaEntrada: '',
    horaSaida: ''
  });

  useEffect(() => {
    if (id) {
      fetchFuncionario();
    }
  }, [id]);

  const fetchFuncionario = async () => {
    try {
      const response = await axios.get(`/api/funcionarios/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Erro ao buscar o dado:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/api/funcionarios/${id}`, formData);
      } else {
        await axios.post('/api/funcionarios', formData);
      }
      navigate.push('/');
    } catch (error) {
      console.error('Erro ao salvar o dado:', error);
    }
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={10} lg={8} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold mb-2 text-uppercase">Cadastrar Funcionário</h2>
                <div className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-2">
                        <Form.Group controlId="nome" as={Col} className="mb-2">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                              type="text"
                              name="nome"
                              value={formData.nome}
                              onChange={handleChange}
                              required
                            />
                        </Form.Group>
                        <Form.Group controlId="cargo" as={Col} className="mb-2">
                            <Form.Label>Cargo</Form.Label>
                            <Form.Control
                              type="text"
                              name="cargo"
                              value={formData.cargo}
                              onChange={handleChange}
                              required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-2">
                        <Form.Group controlId="rg" as={Col} className="mb-2">
                            <Form.Label>RG</Form.Label>
                            <Form.Control
                              type="text"
                              name="rg"
                              value={formData.rg}
                              onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="cpf" as={Col} className="mb-2">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                              type="text"
                              name="cpf"
                              value={formData.cpf}
                              onChange={handleChange}
                              required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-2">
                        <Form.Group controlId="cargaHoraria" as={Col} className="mb-2">
                            <Form.Label>Carga Horária</Form.Label>
                            <Form.Control
                              type="number"
                              name="cargaHoraria"
                              value={formData.cargaHoraria}
                              onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="dataNascimento" as={Col} className="mb-2">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                              type="date"
                              name="dataNascimento"
                              value={formData.dataNascimento}
                              onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-2">
                        <Form.Group controlId="email" as={Col} className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="horaEntrada" as={Col} className="mb-2">
                            <Form.Label>Hora de Entrada</Form.Label>
                            <Form.Control
                              type="time"
                              name="horaEntrada"
                              value={formData.horaEntrada}
                              onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Salvar
                        </Button>
                  </div>
                </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cadastro;