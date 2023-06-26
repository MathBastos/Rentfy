import React, { useState } from 'react';
import axios from 'axios';
import '../css/CadastroLocadora.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function CadastroLocadora() {
  const navigate = useNavigate();

  const cadastrarLocadora = () => {
    const nomeFantasia = document.getElementById('nomeFantasia').value;
    const cnpj = document.getElementById('cnpj').value;
    const cep = document.getElementById('cep').value;
    const numero = document.getElementById('numero').value;
    const email = document.getElementById('email').value;
    const complemento = document.getElementById('complemento').value;
    const telefone = document.getElementById('telefone').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    axios
      .post('http://localhost:8080/api/locadoras/', {
        'nome_fantaria': nomeFantasia,
        'cnpj': cnpj,
        'telefone' : telefone,
        'cep' : cep,
        'numero' : numero,
        'complemento' : complemento,
        'usuarioRegistro' : {
          'usuario': usuario,
          'email': email,
          'senha': senha,
          'role': 'USER'
        }
      })
      .then((response) => {
        console.log(response.data);
        navigate('/component/Login.js');
      })
      .catch((error) => {
        console.error(error);
      });
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
                      <input type="text" id="cep" className="rounded-input"/>
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

                    <button className="btnCadastrarLocadora" onClick={cadastrarLocadora}>
                      Cadastrar Locadora
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

export default CadastroLocadora;
