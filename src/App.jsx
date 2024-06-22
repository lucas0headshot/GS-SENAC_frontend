import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/home';
import Colaboradores from './pages/colaboradores/Colaboradores';
import Demissao from './pages/demissao/Demissao';
import Admissao from './pages/admissao/Admissao';
import Cadastro from './pages/financeiro/Cadastro';
import Financeiro from './pages/financeiro/Financeiro'
import Solicitacao from './pages/financeiro/Solicitacao';
import Pagamento from './pages/financeiro/Pagamento';
import Rescisao from './pages/financeiro/Rescisao';
import Saldo from './pages/financeiro/Saldo';
import Pesquisar from './pages/financeiro/Pesquisar';
import Relatorio from './pages/financeiro/Relatorio';


export default function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="colaboradores" element ={<Colaboradores/>}/>
          <Route path="admissao" element = {<Admissao/>} /> 
          <Route path= "demissao" element = {<Demissao/>}/>
          
            <Route path="financeiro" element = {<Financeiro/>}/>
            <Route path="solicitacao" element = {<Solicitacao/>}/>
            <Route path="pagamento" element = {<Pagamento/>}/>
            <Route path="rescisao" element = {<Rescisao/>}/>
            <Route path="saldo" element = {<Saldo/>}/>
            <Route path="pesquisar" element = {<Pesquisar/>}/>
            <Route path="relatorio" element = {<Relatorio/>}/>
            <Route path="cadastro" element={<Cadastro/>} />
            <Route path="editar/:id" element={<Cadastro/>} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
};

