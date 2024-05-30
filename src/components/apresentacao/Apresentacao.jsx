import { useNavigate } from 'react-router-dom';
import styles from './apresentacao.module.css'


export default function Apresentacao() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/colaboradores');
    }

    return (
        <div className={styles.container}>
            <h1>Olá, bem vindo ao Portal Rh</h1>
            <p>Para consulta ao cadastro de colaboradores, clique no botão a baixo</p>
            <button className={styles.botaoApresentacao} onClick={handleNavigate}>Cadastro</button>
        </div>
    );
}