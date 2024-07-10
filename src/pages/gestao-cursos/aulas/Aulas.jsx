import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API_PATH from '../../../../API_PATH'; 

const Aulas = () => {
    const [aulas, setAulas] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await Axios.get(`${API_PATH}aulas`);
            setAulas(response.data.content);
        } catch (err) {
            console.error('Erro ao buscar aulas:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (aula) => {
        try {
            await Axios.delete(`${API_PATH}aulas/${aula.id}`);
            fetchData(); 
        } catch (err) {
            console.error('Erro ao excluir aula:', err);
        }
    };

    return (
        <Container className="mt-5">
            <Button variant="primary" onClick={() => navigate('/gestao-cursos/aulas/criar')}>Criar</Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Matéria</th>
                        <th>Dia</th>
                        <th>Professor</th>
                    </tr>
                </thead>
                <tbody>
                    {aulas.map((aula, i) => (
                         <tr key={aula.id} >
                            <td>{aula.nome}</td>
                            <td>{aula.dia}</td>
                            <td>{aula.nomeProfessor}</td>
                            <td className="justify-content-center d-flex gap-2">
                                <Button variant="warning" onClick={() => navigate(`/gestao-cursos/aulas/editar/${aula.id}`)}>Editar</Button>
                                <Button variant="danger" onClick={() => window.confirm("Deseja realmente excluir esta aula?") ? handleDelete(aula) : null}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Aulas;
