import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Start from './component/Start';
import Login from './component/Login';
import MainLocador from './component/MainLocador';
import MainLocatario from './component/MainLocatario';
import Cadastro from './component/Cadastro';
import CadastroImovel from './component/CadastroImovel';
import GerenciarImovel from './component/GerenciarImovel';
import BuscarImovel from './component/BuscarImovel';
import VisualizarImovel from './component/VisualizarImovel';
import ConsultaImovel from './component/ConsultaImovel';
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
        <Route path="/component/Cadastro.js" element={<Cadastro />} />
        <Route path="/component/CadastroImovel.js" element={<CadastroImovel />} />
        <Route path="/component/GerenciarImovel.js" element={<GerenciarImovel />} />
        <Route path="/component/BuscarImovel.js" element={<BuscarImovel />} />
        <Route path="/component/VisualizarImovel.js" element={<VisualizarImovel />} />
        <Route path="/component/MainLocador.js" element={<MainLocador />} />
        <Route path="/component/MainLocatario.js" element={<MainLocatario />} />
        <Route path="/component/ConsultaImovel.js" element={<ConsultaImovel />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
