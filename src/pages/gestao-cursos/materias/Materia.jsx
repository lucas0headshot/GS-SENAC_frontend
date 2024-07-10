import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Form, Row, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SelectCurso from '../../../components/gestao-cursos/curso/SelectCurso';
import API_PATH from '../../../../API_PATH';

/**
 * @description Página de Matéria.
 *
 * @author Lucas Ronchi <@lucas0headshot>
 *
 * @return {ReactComponent}
 */
const Materia = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        curso: {
            id: 0
        },
        cargaHoraria: 0
    });

    useEffect(() => {
        if (id) {
            fetchMateria(id);
        }
    }, [id]);

    const fetchMateria = async (id) => {
        setCarregando(true);
        await axios.get(`http://localhost:8080/api/materias/${id}`)
            .then(response => {
                const formData = {
                    nome: response.data.nome,
                    curso: {
                        id: response.data.curso.id
                    },
                    id: id,
                    cargaHoraria: response.data.cargaHoraria
                }
                setFormData(formData);
            })
            .catch(err => {
                console.error('Erro ao realizar GETID em Curso:', err);
            })
            .finally(() => {
                setCarregando(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "curso") {
            setFormData({
                ...formData,
                [name]: {
                    id: parseInt(value, 10)
                }
            });
            return
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`${API_PATH}materias/${id}`, formData);
            } else {
                await axios.post(`${API_PATH}materias`, formData);
            }

            navigate('/gestao-cursos/materias');
        } catch (err) {
            console.error('Erro ao realizar POST/PUT em Curso:', err);
        }
    };

    const handleCancel = () => {
        navigate("/gestao-cursos/materias");
    }

    return (
        <Col md={10} lg={8} xs={12}>
            {carregando ? (
                <div className="text-center fs-3">Carregando...</div>
            ) : (
                <Card className="shadow">
                    <Card.Header className="bg-primary text-white">
                        <Card.Title className='text-uppercase'>{id ? 'Editar' : 'Cadastrar'} Matéria</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form className="d-flex flex-column gap-2">
                            <Row className="gap-2">
                                <Form.Group controlId="nome" as={Col}>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control placeholder="Digite o nome" minLength={3} type="text" name="nome" value={formData.nome} onChange={handleChange} required/>
                                </Form.Group>
                                <Form.Group controlId="cargaHoraria" as={Col}>
                                    <Form.Label>Carga Horária Total</Form.Label>
                                    <Form.Control type="number" name="cargaHoraria" required value={formData.cargaHoraria} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Row className="gap-2">
                                <SelectCurso controlId="curso" onChange={handleChange} label="Curso" value={formData.curso.id || 0} required name="curso" />
                            </Row>
                            <Card.Footer className="bg-body d-flex justify-content-end gap-2">
                                <Button variant="primary" type="submit" onClick={handleSubmit}>Salvar</Button>
                                <Button variant="secondary" onClick={handleCancel} type="button">Cancelar</Button>
                            </Card.Footer>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </Col>
    );
}

export default Materia