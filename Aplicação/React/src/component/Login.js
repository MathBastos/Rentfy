import React from 'react';
import '../css/Login.css';
import logo from '../img/logo.png';

function Login() {
    return (
      <div className="Login">
        <header className="Login-header">
            <form class="loginForm">
                <img src={logo} className="rentfyLogoLogin" alt="logo" />
                <h3>Faça Login</h3>

                <label for="username">Usuário</label>
                <input type="text" placeholder="Email or Phone" id="username" class="inputLogin"/>

                <label for="password">Senha</label>
                <input type="password" placeholder="Password" id="password" class="inputLogin"/>

                <button>Log In</button>
            </form>
        </header>
      </div>
    );
}

export default Login;