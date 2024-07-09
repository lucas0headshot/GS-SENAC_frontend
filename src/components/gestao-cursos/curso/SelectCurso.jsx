import axios from "axios";
import { useState, useEffect } from "react"
import { Form, Col } from "react-bootstrap"
import API_PATH from '../../../API_PATH'

const SelectCurso = ({ ...props }) => {
    const [cursos, setCursos] = useState([]);

    const fetchFuncionarios = async () => {
        axios.get(`${API_PATH}cursos`)
            .then(response => {
                setCursos(response.data.content);
            })
            .catch(err => {
                console.error('Erro ao realizar GET em Cursos:', err);
            });
    };

    useEffect(() => {
        fetchFuncionarios();
    }, []);

    return (
        <Form.Group controlId={props.controlId} as={Col} className={props.className}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control as="select" name={props.name} value={props.value} onChange={props.onChange}>
                <option selected disabled value={0}>Selecione um {props.label}</option>
                {cursos.map(curso => {
                    return <option key={curso.id} value={curso.id}>{curso.nome}</option>
                })}
            </Form.Control>
        </Form.Group>
    )
}

export default SelectCurso;