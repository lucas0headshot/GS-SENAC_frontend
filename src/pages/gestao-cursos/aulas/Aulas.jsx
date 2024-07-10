import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button, Row, Table, Col, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API_PATH from '../../../../API_PATH';
import getDayFromDate from '../../../components/helpers/data/getDayFromDate';

/**
 * @description Página de aulas
 *
 * @author Gabriel Zomer <@Carrerogabriel>
 *
 * @return {React.Component}
 */
const Aulas = () => {
    const [aulas, setAulas] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setCarregando(true);
            const response = await Axios.get(`${API_PATH}aulas`);
            setAulas(response.data.content);
            setCarregando(false);
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

    const handleCadastrar = () => {
        navigate('/gestao-cursos/aulas/criar');
    }

    return (
        <Row>
            <Row className="justify-content-between mb-3">
                <Col md={1}>
                    <Button variant="success" onClick={handleCadastrar}>Cadastrar</Button>
                </Col>
            </Row>

            {carregando ? (
                <div className="text-center fs-3">Carregando...</div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Matéria</th>
                            <th>Dia</th>
                            <th>Professor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!aulas.length ? (
                            <tr>
                                <td colSpan="6" className="text-center">Nenhuma aula encontrada</td>
                            </tr>
                        ) : (
                            aulas.map((aula, i) => (
                                <tr key={i} >
                                    <td>{aula.materia.nome}</td>
                                    <td>{getDayFromDate(aula.dia)}</td>
                                    <td>{aula.professor.nome}</td>
                                    <td className="text-center">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id={`dropdown-aula-${aula.id}`}>Ações</Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => navigate(`/gestao-cursos/aulas/editar/${aula.id}`)}>Editar</Dropdown.Item>
                                                <Dropdown.Item onClick={() => window.confirm("Deseja realmente excluir esta aula?") ? handleDelete(aula) : null}>Excluir</Dropdown.Item>
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
    );
};

export default Aulas;
