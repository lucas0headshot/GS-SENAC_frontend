import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Table, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Curso from './Curso';
import API_PATH from '../../../../API_PATH';
import formatDate from '../../../components/helpers/data/formatDate';

/**
 * @description Página de cursos
 *
 * @author Lucas Ronchi <@lucas0headshot>
 *
 * @return {React.Component}
 */
const Cursos = () => {
    const [cursos, setCursos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCursos();
    }, []);

    const fetchCursos = async () => {
        setCarregando(true);
        axios.get(`${API_PATH}cursos`)
            .then(response => {
                console.table(response.data.content);
                setCursos(response.data.content);
            })
            .catch(err => {
                console.error('Erro ao realizar GET em Cursos:', err);
            })
            .finally(() => {
                setCarregando(false);
            });
    };

    const handleEditar = (id) => {
        navigate(`/gestao-cursos/cursos/editar/${id}`);
    }

    const handleCadastrar = () => {
        navigate("/gestao-cursos/cursos/criar");
    }

    const handleExcluir = async (id) => {
        if (confirm("Deseja realmente excluir este Curso?")) {
            axios.delete(`${API_PATH}cursos/${id}`)
                .then(response => {
                    if (response.status == 204) {
                        fetchCursos();
                    }
                })
                .catch(err => {
                    console.error('Erro ao realizar DELETE em Cursos:', err);
                });
        }
    };

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
                <Table responsive striped hover bordered>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Coordenador</th>
                            <th>Períodos Inscrições</th>
                            <th>Períodos</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!cursos.length ? (
                            <tr>
                                <td colSpan="6" className="text-center">Nenhum curso encontrado</td>
                            </tr>
                        ) : (
                            cursos.map((curso, i) => (
                                <tr key={i}>
                                    <td>{curso.nome}</td>
                                    <td>{curso.descricao}</td>
                                    <td>{curso.coordenador.nome}</td>
                                    <td>{formatDate(curso.dataInicioInscricao)} - {formatDate(curso.dataFinalInscricao)}</td>
                                    <td>{formatDate(curso.dataInicio)} - {formatDate(curso.dataFinal)}</td>
                                    <td className="text-center">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id={`dropdown-curso-${curso.id}`}>Ações</Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item variant="warning" onClick={() => handleEditar(curso.id)}>Editar</Dropdown.Item>
                                                <Dropdown.Item as="button" onClick={() => handleExcluir(curso.id)}>Excluir</Dropdown.Item>
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
}

export default Cursos
