import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/partials/footer/Footer';
import Header from './components/partials/header/Header';
import Home from './pages/home/Home';
import Colaboradores from './pages/colaboradores/Colaboradores';
import Demissao from './pages/demissao/Demissao';
import Admissao from './pages/admissao/Admissao';
import HomeGestaoCursos from './pages/gestao-cursos/home/HomeGestaoCursos';
import Cursos from './pages/gestao-cursos/cursos/Cursos';
import Aulas from './pages/gestao-cursos/aulas/Aulas';
import Inscricoes from './pages/gestao-cursos/inscricoes/Inscricoes';
import Materias from './pages/gestao-cursos/materias/Materias';


export default function App() {
  const GESTAO_CURSO_PREFIX = '/gestao-cursos';

  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="colaboradores" element ={<Colaboradores/>}/>
            <Route path="admissao" element = {<Admissao/>} />
            <Route path= "demissao" element = {<Demissao/>}/>

            <Route path={`${GESTAO_CURSO_PREFIX}/`} element={<HomeGestaoCursos />}></Route>
            <Route path={`${GESTAO_CURSO_PREFIX}/cursos`} element={<Cursos />} />
            <Route path={`${GESTAO_CURSO_PREFIX}/aulas`} element={<Aulas />} />
            <Route path={`${GESTAO_CURSO_PREFIX}/inscricoes`} element={<Inscricoes />} />
            <Route path={`${GESTAO_CURSO_PREFIX}/materias`} element={<Materias />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

