import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import SelectFuncionario from '../../../components/gestao-cursos/curso/SelectFuncionario';
import API_PATH from '../../../../API_PATH';

/**
 * @description Página de um Curso
 *
 * @author Lucas Ronchi <@lucas0headshot>
 *
 * @return {React.Component}
 */
const Curso = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        coordenador: {
            id: 0
        },
        cargaHorariaTotal: 0,
        dataInicio: '',
        dataInicioInscricao: '',
        dataFinal: '',
        dataFinalInscricao: '',
        limiteQtdInscricao: 0
    });

    useEffect(() => {
        if (id) {
            fetchCurso(id);
        }
    }, [id]);

    const fetchCurso = async (id) => {
        setCarregando(true);
        axios.get(`http://localhost:8080/api/cursos/${id}`)
            .then(response => {
                const curso = {
                    nome: response.data.nome,
                    descricao: response.data.descricao,
                    coordenador: {
                        id: response.data.coordenador.id
                    },
                    cargaHorariaTotal: response.data.cargaHorariaTotal,
                    dataInicio: response.data.dataInicio,
                    dataInicioInscricao: response.data.dataInicioInscricao,
                    dataFinal: response.data.dataFinal,
                    dataFinalInscricao: response.data.dataFinalInscricao,
                    limiteQtdInscricao: response.data.limiteQtdInscricao,
                    id: id
                };
                setFormData(curso);
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

        if (name === "coordenador") {
            setFormData({
                ...formData,
                [name]: {
                    id: parseInt(value, 10)
                }
            });
            return;
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
                await axios.put(`${API_PATH}cursos/${id}`, formData);
            } else {
                await axios.post(`${API_PATH}cursos`, formData);
            }

            navigate('/gestao-cursos/cursos');
        } catch (err) {
            console.error('Erro ao realizar POST/PUT em Curso:', err);
        }
    };

    const handleCancel = () => {
        navigate("/gestao-cursos/cursos");
    }

    return (
        <Col md={10} lg={8} xs={12}>
            {carregando ? (
                <div className="text-center fs-3">Carregando...</div>
            ) : (
                <Card className="shadow">
                    <Card.Header className="bg-primary text-white">
                        <Card.Title className='text-uppercase'>{id ? 'Editar' : 'Cadastrar'} Curso</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form className="d-flex flex-column gap-2">
                            <Row className="gap-2">
                                <Form.Group controlId="nome" as={Col}>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control placeholder="Digite o nome" minLength={3} type="text" name="nome" value={formData.nome} onChange={handleChange} required/>
                                </Form.Group>
                                <SelectFuncionario controlId="coordenador" onChange={handleChange} label="Coordenador" value={formData.coordenador.id || 0} required name="coordenador" />
                            </Row>
                            <Row className="gap-2">
                                <Form.Group controlId="descricao" as={Col}>
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control as="textarea" placeholder="Digite a descrição do curso"  name="descricao" value={formData.descricao} onChange={handleChange} required/>
                                </Form.Group>
                            </Row>
                            <Row className="gap-2">
                                <Form.Group controlId="cargaHorariaTotal" as={Col}>
                                    <Form.Label>Carga Horária Total</Form.Label>
                                    <Form.Control type="number" name="cargaHorariaTotal" min={1} required value={formData.cargaHorariaTotal || 1} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="limiteQtdInscricao" as={Col}>
                                    <Form.Label>Limite de Inscrições</Form.Label>
                                    <Form.Control type="number" name="limiteQtdInscricao" min={1} required value={formData.limiteQtdInscricao || 1} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Row className="gap-2">
                                <Form.Group controlId="dataInicio" as={Col}>
                                    <Form.Label>Data de Início</Form.Label>
                                    <Form.Control type="date" name="dataInicio" required value={formData.dataInicio} max={formData.dataFinal} min={formData.dataFinalInscricao} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="dataInicioInscricao" as={Col}>
                                    <Form.Label>Data de Início das Inscrições</Form.Label>
                                    <Form.Control type="date" name="dataInicioInscricao" required value={formData.dataInicioInscricao} min={new Date()} max={formData.dataFinalInscricao} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Row className="gap-2">
                                <Form.Group controlId="dataFinal" as={Col}>
                                    <Form.Label>Data Final</Form.Label>
                                    <Form.Control type="date" name="dataFinal" required value={formData.dataFinal} min={formData.dataInicio} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="dataFinalInscricao" as={Col}>
                                    <Form.Label>Data Final das Inscrições</Form.Label>
                                    <Form.Control type="date" name="dataFinalInscricao" required value={formData.dataFinalInscricao} min={formData.dataInicioInscricao} max={formData.dataInicio} onChange={handleChange}/>
                                </Form.Group>
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

export default Curso
