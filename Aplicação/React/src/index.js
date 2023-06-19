import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Start from './component/Start';
import Login from './component/Login';
import Admin from './component/Admin';
import MainLocador from './component/MainLocador';
import MainLocatario from './component/MainLocatario';
import Cadastro from './component/Cadastro';
import CadastroLocatario from './component/CadastroLocatario';
import CadastroLocadora from './component/CadastroLocadora';
import CadastroImovel from './component/CadastroImovel';
import GerenciarImovel from './component/GerenciarImovel';
import BuscarImovel from './component/BuscarImovel';
import VisualizarImovel from './component/VisualizarImovel';
import ConsultaImovel from './component/ConsultaImovel';
import ReservarImovel from './component/ReservarImovel';
import EditarLocadora from './component/EditarLocadora';
import EditarLocatario from './component/EditarLocatario';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Redirect} from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/component/Login.js" element={<Login />} />
        <Route path="/component/Admin.js" element={<Admin />} />
        <Route path="/component/Cadastro.js" element={<Cadastro />} />
        <Route path="/component/CadastroLocatario.js" element={<CadastroLocatario />} />
        <Route path="/component/CadastroLocadora.js" element={<CadastroLocadora />} />
        <Route path="/component/CadastroImovel.js" element={<CadastroImovel />} />
        <Route path="/component/GerenciarImovel.js" element={<GerenciarImovel />} />
        <Route path="/component/BuscarImovel.js" element={<BuscarImovel />} />
        <Route path="/component/VisualizarImovel.js" element={<VisualizarImovel />} />
        <Route path="/component/MainLocador.js" element={<MainLocador />} />
        <Route path="/component/MainLocatario.js" element={<MainLocatario />} />
        <Route path="/component/ConsultaImovel.js" element={<ConsultaImovel />} />
        <Route path="/component/ReservarImovel.js" element={<ReservarImovel />} />
        <Route path="/component/EditarLocadora.js" element={<EditarLocadora />} />
        <Route path="/component/EditarLocatario.js" element={<EditarLocatario />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
