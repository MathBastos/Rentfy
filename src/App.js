import logo from './img/logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="rentfyLogo" alt="logo" />
        <p className="welcome">
          Bem-Vindo ao Rentfy.
        </p>
        <p className="welcome">
          Entre ou cadastre-se com as opções abaixo:
        </p>

        <div>
          <button className="btnEntrar">Entrar</button>
          <button className="btnCadastrar">Cadastrar</button>
        </div>
      </header>
    </div>
  );
}

export default App;
