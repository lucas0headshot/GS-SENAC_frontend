import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Page404 from './pages/Page404';
import HomeGestaoCursos from "./pages/gestao-cursos/home/HomeGestaoCursos";
import Cursos from "./pages/gestao-cursos/cursos/Cursos";
import Curso from "./pages/gestao-cursos/cursos/Curso";
import Aulas from "./pages/gestao-cursos/aulas/Aulas";
import Aula from './pages/gestao-cursos/aulas/Aula';
import Inscricoes from "./pages/gestao-cursos/inscricoes/Inscricoes";
import Inscricao from "./pages/gestao-cursos/inscricoes/Inscricao";
import Materias from "./pages/gestao-cursos/materias/Materias";
import Materia from "./pages/gestao-cursos/materias/Materia";
import Frequencia from './pages/gestao-cursos/frequencia/Frequencia';
import Frequencias from './pages/gestao-cursos/frequencia/Frequencias';

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
          <Route index element={<HomeGestaoCursos />} />

          <Route path={`${GESTAO_CURSO_PREFIX}/cursos`} element={<Cursos />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/cursos/criar`} element={<Curso />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/cursos/editar/:id`} element={<Curso />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/aulas`} element={<Aulas />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/aulas/criar`} element={<Aula />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/aulas/editar/:id`} element={<Aula />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/inscricoes`} element={<Inscricoes />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/inscricoes/criar`} element={<Inscricao />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/inscricoes/editar/:id`} element={<Inscricao />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/materias`} element={<Materias />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/frequencias`} element={<Frequencias />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/frequencias/criar`} element={<Frequencia />} />


          <Route path={`${GESTAO_CURSO_PREFIX}/materias`} element={<Materias />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/materias/criar`} element={<Materia />} />
          <Route path={`${GESTAO_CURSO_PREFIX}/materias/editar/:id`} element={<Materia />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}


