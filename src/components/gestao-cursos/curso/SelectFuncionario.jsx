import axios from "axios";
import { useState, useEffect } from "react"
import { Form, Col } from "react-bootstrap"
import API_PATH from '../../../../API_PATH';

/**
 * @description Componente c/ SELECT dos Funcionários.
 *
 * @author Lucas Ronchi <@lucas0headshot>
 *
 * @return {Component}
 */
const SelectFuncionario = ({ ...props }) => {
    const [funcionarios, setFuncionarios] = useState([]);

    const fetchFuncionarios = async () => {
        axios.get(`${API_PATH}funcionario`)
            .then(response => {
                setFuncionarios(response.data.content);
            })
            .catch(err => {
                console.error('Erro ao realizar GET em Funcionários:', err);
            });
    };

    useEffect(() => {
        fetchFuncionarios();
    }, []);

    return (
        <Form.Group controlId={props.controlId} as={Col} className={props.className}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control as="select" name={props.name} value={props.value} props>
                <option selected disabled value={0}>Selecione um {props.label}</option>
                {funcionarios.map(funcionario => {
                    return <option key={funcionario.id} value={funcionario.id}>{funcionario.nome}</option>
                })}
            </Form.Control>
        </Form.Group>
    )
}

export default SelectFuncionario