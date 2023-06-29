import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../css/CadastroLocatario.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

function CadastroLocatario() {
  const navigate = useNavigate();

  const cadastrarLocatario = () => {
    const nome = document.getElementById('nome').value;
    const dataNascimento = moment(document.getElementById('dataNascimento').value).format('YYYY-MM-DD');
    const cep = document.getElementById('cep').value;
    const numero = document.getElementById('numero').value;
    const email = document.getElementById('email').value;
    const complemento = document.getElementById('complemento').value;
    const celular = document.getElementById('celular').value;
    const cpf = document.getElementById('cpf').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    alert(`${cpf}\n${cep}`)

    axios
      .post('http://localhost:8080/api/locatarios/', {
        'cpf': cpf,
        'celular': celular,
        'data_nascimento': dataNascimento,
        'cep': cep,
        'numero': numero,
        'complemento': complemento,
        "usuarioRegistro": {
          "usuario": usuario,
          "email": email,
          "senha": senha,
          'role': 'USER'
        }
      })
      .then((response) => {
        console.log(response.data);
        navigate('/component/Login.js');
      })
      .catch((error) => {
        console.error(error);
        alert('Erro ao cadastrar locatário');
      });
  };

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
                      <br/>
                      <InputMask mask="99999-999" type="text" id="cep" className="rounded-input"/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="numero">Número</label>
                      <br />
                      <input type="text" id="numero" className="rounded-input" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numero">Complemento</label>
                      <br />
                      <input type="text" id="complemento" className="rounded-input" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <br />
                      <input type="email" id="email" className="rounded-input" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="celular">Celular</label>
                      <br />
                      <InputMask mask="(99) 9 9999-9999" type="tel" id="celular" className="rounded-input" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cpf">CPF</label>
                      <br />
                      <InputMask mask="999.999.999-99" type="text" id="cpf" className="rounded-input" />
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

                    <button className="btnCadastrarLocatario" onClick={cadastrarLocatario}>
                      Cadastrar Locatário
                    </button>
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