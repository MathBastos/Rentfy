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

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/authenticate', {
        usuario: usuario,
        senha: senha
      });

      if (response.data.success) {
        if (usuario === 'admin' && senha === 'admin') {
          // Redirect to the admin page
          navigate('/component/Admin.js');
        } else {
          if (selectedButton === 'Locadora') {
            navigate('/component/MainLocador.js');
          } else if (selectedButton === 'Locatário') {
            navigate('/component/MainLocatario.js');
          }
        }
      } else {
        // Handle unsuccessful login
        console.log('Login failed');
      }
    } catch (error) {
      // Handle error
      console.log('Error occurred:', error);
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
                  <form id="Login">
                    <div>
                      <label htmlFor="usuario">usuario:</label><br />
                      <input
                        className="rounded-input"
                        type="text"
                        id="usuario"
                        value={usuario}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="senha">senha:</label><br />
                      <input
                        className="rounded-input"
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <button className="btnLogin" onClick={handleLogin}>Login</button>
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
