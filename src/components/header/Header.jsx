import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { Link } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Header() {
  const [headerClicked, setHeaderClicked] = useState(false);

  const handleIconClick = () => {
    setHeaderClicked(!headerClicked);
  };

    const [navLinks, setNavLinks] = useState([]);

    useEffect(() => {
    const navs = [
      { name: "Financeiro", path: "/financeiro" },
    ];
    setNavLinks(navs);
  }, []);

  return (
    <>
      <div className={`${styles.icon} ${headerClicked ? styles.iconActive : ''}`} onClick={handleIconClick}>
         {headerClicked ? <IoClose /> : <RxHamburgerMenu />}
      </div>
      <header className={headerClicked ? `${styles.header} ${styles.headerTransform}` : styles.header}>
        <NavLink to="/">Home</NavLink>
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Financeiro 
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark" title="Financeiro">
            <Dropdown.Item as={Link} to={`/`}>Funcionário</Dropdown.Item>
            <Dropdown.Item as={Link} to={`/solicitacao`}>Solicitações</Dropdown.Item>
            <Dropdown.Item as={Link} to={`/pagamento`}>Pagamento</Dropdown.Item>
            <Dropdown.Item as={Link} to={`/rescisao`}>Rescisão</Dropdown.Item>
            <Dropdown.Item as={Link} to={`/saldo`}>Saldo</Dropdown.Item>
            <Dropdown.Item as={Link} to={`/pesquisar`}>Pesquisar</Dropdown.Item>
            <Dropdown.Item as={Link} to={`/relatorio`}>Relatórios</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <NavLink to="colaboradores">Colaboradores</NavLink>
        <NavLink to="admissao">Admissão</NavLink>
        <NavLink to="demissao">Demissão</NavLink>        
      </header>
    </>
  );
}
