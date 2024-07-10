import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API_PATH from '../../../../API_PATH'; 

const Frequencias = () => {
    const [frequencias, setFrequencias] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await Axios.get(`${API_PATH}frequencias`);
            setFrequencias(response.data.content);
        } catch (err) {
            console.error('Erro ao buscar frequências:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (frequencia) => {
        try {
            await Axios.delete(`${API_PATH}frequencias/${frequencia.id}`);
            fetchData(); 
        } catch (err) {
            console.error('Erro ao excluir frequência:', err);
        }
    };

    return (
        <Container className="mt-5">
            <Button variant="primary" onClick={() => navigate('/gestao-cursos/frequencias/criar')}>Criar</Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Aula</th>
                        <th>Aluno</th>
                        <th>Presença</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {frequencias.map((frequencia, i) => (
                        <tr key={frequencia.id} >
                            <td>{frequencia.aula.nome}</td>
                            <td>{frequencia.aluno.nome}</td>
                            <td>{frequencia.frequencia ? 'Presente' : 'Ausente'}</td>
                            <td className="justify-content-center d-flex gap-2">
                                <Button variant="warning" onClick={() => navigate(`/gestao-cursos/frequencias/editar/${frequencia.id}`)}>Editar</Button>
                                <Button variant="danger" onClick={() => window.confirm("Deseja realmente excluir esta frequência?") ? handleDelete(frequencia) : null}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Frequencias;
