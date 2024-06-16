import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Financeiro = () => {
  return (
    <ButtonGroup vertical>
      <Button>Balanço</Button>
      <Button>Solicitações</Button>

      <DropdownButton
        as={ButtonGroup}
        title="Relatórios"
        id="bg-vertical-dropdown-1"
      >
        <Dropdown.Item eventKey="1">Diário</Dropdown.Item>
        <Dropdown.Item eventKey="2">Semanal</Dropdown.Item>
        <Dropdown.Item eventKey="3">Mensal</Dropdown.Item>
        <Dropdown.Item eventKey="4">Anual</Dropdown.Item>
      </DropdownButton>

      <DropdownButton
        as={ButtonGroup}
        title="Pagamentos"
        id="bg-vertical-dropdown-2"
      >
        <Dropdown.Item eventKey="1">Pagamento</Dropdown.Item>
        <Dropdown.Item eventKey="2">Rescisão</Dropdown.Item>
      </DropdownButton>
    </ButtonGroup>
  );
};

export default Financeiro;