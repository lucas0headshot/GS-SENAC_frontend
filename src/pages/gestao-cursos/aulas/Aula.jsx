import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, Form, Button } from 'react-bootstrap';
import SelectMateria from '../../../components/gestao-cursos/materia/SelectMateria';
import SelectFuncionario from '../../../components/gestao-cursos/curso/SelectFuncionario';

/**
 * @description Página de Aula.
 *
 * @author Gabriel Zomer <@Carrerogabriel>
 *
 * @return {React.Component}
 */
const Aula = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(false);
    const [formData, setFormData] = useState({
        materia: { id: 0 },
        dia: '',
        professor: { id: 0 }
    });

    useEffect(() => {
        if (id) {
            fetchAula();
        }
    }, [id]);

    const fetchAula = async () => {
        try {
            setCarregando(true);
            const response = await Axios.get(`http://localhost:8080/api/aulas/${id}`);
            setFormData(response.data);
            setCarregando(false);
        } catch (err) {
            console.error('Erro ao realizar GET em aulas:', err);
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
        <Col md={10} lg={8} xs={12}>
            {carregando ? (
                <div className="text-center fs-3">Carregando...</div>
            ) : (
                    <Card className="shadow">
                        <Card.Header className="bg-primary text-white">
                            <Card.Title className='text-uppercase'>{id ? 'Editar' : 'Cadastrar'} Aula</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
                                <Row className="gap-2">
                                    <SelectMateria
                                        controlId="materia"
                                        label="Matéria"
                                        name="materia"
                                        value={formData.materia.id}
                                        onChange={handleChange}
                                    />
                                    <Form.Group controlId="dia" as={Col}>
                                        <Form.Label>Dia</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dia"
                                            min={new Date()}
                                            value={formData.dia}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="gap-2">
                                    <SelectFuncionario
                                        controlId="professor"
                                        label="Professor"
                                        name="professor"
                                        value={formData.professor.id}
                                        onChange={handleChange}
                                    />
                                </Row>
                                <Card.Footer className="bg-body d-flex justify-content-end gap-2">
                                    <Button variant="primary" type="submit">Salvar</Button>
                                    <Button variant="secondary" type="button" onClick={() => navigate('/gestao-cursos/aulas')}>Cancelar</Button>
                                </Card.Footer>
                            </Form>
                        </Card.Body>
                    </Card>
                )}
        </Col>
    );
};

export default Aula;
