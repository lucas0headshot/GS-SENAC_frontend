import { useEffect, useState } from "react"
import Axios from 'axios';
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Inscricoes = () => {
    const [inscricoes, setInscricoes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await Axios.get('http://localhost:8080/api/inscricoes');
                setInscricoes(response.data.content);
            } catch (err) {
                console.error(err)
            }
        };

        fetchData();
    }, []);

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
        </tr>
      </thead>
      <tbody>
        {inscricoes.map((inscricao, i) => (
        <tr key={i}>
          <td>{inscricao.data}</td>
          <td>{inscricao.status}</td>
          <td>{inscricao.valor}</td>
          <td>{inscricao.funcionario.email}</td>
        </tr>
        ))}
      </tbody>
    </Table>
        </Container>
    )
}

export default Inscricoes
