import React, { useState } from 'react';
import '../css/CadastroLocatario.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function CadastroLocatario() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div className="CadastroLocatario">
      <header className="CadastroLocatario-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <img src={logo} className="rentfyLogoCadastroLocatario" alt="logo" />
              </td>
            </tr>
            <tr>
              <td>
                <fieldset className="fieldset-custom">
                  <legend>Cadastro de Locatário</legend>
                  <form id="cadastroLocatario">
                    <div className="form-group">
                      <label htmlFor="nome">Nome</label>
                      <br />
                      <input type="text" id="nome" className="rounded-input" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="dataNascimento">Data de Nascimento</label>
                      <br />
                      <input type="date" id="dataNascimento" className="rounded-input" />
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
                      <label htmlFor="celular">Celular</label>
                      <br />
                      <input type="tel" id="celular" className="rounded-input" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cpf">CPF</label>
                      <br />
                      <input type="text" id="cpf" className="rounded-input" />
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

                    <button className="btnCadastrarLocatario">Cadastrar Locatário</button>
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

export default CadastroLocatario;
