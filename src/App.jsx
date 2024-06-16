import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/home';
import Colaboradores from './pages/colaboradores/Colaboradores';
import Demissao from './pages/demissao/Demissao';
import Admissao from './pages/admissao/Admissao';
import Financeiro from './pages/financeiro/Financeiro';


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
          <Route path="financeiro" element={<Financeiro />}/>
        </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
};

