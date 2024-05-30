import styles from './header.module.css';


export default function Header() {
  return (
    <>
    <header className = {styles.header} >
        <a href="/"> Home</a>
        <a href="colaboradores">Colaboradores</a>
        <a href="admissao">Admissão</a>
        <a href="demissao">Demissão</a> 
    </header>
    </>
  )
}
