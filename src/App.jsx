import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Page404 from './pages/Page404';
import Home from "./pages/home/Home";
import HomeGestaoCursos from "./pages/gestao-cursos/home/HomeGestaoCursos";
import Cursos from "./pages/gestao-cursos/cursos/Cursos";
import Curso from "./pages/gestao-cursos/cursos/Curso";
import Aulas from "./pages/gestao-cursos/aulas/Aulas";
import Inscricoes from "./pages/gestao-cursos/inscricoes/Inscricoes";
import Inscricao from "./pages/gestao-cursos/inscricoes/Inscricao";
import Materias from "./pages/gestao-cursos/materias/Materias";

/**
 * @description Aplicação principal.
 *
 * @author Lucas Roque, Raphael Azambuja & Lucas Ronchi <@LucasRBeckhauser|@RaphaelAzambuja|@lucas0headshot>
 *
 * @return {JSX.Element}
 */
export default function App() {
  const GESTAO_CURSO_PREFIX = '/gestao-cursos';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Layout />}>
          <Route index element={<Home />} />

          <Route path={`${GESTAO_CURSO_PREFIX}/`} element={<HomeGestaoCursos />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/cursos`} element={<Cursos />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/cursos/criar`} element={<Curso />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/aulas`} element={<Aulas />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/inscricoes`} element={<Inscricoes />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/inscricoes/criar`} element={<Inscricao />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/materias`} element={<Materias />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}
