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
      { name: "Gestão de Cursos", path: "/gestao-cursos" },
    ];
    setNavLinks(navs);
  }, []);

  return (
    <>
      <div className={`${styles.icon} ${headerClicked ? styles.iconActive : ''}`} onClick={handleIconClick}>
         {headerClicked ? <IoClose /> : <RxHamburgerMenu />}
      </div>
      <header className={headerClicked ? `${styles.header} ${styles.headerTransform}` : styles.header}>
        <NavLink to="/"> Home</NavLink>

        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-gestao-cursos">Gestão de Cursos</Dropdown.Toggle>
          <Dropdown.Menu variant="dark" title="Gestão de Cursos">
            <Dropdown.Item as={NavLink} to={`/gestao-cursos/cursos`}>Cursos</Dropdown.Item>
            <Dropdown.Item as={NavLink} to={`/gestao-cursos/aulas`}>Aulas</Dropdown.Item>
            <Dropdown.Item as={NavLink} to={`/gestao-cursos/inscricoes`}>Inscrições</Dropdown.Item>
            <Dropdown.Item as={NavLink} to={`/gestao-cursos/materias`}>Matérias</Dropdown.Item>
            <Dropdown.Item as={NavLink} to={`/gestao-cursos/frequencias`}>Frequencias</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
      </header>
    </>
  );
}
