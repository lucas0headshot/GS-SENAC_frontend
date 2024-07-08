import { Component } from 'react';
import { Button } from 'react-bootstrap';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Algo deu errado:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <FallbackUI />;
        }

        return this.props.children;
    }
}

function FallbackUI() {
    return (
        <div>
            <h1>Erro inesperado</h1>
            <p>Desculpe, ocorreu um erro inesperado. Por favor, tente novamente mais tarde.</p>
            <Button variant='primary' onClick={() => {location.reload()}}>Tentar novamente</Button>
        </div>
    );
}

export default ErrorBoundary;
