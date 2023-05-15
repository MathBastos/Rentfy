import React from 'react';
import '../css/Login.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const loginClick = () => {
    navigate('/component/Main.js');
  };

  return (
    <div className="Login">
      <header className="Login-header">
        <form className="loginForm">
          <img src={logo} className="rentfyLogoLogin" alt="logo" />
          <h3>Faça Login</h3>

          <label htmlFor="username" class="labelLogin">Usuário</label>
          <input type="text" placeholder="Usuário" id="username" className="inputLogin" />

          <label htmlFor="password" class="labelLogin">Senha</label>
          <input type="password" placeholder="Senha" id="password" className="inputLogin" />

          <button onClick={loginClick}>Log In</button>
        </form>
      </header>
    </div>
  );
}

export default Login;
