import React, { useState } from 'react';
import '../css/Login.css';
import logo from '../img/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const loginClick = async (e) => {
    e.preventDefault();
    navigate('/component/MainLocatario.js');
    try {
      const response = await axios.post('http://localhost:8080', {
        username,
        password
      });

      const accessToken = response.data.accessToken;
      /* navigate('/component/Main.js'); */
    } catch (error) {
      console.error('Erro de autenticação:', error);
    }
  };

  return (
    <div className="Login">
      <header className="Login-header">
        <form className="loginForm">
          <img src={logo} className="rentfyLogoLogin" alt="logo" />
          <h3>Faça Login</h3>

          <label htmlFor="username" className="labelLogin">Usuário</label>
          <input
            type="text"
            placeholder="Usuário"
            id="username"
            className="inputLogin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password" className="labelLogin">Senha</label>
          <input
            type="password"
            placeholder="Senha"
            id="password"
            className="inputLogin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={loginClick}>Log In</button>
        </form>
      </header>
    </div>
  );
}

export default Login;
