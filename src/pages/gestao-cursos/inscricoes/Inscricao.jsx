import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, Form, Button } from 'react-bootstrap';
import SelectFuncionario from '../../../components/gestao-cursos/curso/SelectFuncionario'
import SelectCurso from '../../../components/gestao-cursos/curso/SelectCurso';


const Inscricao = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        inscrito: { id: 0 },
        data: '',
        valor: 0,
        curso: { id: 0 }

    });

    useEffect(() => {
        if (id) {
            fetchInscricao();
        }
    }, [id]);

    const fetchInscricao = async () => {
        Axios.get(`http://localhost:8080/api/inscricoes/${id}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(err => {
                console.error('Erro ao realizar GETID em inscricao:', err);
            })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        if (name === "inscrito") {
            setFormData({
                ...formData,
                inscrito: {
                    ...formData.inscrito,
                    id: parseInt(value, 10)
                }
            });
            return
        }
        if (name === "curso") {
            setFormData({
                ...formData,
                curso: {
                    ...formData.curso,
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
        formData.inscrito.id = parseInt(formData.inscrito.id);
        formData.curso.id = parseInt(formData.curso.id);
        try {
            if (id) {
                console.log('id setado')
                await Axios.put(`http://localhost:8080/api/inscricoes/${id}`, formData);
            } else {
                await Axios.post('http://localhost:8080/api/inscricoes', formData);
            }

            navigate('/gestao-cursos/inscricoes');
        } catch (err) {
            console.error('Erro ao realizar POST/PUT em inscricao:', err);
        }
    };


    return (
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={10} lg={8} xs={12}>
                    <Card className="shadow">
                        <Card.Header>
                            <Card.Title className='text-uppercase'>{id ? 'Editar' : 'Cadastrar'}Inscrição</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-3 mt-4">
                                <div className="mt-3">
                                    <Form>
                                        <Row className="mb-2">
                                            <Form.Group controlId="data" as={Col} className="mb-2">
                                                <Form.Label>Data</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="data"
                                                    value={formData.data}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-2">
                                            <SelectFuncionario 
                                            controlId="inscrito" 
                                            className="mb-2" 
                                            label="Inscrito" 
                                            name="inscrito" 
                                            value={formData.inscrito.id}
                                            onChange={handleChange}/>
                                            <Form.Group controlId="valor" as={Col} className="mb-2">
                                                <Form.Label>Carga Horária Total</Form.Label>
                                                <Form.Control type="number" name="valor" required value={formData.valor} onChange={handleChange}/>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-2">
                                            <SelectCurso 
                                            controlId='curso'
                                            className='mb-2'
                                            label='Curso'
                                            name='curso'
                                            value={formData.curso.id}
                                            onChange={handleChange}
                                             />
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Footer className="justify-content-end d-flex gap-2">
                            <Button variant="primary" type="submit" onClick={handleSubmit}>Salvar</Button>
                            <Button variant="secondary" type="button" onClick={() => {
                                navigate('/gestao-cursos/inscricoes')
                            }}>Cancelar</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Inscricao
