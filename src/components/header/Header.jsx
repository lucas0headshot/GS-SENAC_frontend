import { NavLink } from 'react-router-dom';
import styles from './header.module.css';


export default function Header() {
  return (
    <>
    <header className = {styles.header} >
        <NavLink to="/"> Home</NavLink>
        <NavLink to="colaboradores">Colaboradores</NavLink>
        <NavLink to="admissao">Admissão</NavLink>
        <NavLink to="demissao">Demissão</NavLink> 
    </header>
    </>
  )
}
