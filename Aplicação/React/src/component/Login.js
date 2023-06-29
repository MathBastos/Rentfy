import React, { useState } from 'react';
import '../css/Login.css';
import logo from '../img/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [usuario, setUsername] = useState('');
  const [senha, setPassword] = useState('');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (usuario === 'admin' && senha === 'admin') {
      alert(`Seja bem-vindo novamente Administrador`);
      navigate('/component/Admin.js');
    }

    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/auth', {
        usuario: usuario,
        senha: senha
      });

      if (response.status === 200) {
        console.log(response.data);

        if (response.status === 200) {
            alert(`Seja bem-vindo novamente usuário '${usuario}'`);
            if (selectedButton === 'Locadora') {
              navigate('/component/MainLocador.js');
            } else if (selectedButton === 'Locatário') {
              navigate('/component/MainLocatario.js');
            }
        } else {
          console.log('Login failed');
        }
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('Error occurred:', error);
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="Login">
      <header className="Login-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <img src={logo} className="rentfyLogoLogin" alt="logo" />
              </td>
            </tr>
            <tr>
              <td>
                <fieldset className="fieldset-custom">
                  <legend>Login</legend>
                  <div>
                    <button
                      className="btnTipo"
                      onClick={() => handleButtonClick('Locadora')}
                      style={{ backgroundColor: selectedButton === 'Locadora' ? 'rgb(54, 103, 217)' : 'initial', color: selectedButton === 'Locadora' ? 'white' : 'initial' }}
                    >
                      Locadora
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="btnTipo"
                      onClick={() => handleButtonClick('Locatário')}
                      style={{ backgroundColor: selectedButton === 'Locatário' ? 'rgb(54, 103, 217)' : 'initial', color: selectedButton === 'Locatário' ? 'white' : 'initial' }}
                    >
                      Locatário
                    </button>
                  </div>
                  <form id="Login" onSubmit={handleLogin}>
                    <div>
                      <label htmlFor="usuario">Usuário:</label><br />
                      <input
                        className="rounded-input"
                        type="text"
                        id="usuario"
                        value={usuario}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="senha">Senha:</label><br />
                      <input
                        className="rounded-input"
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btnLogin">Login</button>
                    </div>
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

export default Login;
