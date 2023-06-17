import React from 'react';
import '../css/Cadastro.css';
import logo from '../img/logo.png';

function Cadastro() {
    return (
        <div className="Cadastro">
            <header className="Cadastro-header">
                <form className="CadastroForm">
                    <img src={logo} className="rentfyLogoCadastro" alt="logo" />
                    <h3>Cadastre-se</h3>

                    <label htmlFor="username" className="labelCadastro">Usuário</label>
                    <input type="text" placeholder="Usuário" id="username" className="inputCadastro" />

                    <label htmlFor="password" className="labelCadastro">Senha</label>
                    <input type="password" placeholder="Senha" id="password" className="inputCadastro" />

                    <label htmlFor="password" className="labelCadastro">Repita a Senha</label>
                    <input type="password" placeholder="Repita a Senha" id="repPassword" className="inputCadastro" />

                    <label htmlFor="email" className="labelCadastro">E-Mail</label>
                    <input type="email" placeholder="E-mail" id="email" className="inputCadastro" />

                    <label className="labelCadastro">Tipo de conta</label>
                    <div className="radioContainer">
                        <input type="radio" id="locador" name="conta" value="locador" />
                        <label htmlFor="locador" className="radioFont">Locador</label>
                    </div>
                    <div className="radioContainer">
                        <input type="radio" id="locatario" name="conta" value="locatario" />
                        <label htmlFor="locatario" className="radioFont">Locatário</label>
                    </div>

                    <button>Cadastrar</button>
                </form>
            </header>
        </div>
    );
}

export default Cadastro;
