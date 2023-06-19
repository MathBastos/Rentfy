import React, { useState } from 'react';
import '../css/CadastroLocadora.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function CadastroLocadora() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

  const login = () => {
    navigate('/component/Login.js');
};

  return (
    <div className="CadastroLocadora">
      <header className="CadastroLocadora-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <img src={logo} className="rentfyLogoCadastroLocadora" alt="logo" />
              </td>
            </tr>
            <tr>
              <td>
                <fieldset className="fieldset-custom">
                  <legend>Cadastro de Locadora</legend>
                  <form id="CadastroLocadora">
                    <div className="form-group">
                        <label htmlFor="nomeFantasia">Nome Fantasia</label>
                        <br />
                        <input type="text" id="nomeFantasia" className="rounded-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cnpj">CNPJ</label>
                        <br />
                        <input type="text" id="cnpj" className="rounded-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <br />
                        <input type="text" id="cep" className="rounded-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <br />
                        <input type="text" id="cidade" className="rounded-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <br />
                        <input type="text" id="estado" className="rounded-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="rua">Rua</label>
                        <br />
                        <input type="text" id="rua" className="rounded-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="numero">Número</label>
                        <br />
                        <input type="text" id="numero" className="rounded-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" id="email" className="rounded-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefone">Telefone</label>
                        <br />
                        <input type="tel" id="telefone" className="rounded-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="usuario">Usuário</label>
                        <br />
                        <input type="text" id="usuario" className="rounded-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <br />
                        <input type="password" id="senha" className="rounded-input" />
                    </div>

                    <button className="btnCadastrarLocadora" onClick={login}>Cadastrar Locadora</button>
                    </form>
                </fieldset>
              </td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default CadastroLocadora;
