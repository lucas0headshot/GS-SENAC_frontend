import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, Form, Button } from 'react-bootstrap';
import SelectMateria from '../../../components/gestao-cursos/materia/SelectMateria';
import SelectFuncionario from '../../../components/gestao-cursos/curso/SelectFuncionario';

const Aula = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        materia: { id: 0 },
        dia: '',
        professor: { id: 0 }
    });
    const [materias, setMaterias] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        if (id) {
            fetchAula();
        }
        fetchMaterias();
        fetchFuncionarios();
    }, [id]);

    const fetchAula = async () => {
        try {
            const response = await Axios.get(`http://localhost:8080/api/aulas/${id}`);
            setFormData(response.data); 
        } catch (err) {
            console.error('Erro ao realizar GET em aulas:', err);
        }
    };

    const fetchMaterias = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/api/materias');
            setMaterias(response.data);
        } catch (err) {
            console.error('Erro ao buscar matérias:', err);
        }
    };

    const fetchFuncionarios = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/api/funcionarios');
            setFuncionarios(response.data);
        } catch (err) {
            console.error('Erro ao buscar funcionários:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'materia' || name === 'professor' ? { id: parseInt(value) } : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await Axios.put(`http://localhost:8080/api/aulas/${id}`, formData);
            } else {
                await Axios.post('http://localhost:8080/api/aulas', formData);
            }
            navigate('/gestao-cursos/aulas');
        } catch (err) {
            console.error('Erro ao realizar POST/PUT em aulas:', err);
        }
    };

    return (
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={10} lg={8} xs={12}>
                    <Card className="shadow">
                        <Card.Header>
                            <Card.Title className='text-uppercase'>{id ? 'Editar' : 'Cadastrar'} Aula</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-2">
                                    <SelectMateria
                                        controlId="materia"
                                        className="mb-2"
                                        label="Matéria"
                                        name="materia"
                                        value={formData.materia.id}
                                        onChange={handleChange}
                                        options={materias}
                                    />
                                    <Form.Group controlId="dia" as={Col} className="mb-2">
                                        <Form.Label>Dia</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dia"
                                            value={formData.dia}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-2">
                                    <SelectFuncionario
                                        controlId="professor"
                                        className="mb-2"
                                        label="Professor"
                                        name="professor"
                                        value={formData.professor.id}
                                        onChange={handleChange}
                                        options={funcionarios}
                                    />
                                </Row>
                                <Button variant="primary" type="submit">Salvar</Button>
                                <Button variant="secondary" type="button" onClick={() => navigate('/gestao-cursos/aulas')}>Cancelar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Aula;
