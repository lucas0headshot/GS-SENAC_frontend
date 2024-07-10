import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, Form, Button } from 'react-bootstrap';
import SelectAula from '../../../components/gestao-cursos/aula/SelectAula'; 
import SelectAluno from '../../../components/gestao-cursos/inscricao/SelectAluno';
const Frequencia = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        frequencia: false,
        aula: { id: 0 },
        aluno: { id: 0 }
    });
    const [aulas, setAulas] = useState([]);
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        if (id) {
            fetchFrequencia();
        }
        fetchAulas();
        fetchAlunos();
    }, [id]);

    const fetchFrequencia = async () => {
        try {
            const response = await Axios.get(`http://localhost:8080/api/frequencia/${id}`);
            setFormData(response.data); 
        } catch (err) {
            console.error('Erro ao realizar GET em frequencias:', err);
        }
    };

    const fetchAulas = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/api/aulas');
            setAulas(response.data);
        } catch (err) {
            console.error('Erro ao buscar aulas:', err);
        }
    };

    const fetchAlunos = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/api/inscricao');
            setAlunos(response.data);
        } catch (err) {
            console.error('Erro ao buscar alunos:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : { id: parseInt(value) },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await Axios.put(`http://localhost:8080/api/frequencias/${id}`, formData);
            } else {
                await Axios.post('http://localhost:8080/api/frequencias', formData);
            }
            navigate('/gestao-cursos/frequencias');
        } catch (err) {
            console.error('Erro ao realizar POST/PUT em frequencias:', err);
        }
    };

    return (
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={10} lg={8} xs={12}>
                    <Card className="shadow">
                        <Card.Header>
                            <Card.Title className='text-uppercase'>{id ? 'Editar' : 'Cadastrar'} Frequência</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-2">
                                    <SelectAula
                                        controlId="aula"
                                        className="mb-2"
                                        label="Aula"
                                        name="aula"
                                        value={formData.aula.id}
                                        onChange={handleChange}
                                        options={aulas}
                                    />
                                    <SelectAluno
                                        controlId="inscrito"
                                        className="mb-2"
                                        label="inscrito"
                                        name="inscrito"
                                        value={formData.aluno.id}
                                        onChange={handleChange}
                                        options={alunos}
                                    />
                                    <Form.Group controlId="frequencia" as={Col} className="mb-2">
                                        <Form.Check
                                            type="checkbox"
                                            label="Presente"
                                            name="frequencia"
                                            checked={formData.frequencia}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Row>
                                <Button variant="primary" type="submit">Salvar</Button>
                                <Button variant="secondary" type="button" onClick={() => navigate('/gestao-cursos/frequencias')}>Cancelar</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Frequencia;
