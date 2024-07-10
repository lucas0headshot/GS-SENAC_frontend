import { useEffect, useState } from "react"
import API_PATH from "../../../../API_PATH";
import axios from "axios";
import { Button, Row, Table, Col, Dropdown } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import SelectCurso from "../../../components/gestao-cursos/curso/SelectCurso";

/**
 * @description Página das Materias de um Curso.
 *
 * @author @lucas0headshot
 *
 * @return {React.Component}
 */
const Materias = () => {
    const [materias, setMaterias] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchMaterias = async () => {
        setCarregando(true);
        
        let params = {};
        if (id) {
            params.push({filter: ``})
        }

        axios.get(`${API_PATH}materias`, params)
            .then(response => {
                setMaterias(response.data.content);
            })
            .catch(err => {
                console.error('Erro ao realizar GETID em Materias:', err);
            })
            .finally(() => {
                setCarregando(false);
            })
    }

    useEffect(() => {
        fetchMaterias();
    }, []);

    const handleCadastrar = () => {
        if (id) {
            navigate(`/gestao-cursos/materias/${id}/criar`);
        } else {
            navigate(`/gestao-cursos/materias/criar`);
        }
    }

    const handleExcluir = async (id) => {
        if (confirm("Deseja realmente excluir esta matéria?")) {
            axios.delete(`${API_PATH}materias/${id}`)
                .then(response => {
                    if (response.status == 204) {
                        fetchMaterias();
                    }
                })
                .catch(err => {
                    console.error('Erro ao realizar DELETE em Materias:', err);
                });
        }
    };

    const handleEditar = (id) => {
        navigate(`/gestao-cursos/materias/editar/${id}`);
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
                            <th>Carga Horária</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!materias.length ? (
                            <tr>
                                <td colSpan="6" className="text-center">Nenhuma matéria encontrada</td>
                            </tr>
                        ) : (
                            materias.map((materia, i) => (
                                <tr key={i}>
                                    <td>{materia.nome}</td>
                                    <td>{materia.cargaHoraria}h</td>
                                    <td className="text-center">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id={`dropdown-materia-${materia.id}`}>Ações</Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item as="button" onClick={() => handleEditar(materia.id)}>Editar</Dropdown.Item>
                                                <Dropdown.Item as="button" onClick={() => handleExcluir(materia.id)}>Excluir</Dropdown.Item>
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
    )
}

export default Materias