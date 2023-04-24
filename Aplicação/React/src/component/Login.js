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
            <form>
                <img src={logo} className="rentfyLogo" alt="logo" />
                <h3>Faça Login</h3>

                <label for="username">Usuário</label>
                <input type="text" placeholder="Email or Phone" id="username"/>

                <label for="password">Senha</label>
                <input type="password" placeholder="Password" id="password"/>

                <button>Log In</button>
            </form>
        </header>
      </div>
    );
}

export default Login;