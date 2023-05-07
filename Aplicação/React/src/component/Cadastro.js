import React from 'react';
import '../css/Cadastro.css';
import logo from '../img/logo.png';

function Cadastro() {
    return (
      <div className="Cadastro">
        <header className="Cadastro-header">
            <form class="CadastroForm">
                <img src={logo} className="rentfyLogoCadastro" alt="logo" />
                <h3>Cadastre-se</h3>

                <label for="username">Usuário</label>
                <input type="text" placeholder="Email or Phone" id="username" class="inputCadastro"/>

                <label for="password">Senha</label>
                <input type="password" placeholder="Password" id="password" class="inputCadastro"/>

                <label for="password">Repita Senha</label>
                <input type="password" placeholder="Password" id="repPassword" class="inputCadastro"/>

                <label for="password">E-Mail</label>
                <input type="email" placeholder="E-mail" id="email" class="inputCadastro"/>

                <button>Log In</button>
            </form>
        </header>
      </div>
    );
}

export default Cadastro;