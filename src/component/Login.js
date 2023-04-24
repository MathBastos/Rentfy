import React from 'react';
import '../css/Login.css';

import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const entrarClick = () => {
      navigate('/component/Login.js');
    };

    return (
      <div className="Login">
        <header className="Login-header">
          <img src={logo} className="rentfyLogo" alt="logo" />
          <p className="welcome">
            Bem-Vindo de volta ao Rentfy.
          </p>
  
          <form class="login">
            <input type="text" placeholder="Username"/>
            <input type="password" placeholder="Password"/>
            <button>Login</button>
           </form>
        </header>
      </div>
    );
}

export default Login;