import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Listagem = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [pesquisa, setPesquisa] = useState({
    nome: '',
    cpf: '',
    id: '',
  });
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    setCarregando(true);
    try {
      const response = await axios.get('/api/funcionarios'); // URL da sua API
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handlePesquisaChange = (e) => {
    const { name, value } = e.target;
    setPesquisa({
      ...pesquisa,
      [name]: value,
    });
  };

  const handlePesquisar = async () => {
    setCarregando(true);
    try {
      const response = await axios.get('/api/funcionarios', {
        params: pesquisa,
      });
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao pesquisar os dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluir = async (id) => {
    try {
      await axios.delete(`/api/funcionarios/${id}`);
      fetchFuncionarios();
    } catch (error) {
      console.error('Erro ao excluir o dado:', error);
    }
  };

  const handleAtivarInativar = async (id, status) => {
    try {
      await axios.patch(`/api/funcionarios/${id}`, { ativo: !status });
      fetchFuncionarios();
    } catch (error) {
      console.error('Erro ao ativar/inativar o dado:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between mb-3">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Pesquisar por ID"
            name="id"
            value={pesquisa.id}
            onChange={handlePesquisaChange}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Pesquisar por Nome"
            name="nome"
            value={pesquisa.nome}
            onChange={handlePesquisaChange}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Pesquisar por CPF"
            name="cpf"
            value={pesquisa.cpf}
            onChange={handlePesquisaChange}
          />
        </Col>
        <Col md={2}>
          <Button onClick={handlePesquisar} variant="primary">
            Pesquisar
          </Button>
        </Col>
        <Col md={1}>
          <Button variant="success" onClick={() => navigate('/cadastro')}>
            Novo
          </Button>
        </Col>
      </Row>
      {carregando ? (
        <div>Carregando...</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
           {/*} {funcionarios.map((funcionario) => (
              <tr key={funcionario.id}>
                <td>{funcionario.id}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cpf}</td>
                <td>
                  <Button
                    variant="warning"
                    className="mr-2"
                    onClick={() => history.push(`/editar/${funcionario.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    className="mr-2"
                    onClick={() => handleExcluir(funcionario.id)}
                  >
                    Excluir
                  </Button>
                  <Button
                    variant={funcionario.ativo ? 'secondary' : 'success'}
                    onClick={() => handleAtivarInativar(funcionario.id, funcionario.ativo)}
                  >
                    {funcionario.ativo ? 'Inativar' : 'Ativar'}
                  </Button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Listagem;