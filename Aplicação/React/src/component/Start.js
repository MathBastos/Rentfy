import React from 'react';
import '../css/Start.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Start() {
    const navigate = useNavigate();

    const entrarClick = () => {
      navigate('/component/Login.js');
    };

    const cadastrarClick = () => {
      navigate('/component/Cadastro.js');
    };

    return (
      <div className="Start">
        <header className="Start-header">
          <img src={logo} className="rentfyLogo" alt="logo" />
          <p className="welcome">
            Bem-Vindo ao Rentfy.
          </p>
          <p className="welcome">
            Entre ou cadastre-se com as opções abaixo:
          </p>
  
          <div>
            <button onClick={entrarClick} className="btnEntrar">Entrar</button>
            <button onClick={cadastrarClick} className="btnCadastrar">Cadastrar</button>
          </div>
        </header>
      </div>
    );
}

export default Start;