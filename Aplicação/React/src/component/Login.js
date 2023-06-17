import React, { useState } from 'react';
import '../css/Login.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);

  const [selectedButton, setSelectedButton] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      // Redirecionar para a página do administrador
      navigate('/component/Admin.js');
    } else {
      if (selectedButton === 'Locadora') {
        navigate('/component/MainLocador.js');
      } else if (selectedButton === 'Locatário') {
        navigate('/component/MainLocatario.js');
      }
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
                      <label htmlFor="username">Username:</label><br />
                      <input
                        className="rounded-input"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="password">Password:</label><br />
                      <input
                        className="rounded-input"
                        type="password"
                        id="password"
                        value={password}
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
