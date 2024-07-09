import { Button, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * @description Home do Módulo de Gestão de Cursos.
 *
 * @author Lucas Ronchi <@lucas0headshot>
 *
 * @return {React.ReactElement}
 */
const HomeGestaoCursos = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/gestao-cursos/cursos');
    }

    return (
        <div>
            <Row className="justify-content-center">
                <Image src="public/images/banner.png" className="w-75"></Image>
            </Row>

            <h1>Olá, bem vindo ao Portal GS!</h1>
            <p>Para consultar ou cadastrar cursos, clique no botão a baixo</p>
            <Button variant="primary" onClick={handleNavigate}>Cadastrar</Button>
        </div>
    )
}

export default HomeGestaoCursos;