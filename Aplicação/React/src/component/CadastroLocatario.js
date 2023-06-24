import React, { useState } from 'react';
import axios from 'axios';
import '../css/CadastroLocatario.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function CadastroLocatario() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

  const login = () => {
    navigate('/component/Login.js');
  };

  const handleCepChange = async (event) => {
    const cep = event.target.value;
    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { localidade, uf, logradouro } = response.data;
        document.getElementById('cidade').value = localidade;
        document.getElementById('estado').value = uf;
        document.getElementById('rua').value = logradouro;
      } catch (error) {
        console.error(error);
      }
    } else {
      document.getElementById('cidade').value = '';
      document.getElementById('estado').value = '';
      document.getElementById('rua').value = '';
    }
  };

  const cadastrarLocatario = () => {
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const cpf = document.getElementById('cpf').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    axios
      .post('http://localhost:8080/api/locatarios', {
        nome,
        dataNascimento,
        cep,
        cidade,
        estado,
        rua,
        numero,
        email,
        celular,
        cpf,
        usuario,
        senha,
      })
      .then((response) => {
        console.log(response.data);
        // Handle success
        // You can perform any actions here, such as showing a success message or navigating to a different page
      })
      .catch((error) => {
        console.error(error);
        // Handle error
        // You can display an error message or perform any other error handling logic here
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
                      <br />
                      <input type="text" id="cep" className="rounded-input" onChange={handleCepChange} />
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