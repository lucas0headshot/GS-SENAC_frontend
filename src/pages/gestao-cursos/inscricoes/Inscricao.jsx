import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, Form, Button } from 'react-bootstrap';
import SelectFuncionario from '../../../components/gestao-cursos/curso/SelectFuncionario'
import SelectCurso from '../../../components/gestao-cursos/curso/SelectCurso';

/**
 * @description Página de inscrição
 *
 * @author Juan Carlos <@JuannCarloss>
 *
 * @return {React.Component}
 */
const Inscricao = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(false);
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
        setCarregando(true);
        await Axios.get(`http://localhost:8080/api/inscricoes/${id}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(err => {
                console.error('Erro ao realizar GETID em inscricao:', err);
            })
            .finally(() => {
                setCarregando(false);
            });
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
        try {
            if (id) {
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
        <Col md={10} lg={8} xs={12}>
            {carregando ? (
                <div className="text-center fs-3">Carregando...</div>
            ) : (
                <Card className="shadow">
                    <Card.Header className="bg-primary text-white">
                        <Card.Title className='text-uppercase'>{id ? 'Editar' : 'Cadastrar'} Inscrição</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form className="d-flex flex-column gap-2">
                            <Row className="gap-2">
                                <Form.Group controlId="data" as={Col}>
                                    <Form.Label>Data</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="data"
                                        min={new Date()}
                                        value={formData.data}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="gap-2">
                                <SelectFuncionario
                                controlId="inscrito"
                                label="Inscrito"
                                name="inscrito"
                                value={formData.inscrito.id || 0}
                                onChange={handleChange}/>
                                <Form.Group controlId="valor" as={Col}>
                                    <Form.Label>Valor</Form.Label>
                                    <Form.Control type="number" name="valor" required value={formData.valor || 0} min={0} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Row className="gap-2">
                                <SelectCurso
                                controlId='curso'
                                label='Curso'
                                name='curso'
                                value={formData.curso.id || 0}
                                onChange={handleChange}
                                    />
                            </Row>
                            <Card.Footer className="justify-content-end d-flex gap-2 bg-body">
                                <Button variant="primary" type="submit" onClick={handleSubmit}>Salvar</Button>
                                <Button variant="secondary" type="button" onClick={() => {
                                    navigate('/gestao-cursos/inscricoes')
                                }}>Cancelar</Button>
                            </Card.Footer>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </Col>
    )
}

export default Inscricao
