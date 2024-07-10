import { useEffect, useState } from "react"
import Axios from 'axios';
import { Button, Row, Col, Table, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API_PATH from "../../../../API_PATH";
import formatDate from "../../../components/helpers/data/formatDate";

/**
 * @description Página de Inscrições.
 *
 * @author Juan Carlos <@JuannCarloss>
 *
 * @return  {React.Component}
 */
const Inscricoes = () => {
  const [inscricoes, setInscricoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setCarregando(true);
      const response = await Axios.get(`${API_PATH}inscricoes`);
      setInscricoes(response.data.content);
      setCarregando(false);
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleDelete(inscricao) {
    Axios.delete(`${API_PATH}inscricoes/${inscricao.id}`)
    location.reload()
  }

  return (
    <Row>
      <Row className="justify-content-between mb-3">
        <Col md={1}>
            <Button variant="success" onClick={() => navigate('/gestao-cursos/inscricoes/criar')}>Cadastrar</Button>
        </Col>
      </Row>

      {carregando ? (
        <div className="text-center fs-3">Carregando...</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Data</th>
              <th>Status</th>
              <th>Valor</th>
              <th>Inscrito</th>
              <th>Curso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {!inscricoes.length ? (
              <tr>
                <td colSpan="6" className="text-center">Nenhuma inscrição encontrada</td>
              </tr>
            ) : (
              inscricoes.map((inscricao) => (
                <tr key={inscricao.id} >
                  <td>{formatDate(inscricao.data)}</td>
                  <td>{inscricao.status || 'Em Análise'}</td>
                  <td>R${inscricao.valor}</td>
                  <td>{inscricao.funcionario.email}</td>
                  <td>{inscricao.curso.nome}</td>
                  <td className="text-center">
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id={`dropdown-inscricao-${inscricao.id}`}>Ações</Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={() => navigate(`/gestao-cursos/inscricoes/editar/${inscricao.id}`)}>Editar</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => window.confirm("Deseja realmente excluir esta inscrição ?") ? handleDelete(inscricao) : null}>Excluir</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Row>
  )
}

export default Inscricoes
