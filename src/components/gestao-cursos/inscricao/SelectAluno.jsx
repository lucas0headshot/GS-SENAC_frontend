import React from 'react';
import { Form } from 'react-bootstrap';

const SelectAluno = ({ controlId, className, label, name, value, onChange, options }) => {
    return (
        <Form.Group controlId={controlId} as={Form.Col} className={className}>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="select" name={name} value={value} onChange={onChange} required>
                <option value="">Selecione o aluno</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.nome}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default SelectAluno;
