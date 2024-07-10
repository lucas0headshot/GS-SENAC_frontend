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

    const handleExcluir = async (id) => {
        if (confirm("Deseja realmente excluir este curso?")) {
            axios.delete(`${API_PATH}/cursos/${id}`)
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

    const handleEditar = (id) => {
        navigate(`/gestao-cursos/cursos/editar/${id}`);
    }

    const handleCadastrar = () => {
        navigate("/gestao-cursos/cursos/criar");
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
                <Table responsive striped hover bordered>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Coordenador</th>
                            <th>Períodos Inscrições</th>
                            <th>Qtd Inscritos</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cursos.map((curso, i) => (
                            <tr key={i}>
                                <td>{curso.nome}</td>
                                <td>{curso.descricao}</td>
                                <td>{curso.coordenador}</td>
                                <td>{formatDate(curso.dataInicioInscricao)} - {formatDate(curso.dataFinalInscricao)}</td>
                                <td>{curso.qtdInscrito}</td>
                                <td className="text-center">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id={`dropdown-curso-${curso.id}`}>Ações</Dropdown.Toggle>
                                        <Dropdown.Menu style={{zIndex: 3}}>
                                            <Dropdown.Item variant="primary" href={`/gestao-cursos/cursos/materias/${curso.id}`}>Materias</Dropdown.Item>
                                            <Dropdown.Item variant="secondary" href={`/gestao-cursos/cursos/aulas/${curso.id}`}>Aulas</Dropdown.Item>
                                            <Dropdown.Item variant="info" href={`/gestao-cursos/cursos/inscricoes/${curso.id}`}>Inscrições</Dropdown.Item>
                                            <Dropdown.Item variant="warning" onClick={() => handleEditar(curso.id)}>Editar</Dropdown.Item>
                                            <Dropdown.Item variant="danger" onClick={() => handleExcluir(curso.id)}>Excluir</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Row>
    );
}

export default Cursos
