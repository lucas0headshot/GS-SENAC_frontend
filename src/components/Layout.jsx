import { Outlet } from "react-router-dom";
import Header from "./partials/header/Header";
import Footer from "./partials/footer/Footer";
import { Container, Row } from "react-bootstrap";
import ErrorBoundary from "./ErrorBoundary";

/**
 * @description Layout da aplicação
 *
 * @author Lucas Ronchi <@lucas0headshot>
 *
 * @return {JSX.Element}
 */
const Layout = () => {
    return (
        <>
            <Header />
            <Container className="mt-5">
                <Row>
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Layout