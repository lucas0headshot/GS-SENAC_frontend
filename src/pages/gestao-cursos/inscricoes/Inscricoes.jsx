import { useEffect, useState } from "react"
import Axios from 'axios';
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API_PATH from "../../../API_PATH";

const Inscricoes = () => {
  const [inscricoes, setInscricoes] = useState([])
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await Axios.get(`${API_PATH}inscricoes`);
      setInscricoes(response.data.content);
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
    <Container className="mt-5">
      <Button variant="primary" onClick={() => {
        navigate('/gestao-cursos/inscricoes/criar')
      }}>Criar</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Data</th>
            <th>Status</th>
            <th>Valor</th>
            <th>Inscrito</th>
            <th>Curso</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {inscricoes.map((inscricao) => (
            <tr key={inscricao.id} >
              <td>{new Date(`${inscricao.data} 00:00:00`).toLocaleDateString()}</td>
              <td>{inscricao.status}</td>
              <td>R${inscricao.valor}</td>
              <td>{inscricao.funcionario.email}</td>
              <td>{inscricao.curso.nome}</td>
              <td className="justify-content-center d-flex gap-2" ><Button variant="warning" onClick={() =>
                navigate(`/gestao-cursos/inscricoes/editar/${inscricao.id}`)
              }>Editar</Button>
                <Button variant="danger" onClick={() => window.confirm("Deseja realmente excluir esta inscrição ?") ? handleDelete(inscricao) : null} >Excluir</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Inscricoes
