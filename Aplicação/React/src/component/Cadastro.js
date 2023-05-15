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

                <label for="username" class="labelCadastro">Usuário</label>
                <input type="text" placeholder="Usuário" id="username" class="inputCadastro"/>

                <label for="password" class="labelCadastro">Senha</label>
                <input type="password" placeholder="Senha" id="password" class="inputCadastro"/>

                <label for="password" class="labelCadastro">Repita a Senha</label>
                <input type="password" placeholder="Repita a Senha" id="repPassword" class="inputCadastro"/>

                <label for="password" class="labelCadastro">E-Mail</label>
                <input type="email" placeholder="E-mail" id="email" class="inputCadastro"/>

                <button>Cadastrar</button>
            </form>
        </header>
      </div>
    );
}

export default Cadastro;