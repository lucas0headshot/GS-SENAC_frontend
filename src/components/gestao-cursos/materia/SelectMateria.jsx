import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import API_PATH from '../../../../API_PATH';

/**
 * Componente para seleção de matérias.
 * @param {Object} props - Propriedades do componente.
 * @returns {JSX.Element} Componente de seleção de matérias.
 */
const SelectMateria = ({ ...props }) => {
    const [materias, setMaterias] = useState([]);

    const fetchMaterias = async () => {
        try {
            const response = await axios.get(`${API_PATH}materias`);
            setMaterias(response.data.content);
        } catch (err) {
            console.error('Erro ao realizar GET em Matérias:', err);
        }
    };

    useEffect(() => {
        fetchMaterias();
    }, []);

    return (
        <Form.Group controlId={props.controlId} as={Col} className={props.className}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control as="select" name={props.name} value={props.value} onChange={props.onChange}>
                <option disabled value={0}>Selecione uma {props.label}</option>
                {materias.map(materia => (
                    <option key={materia.id} value={materia.id}>{materia.nome}</option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default SelectMateria;
